import fs from 'fs/promises';
import crypto from 'crypto';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Procesa las fotos de una carpeta de origen (copia de la carpeta de Drive) y las deja listas para el blog.
//
// Uso:
//   npm run fotos -- nombre-de-carpeta [--dry-run] [--forzar] [--solo foto1.jpg,foto2.jpg] [--salida carpeta] [--origen carpeta]
//   npm run fotos -- --listar nombre-de-carpeta
//   npm run fotos -- --renombrar nombre-de-carpeta viejo.webp nuevo.webp
//   npm run fotos -- --registrar nombre-de-carpeta original.JPEG archivo-final.webp
//
// "nombre-de-carpeta" es el slug del artículo (o el nombre del lugar). Se busca en la carpeta de origen
// (por defecto ~/.cache/blog-fotos, o la que diga la variable FOTOS_ORIGEN, o --origen). También se puede
// pasar una ruta completa a una carpeta.
//
// Por cada foto (jpg, jpeg, png, webp):
//   - la gira según la orientación EXIF, para que las fotos del celular no queden de costado
//   - la achica para que ni el ancho ni el alto pasen de 1920 px, sin agrandar nunca una más chica
//   - la guarda en webp (calidad 80) sin ningún metadato, en public/img/diario/slug-01.webp, slug-02.webp...
//
// Nunca pisa un archivo que ya existe, nunca borra ni modifica nada de la carpeta de origen, y no convierte
// HEIC ni videos: los lista en el reporte. Con --dry-run hace todo el trabajo en memoria y no escribe nada.
//
// Control de duplicados. Cada foto procesada queda anotada en scripts/fotos-manifiestos/<carpeta>.json, que
// va en el repo junto con las imágenes (así lo comparten Santi y Lore). Antes de procesar una foto se la
// compara con todo lo anotado, en cualquier carpeta:
//   - misma foto (mismos bytes, aunque cambie el nombre): se saltea
//   - foto parecida (la misma reenviada por WhatsApp, achicada o recomprimida, o retocada): se saltea y se avisa
//   - dos iguales dentro de la misma corrida: se procesa solo la primera
// Si el archivo generado se borró (foto que no se usó), la anotación se mantiene: no se vuelve a generar sola.
// Con --forzar se procesa igual. Con --solo se procesan solo las fotos nombradas (separadas por comas): por
// ejemplo --solo IMG_8057.JPEG --forzar recupera una foto descartada, con el mismo nombre que tenía.
//
// Fotos retocadas. Si en la carpeta hay una foto con "-retocada" al final del nombre (por ejemplo
// IMG_8111-retocada.jpg junto a IMG_8111.JPEG), el script busca en el manifiesto qué archivo de la web salió
// del original y lo reemplaza con la versión retocada, con el mismo nombre (así el post no cambia). Si cambian
// las medidas, actualiza width y height en los posts que usan esa imagen. La versión anterior del .webp queda
// en ~/.cache/blog-fotos/.reemplazadas/. Cada retocada se aplica una sola vez: si se vuelve a retocar,
// se sube de nuevo con el mismo nombre y se aplica la versión nueva.

const LADO_MAXIMO = 1920;
const CALIDAD_WEBP = 80;
const AVISO_KB = 400;
const UMBRAL_PARECIDA = 4; // de 64 bits de la huella: hasta 4 distintos cuenta como "parecida"
const SALIDA_POR_DEFECTO = './public/img/diario';
const MANIFIESTOS_POR_DEFECTO = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fotos-manifiestos');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const forzar = args.includes('--forzar');

function valorDe(flag) {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : null;
}

const flagsConValor = new Set(['--salida', '--origen', '--manifiestos', '--posts', '--solo']);
const solo = valorDe('--solo') ? new Set(valorDe('--solo').split(',').map((n) => n.trim().toLowerCase())) : null;
const posicionales = args.filter((a, i) => !a.startsWith('--') && !flagsConValor.has(args[i - 1]));

const salidaDir = path.resolve(valorDe('--salida') || SALIDA_POR_DEFECTO);
const manifiestosDir = path.resolve(valorDe('--manifiestos') || MANIFIESTOS_POR_DEFECTO);
const origenRaiz = path.resolve(
    valorDe('--origen') || process.env.FOTOS_ORIGEN || path.join(os.homedir(), '.cache', 'blog-fotos')
);
const postsDir = path.resolve(valorDe('--posts') || './src/pages');
const reemplazadasDir = path.join(origenRaiz, '.reemplazadas');

// "IMG_8111-retocada.jpg" -> "IMG_8111" (también acepta "_retocada", " retocada" y "-retocado")
const RETOCADA = /^(.+?)[-_ ]retocad[ao]\.(jpe?g|png|webp)$/i;
const sinExtension = (n) => n.replace(/\.[^.]+$/, '');
const escaparRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const EXT_FOTO = /\.(jpe?g|png|webp)$/i;
const EXT_IMAGEN_NO_SOPORTADA = /\.(heic|heif|tiff?|bmp|gif|avif|raw|dng|cr2|nef|arw)$/i;
const EXT_VIDEO = /\.(mov|mp4|m4v|avi|mkv|webm|3gp)$/i;
const NOMBRE_FINAL = /^[a-z0-9]+(-[a-z0-9]+)*\.webp$/;

// "Furongzhen" -> "furongzhen", "Fire and Drums" -> "fire-and-drums"
function nombreLimpio(nombre) {
    return nombre
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

async function existe(p) {
    try { await fs.access(p); return true; } catch { return false; }
}

function salir(mensaje) {
    console.error(mensaje);
    process.exit(1);
}

// ---------- Huellas para detectar duplicados ----------

async function sha1De(ruta) {
    return crypto.createHash('sha1').update(await fs.readFile(ruta)).digest('hex');
}

// Huella de 64 bits de la imagen ya girada (dHash): compara el brillo de píxeles vecinos en una miniatura de 9x8.
// Sobrevive a achicar, recomprimir y cambios leves de color; una foto distinta da una huella distinta.
async function dhashDe(ruta) {
    const px = await sharp(ruta).rotate().resize(9, 8, { fit: 'fill' }).greyscale().raw().toBuffer();
    let bits = '';
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) bits += px[y * 9 + x] > px[y * 9 + x + 1] ? '1' : '0';
    }
    return BigInt('0b' + bits).toString(16).padStart(16, '0');
}

function bitsEncendidos(hex) {
    let x = BigInt('0x' + hex), n = 0;
    while (x) { n += Number(x & 1n); x >>= 1n; }
    return n;
}

function distancia(a, b) {
    return bitsEncendidos((BigInt('0x' + a) ^ BigInt('0x' + b)).toString(16));
}

// Una foto casi lisa (todo negro, cielo parejo) da una huella que se parece a la de cualquier otra lisa:
// ahí solo vale la comparación exacta.
function huellaUtil(hex) {
    const n = bitsEncendidos(hex);
    return n >= 8 && n <= 56;
}

// ---------- Manifiestos (uno por carpeta, en el repo) ----------

function archivoManifiesto(carpeta) {
    return path.join(manifiestosDir, `${carpeta}.json`);
}

async function leerManifiesto(carpeta) {
    try {
        return JSON.parse(await fs.readFile(archivoManifiesto(carpeta), 'utf8'));
    } catch {
        return { carpeta, fotos: [] };
    }
}

async function guardarManifiesto(manifiesto) {
    await fs.mkdir(manifiestosDir, { recursive: true });
    await fs.writeFile(archivoManifiesto(manifiesto.carpeta), JSON.stringify(manifiesto, null, 2) + '\n');
}

async function leerTodosLosManifiestos() {
    let archivos = [];
    try { archivos = await fs.readdir(manifiestosDir); } catch { /* todavía no hay manifiestos */ }
    const todas = [];
    for (const f of archivos.filter((f) => f.endsWith('.json'))) {
        try {
            const m = JSON.parse(await fs.readFile(path.join(manifiestosDir, f), 'utf8'));
            for (const e of m.fotos || []) todas.push({ ...e, carpeta: m.carpeta });
        } catch (e) {
            console.error(`No pude leer el manifiesto ${f}: ${e.message}`);
        }
    }
    return todas;
}

async function resolverOrigen(entrada) {
    const comoRuta = path.resolve(entrada);
    if (entrada.includes('/') && await existe(comoRuta)) return comoRuta;
    const enRaiz = path.join(origenRaiz, entrada);
    if (await existe(enRaiz)) return enRaiz;
    console.error(`No encontré la carpeta "${entrada}".`);
    console.error(`Busqué en: ${enRaiz}`);
    return salir('Pasá la ruta completa, o usá --origen / la variable FOTOS_ORIGEN para indicar dónde están las carpetas.');
}

const kb = (bytes) => Math.round(bytes / 1024);

async function convertir(ruta) {
    return sharp(ruta)
        .rotate() // aplica la orientación EXIF antes de cualquier otra cosa
        .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: CALIDAD_WEBP })
        .toBuffer({ resolveWithObject: true });
}

async function comprobarSinMetadatos(destino, archivo) {
    const meta = await sharp(destino).metadata();
    if (meta.exif || meta.xmp || meta.iptc || meta.icc) {
        throw new Error(`${archivo} salió con metadatos (${['exif', 'xmp', 'iptc', 'icc'].filter((k) => meta[k]).join(', ')})`);
    }
}

// Cambia width y height de las etiquetas <img> que usan /img/diario/<archivo> en los .md de los posts.
async function actualizarMedidasEnPosts(archivo, ancho, alto) {
    let archivos = [];
    try { archivos = (await fs.readdir(postsDir, { recursive: true })).filter((f) => f.endsWith('.md')); } catch { return []; }
    const re = new RegExp(`<img\\s[^>]*src="/img/diario/${escaparRegex(archivo)}"[^>]*>`, 'g');
    const cambiados = [];
    for (const rel of archivos) {
        const ruta = path.join(postsDir, rel);
        const texto = await fs.readFile(ruta, 'utf8');
        const nuevo = texto.replace(re, (tag) => tag
            .replace(/\swidth="\d+"/, ` width="${ancho}"`)
            .replace(/\sheight="\d+"/, ` height="${alto}"`));
        if (nuevo !== texto) {
            await fs.writeFile(ruta, nuevo);
            cambiados.push(path.relative(process.cwd(), ruta));
        }
    }
    return cambiados;
}

async function postsQueUsan(archivo) {
    let archivos = [];
    try { archivos = (await fs.readdir(postsDir, { recursive: true })).filter((f) => f.endsWith('.md')); } catch { return []; }
    const usados = [];
    for (const rel of archivos) {
        if ((await fs.readFile(path.join(postsDir, rel), 'utf8')).includes(`/img/diario/${archivo}`)) usados.push(rel);
    }
    return usados;
}

// Reemplaza el archivo de la web que salió del original por la versión retocada.
async function aplicarRetocada(origen, nombre, manifiesto) {
    const base = nombre.match(RETOCADA)[1].toLowerCase();
    const entrada = manifiesto.fotos.find((e) => sinExtension(e.original).toLowerCase() === base);
    if (!entrada) return { tipo: 'sin-original', nombre };

    const ruta = path.join(origen, nombre);
    const sha1 = await sha1De(ruta);
    if (entrada.retocada && entrada.retocada.sha1 === sha1) return { tipo: 'ya-aplicada', nombre, archivo: entrada.archivo };

    const { data, info } = await convertir(ruta);
    const destino = path.join(salidaDir, entrada.archivo);
    const habia = await existe(destino);
    let antes = null;
    if (habia) {
        const m = await sharp(destino).metadata();
        antes = { ancho: m.width, alto: m.height };
    }
    const cambianMedidas = !antes || antes.ancho !== info.width || antes.alto !== info.height;
    const resultado = { tipo: 'reemplazada', nombre, archivo: entrada.archivo, antes, ancho: info.width, alto: info.height, kb: kb(data.length), habia, posts: [] };

    if (dryRun) {
        resultado.posts = await postsQueUsan(entrada.archivo);
        return resultado;
    }

    if (habia) {
        await fs.mkdir(reemplazadasDir, { recursive: true });
        const marca = new Date().toISOString().replace(/[:.]/g, '-');
        resultado.copia = path.join(reemplazadasDir, `${sinExtension(entrada.archivo)}.${marca}.webp`);
        await fs.copyFile(destino, resultado.copia);
    }
    await fs.writeFile(destino, data); // reemplazo deliberado: es la versión retocada de esa misma foto
    await comprobarSinMetadatos(destino, entrada.archivo);
    entrada.retocada = { original: nombre, sha1, dhash: await dhashDe(ruta), fecha: new Date().toISOString().slice(0, 10) };
    resultado.posts = cambianMedidas ? await actualizarMedidasEnPosts(entrada.archivo, info.width, info.height) : await postsQueUsan(entrada.archivo);
    resultado.cambianMedidas = cambianMedidas;
    return resultado;
}

// ---------- Subcomandos ----------

async function listar(carpeta) {
    const m = await leerManifiesto(nombreLimpio(carpeta));
    if (!m.fotos.length) return console.log(`No hay fotos anotadas para "${carpeta}".`);
    console.log(`Fotos anotadas de "${m.carpeta}" (${m.fotos.length}):\n`);
    console.log('Original | Archivo | Estado');
    for (const e of m.fotos) {
        const hay = await existe(path.join(salidaDir, e.archivo));
        const retoque = e.retocada ? ` | retocada con ${e.retocada.original} (${e.retocada.fecha})` : '';
        console.log(`${e.original} | ${e.archivo} | ${hay ? 'en el repo' : 'el archivo no está (no se usó o se borró)'}${retoque}`);
    }
}

async function renombrar(carpeta, viejo, nuevo) {
    if (!carpeta || !viejo || !nuevo) return salir('Uso: npm run fotos -- --renombrar carpeta viejo.webp nuevo.webp');
    if (!NOMBRE_FINAL.test(nuevo)) return salir(`El nombre "${nuevo}" tiene que ir en minúsculas, con guiones, sin tildes ni espacios y terminar en .webp.`);
    const de = path.join(salidaDir, viejo), a = path.join(salidaDir, nuevo);
    if (!(await existe(de))) return salir(`No existe ${viejo} en ${salidaDir}.`);
    if (await existe(a)) return salir(`Ya existe ${nuevo}: no se pisa. Elegí otro nombre.`);
    const m = await leerManifiesto(nombreLimpio(carpeta));
    const entrada = m.fotos.find((e) => e.archivo === viejo);
    if (dryRun) return console.log(`[PRUEBA] ${viejo} -> ${nuevo}${entrada ? ' (y se actualiza el manifiesto)' : ' (no está en el manifiesto)'}`);
    await fs.rename(de, a);
    if (entrada) {
        entrada.archivo = nuevo;
        await guardarManifiesto(m);
        console.log(`${viejo} -> ${nuevo} (manifiesto actualizado)`);
    } else {
        console.log(`${viejo} -> ${nuevo}. Ojo: ${viejo} no estaba en el manifiesto de "${m.carpeta}", así que no se actualizó nada.`);
    }
}

// Anota una foto que ya se procesó antes de que existiera el manifiesto.
async function registrar(carpeta, original, archivo) {
    if (!carpeta || !original || !archivo) return salir('Uso: npm run fotos -- --registrar carpeta original.JPEG archivo-final.webp');
    const slug = nombreLimpio(carpeta);
    const ruta = path.isAbsolute(original) ? original : path.join(await resolverOrigen(carpeta), original);
    if (!(await existe(ruta))) return salir(`No encontré la foto original ${ruta}.`);
    const m = await leerManifiesto(slug);
    const sha1 = await sha1De(ruta);
    if (m.fotos.some((e) => e.sha1 === sha1)) return console.log(`${path.basename(ruta)} ya estaba anotada.`);
    const hay = await existe(path.join(salidaDir, archivo));
    const entrada = { original: path.basename(ruta), sha1, dhash: await dhashDe(ruta), archivo, fecha: new Date().toISOString().slice(0, 10) };
    if (dryRun) return console.log(`[PRUEBA] se anotaría ${entrada.original} -> ${archivo}${hay ? '' : ' (el archivo no está en la carpeta de salida)'}`);
    m.fotos.push(entrada);
    await guardarManifiesto(m);
    console.log(`Anotada: ${entrada.original} -> ${archivo}${hay ? '' : ' (el archivo no está en la carpeta de salida)'}`);
}

// ---------- Proceso principal ----------

async function procesar(entrada) {
    const origen = await resolverOrigen(entrada);
    const slug = nombreLimpio(path.basename(origen)) || 'foto';
    const todos = (await fs.readdir(origen, { withFileTypes: true }))
        .filter((e) => e.isFile() && !e.name.startsWith('.'))
        .map((e) => e.name)
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

    const fotos = todos.filter((f) => EXT_FOTO.test(f));
    const retocadas = fotos.filter((f) => RETOCADA.test(f));
    const normales = fotos.filter((f) => !RETOCADA.test(f) && (!solo || solo.has(f.toLowerCase())));
    if (solo) {
        const faltan = [...solo].filter((n) => !fotos.some((f) => f.toLowerCase() === n));
        if (faltan.length) console.log(`--solo: no están en la carpeta: ${faltan.join(', ')}`);
    }
    const videos = todos.filter((f) => EXT_VIDEO.test(f));
    const noSoportadas = todos.filter((f) => EXT_IMAGEN_NO_SOPORTADA.test(f));
    const ignorados = todos.filter((f) => !EXT_FOTO.test(f) && !EXT_VIDEO.test(f) && !EXT_IMAGEN_NO_SOPORTADA.test(f));

    console.log(`${dryRun ? '[PRUEBA, no se escribe nada] ' : ''}Origen: ${origen}`);
    console.log(`Salida: ${salidaDir}`);
    console.log(`Fotos en la carpeta: ${fotos.length}${forzar ? ' (--forzar: no se controlan duplicados)' : ''}\n`);

    if (!dryRun) await fs.mkdir(salidaDir, { recursive: true });

    const conocidas = await leerTodosLosManifiestos();
    // Las versiones retocadas ya aplicadas también cuentan como fotos conocidas
    const huellas = conocidas.flatMap((e) => [e, ...(e.retocada ? [{ ...e, original: e.retocada.original, sha1: e.retocada.sha1, dhash: e.retocada.dhash }] : [])]);
    const manifiesto = await leerManifiesto(slug);
    const nuevas = [];
    const enEstaCorrida = [];

    // Números ya usados para slug-NN.webp: archivos que existen y nombres anotados en el manifiesto
    const ocupados = new Set();
    let archivosSalida = [];
    try { archivosSalida = await fs.readdir(salidaDir); } catch { /* la carpeta de salida puede no existir todavía */ }
    const re = new RegExp(`^${slug}-(\\d+)\\.webp$`);
    for (const f of [...archivosSalida, ...conocidas.map((e) => e.archivo)]) {
        const m = f.match(re);
        if (m) ocupados.add(Number(m[1]));
    }
    let siguiente = 1;
    const proximoNumero = () => {
        while (ocupados.has(siguiente)) siguiente++;
        ocupados.add(siguiente);
        return siguiente;
    };

    const resultados = [];
    const fallidas = [];
    const retoques = [];
    for (const nombre of retocadas) {
        try {
            retoques.push(await aplicarRetocada(origen, nombre, manifiesto));
        } catch (e) {
            fallidas.push({ original: nombre, motivo: e.message });
        }
    }
    const repetidas = [];
    const parecidas = [];

    for (const nombre of normales) {
        const rutaOrigen = path.join(origen, nombre);
        try {
            const sha1 = await sha1De(rutaOrigen);
            const dhash = await dhashDe(rutaOrigen);

            if (!forzar) {
                const comparables = [...huellas, ...enEstaCorrida];
                const igual = comparables.find((e) => e.sha1 === sha1);
                if (igual) { repetidas.push({ original: nombre, con: igual }); continue; }
                if (huellaUtil(dhash)) {
                    const par = comparables.find((e) => e.dhash && huellaUtil(e.dhash) && distancia(e.dhash, dhash) <= UMBRAL_PARECIDA);
                    if (par) { parecidas.push({ original: nombre, con: par, dist: distancia(par.dhash, dhash) }); continue; }
                }
            }

            const { data, info } = await sharp(rutaOrigen)
                .rotate() // aplica la orientación EXIF antes de cualquier otra cosa
                .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: CALIDAD_WEBP })
                .toBuffer({ resolveWithObject: true });

            // Con --forzar, una foto ya anotada en esta carpeta cuyo archivo se borró se recupera con el mismo nombre
            const previa = forzar ? manifiesto.fotos.find((e) => e.sha1 === sha1) : null;
            const recuperar = previa && !(await existe(path.join(salidaDir, previa.archivo)));
            const archivo = recuperar ? previa.archivo : `${slug}-${String(proximoNumero()).padStart(2, '0')}.webp`;
            const destino = path.join(salidaDir, archivo);

            // Nunca pisar: si el archivo ya existe, se avisa y no se escribe.
            if (!dryRun) {
                try {
                    await fs.writeFile(destino, data, { flag: 'wx' });
                } catch (e) {
                    if (e.code === 'EEXIST') throw new Error(`ya existe ${archivo}, no se pisa`);
                    throw e;
                }
                // Comprobar que el archivo generado no trae metadatos
                const meta = await sharp(destino).metadata();
                if (meta.exif || meta.xmp || meta.iptc || meta.icc) {
                    throw new Error(`${archivo} salió con metadatos (${['exif', 'xmp', 'iptc', 'icc'].filter((k) => meta[k]).join(', ')})`);
                }
            }

            const entradaNueva = { original: nombre, sha1, dhash, archivo, fecha: new Date().toISOString().slice(0, 10) };
            if (!recuperar) nuevas.push(entradaNueva);
            enEstaCorrida.push({ ...entradaNueva, carpeta: slug });
            resultados.push({ original: nombre, archivo, ancho: info.width, alto: info.height, kb: kb(data.length) });
        } catch (e) {
            fallidas.push({ original: nombre, motivo: e.message });
        }
    }

    if (!dryRun && (nuevas.length || retoques.some((r) => r.tipo === 'reemplazada'))) { // las recuperadas ya estaban anotadas
        manifiesto.fotos.push(...nuevas);
        await guardarManifiesto(manifiesto);
    }

    // Reporte
    if (resultados.length) {
        console.log('Original | Archivo generado | Píxeles | Peso');
        for (const r of resultados) {
            const aviso = r.kb > AVISO_KB ? `  ⚠ pasa los ${AVISO_KB} KB` : '';
            console.log(`${r.original} | ${r.archivo} | ${r.ancho}x${r.alto} | ${r.kb} KB${aviso}`);
        }
        const total = resultados.reduce((s, r) => s + r.kb, 0);
        console.log(`\nTotal: ${resultados.length} foto(s) nueva(s), ${(total / 1024).toFixed(2)} MB`);
    } else {
        console.log(retoques.length ? 'No hay fotos nuevas (solo retocadas).' : 'No hay fotos nuevas para procesar.');
    }

    const aplicadas = retoques.filter((r) => r.tipo === 'reemplazada');
    if (aplicadas.length) {
        console.log(`\nRetocadas${dryRun ? ' (se reemplazarían)' : ' (reemplazan al archivo de la web, con el mismo nombre)'}:`);
        for (const r of aplicadas) {
            const medidas = r.antes ? (r.antes.ancho === r.ancho && r.antes.alto === r.alto ? `mismas medidas (${r.ancho}x${r.alto})` : `${r.antes.ancho}x${r.antes.alto} -> ${r.ancho}x${r.alto}`) : `${r.ancho}x${r.alto}, el archivo no estaba (foto descartada que ahora se genera)`;
            const posts = r.posts.length ? `${dryRun || !r.cambianMedidas ? 'la usan' : 'width y height actualizados en'}: ${r.posts.join(', ')}` : 'no la usa ningún post';
            const aviso = r.kb > AVISO_KB ? `  ⚠ pasa los ${AVISO_KB} KB` : '';
            console.log(`  - ${r.nombre} -> ${r.archivo} | ${medidas} | ${r.kb} KB${aviso} | ${posts}`);
            if (r.copia) console.log(`    versión anterior guardada en ${r.copia}`);
        }
    }
    const yaAplicadas = retoques.filter((r) => r.tipo === 'ya-aplicada');
    if (yaAplicadas.length) {
        console.log('\nRetocadas que ya se habían aplicado (sin cambios):');
        for (const r of yaAplicadas) console.log(`  - ${r.nombre} -> ${r.archivo}`);
    }
    const sinOriginal = retoques.filter((r) => r.tipo === 'sin-original');
    if (sinOriginal.length) {
        console.log('\nRetocadas sin original en el manifiesto de esta carpeta (no se tocaron; revisar el nombre, tiene que ser el del original más "-retocada"):');
        for (const r of sinOriginal) console.log(`  - ${r.nombre}`);
    }
    const estado = async (e) => ((await existe(path.join(salidaDir, e.archivo))) ? '' : ' (ese archivo ya no está: no se usó o se borró; --forzar para generarla de nuevo)');
    if (repetidas.length) {
        console.log('\nYa procesadas antes, se saltearon:');
        for (const r of repetidas) console.log(`  - ${r.original} es la misma foto que ${r.con.original} de "${r.con.carpeta}" → ${r.con.archivo}${await estado(r.con)}`);
    }
    if (parecidas.length) {
        console.log('\nParecidas a una ya procesada, se saltearon (¿reenviada, achicada o retocada? con --forzar se procesa igual):');
        for (const r of parecidas) console.log(`  - ${r.original} se parece a ${r.con.original} de "${r.con.carpeta}" → ${r.con.archivo} (diferencia ${r.dist} de 64)${await estado(r.con)}`);
    }
    if (fallidas.length) {
        console.log('\nNo se pudieron procesar:');
        for (const f of fallidas) console.log(`  - ${f.original}: ${f.motivo}`);
    }
    if (noSoportadas.length) {
        console.log('\nFormato de imagen que este script no convierte (no se tocó; pasarla a jpg o usar npm run optimizar para HEIC):');
        for (const f of noSoportadas) console.log(`  - ${f}`);
    }
    if (videos.length) {
        console.log('\nVideos (no se procesan):');
        for (const f of videos) console.log(`  - ${f}`);
    }
    if (ignorados.length) {
        console.log(`\nOtros archivos ignorados: ${ignorados.join(', ')}`);
    }
    if (dryRun) console.log('\nPrueba terminada, no se escribió nada. Sin --dry-run se generan los archivos de arriba y se anotan en el manifiesto.');
    else if (nuevas.length) console.log(`\nAnotado en ${path.relative(process.cwd(), archivoManifiesto(slug))}: va en el commit junto con las imágenes. Para renombrar usá npm run fotos -- --renombrar ${slug} viejo.webp nuevo.webp (así el manifiesto sigue al día).`);
}

async function main() {
    if (args.includes('--listar')) return listar(posicionales[0] || salir('Uso: npm run fotos -- --listar carpeta'));
    if (args.includes('--renombrar')) return renombrar(posicionales[0], posicionales[1], posicionales[2]);
    if (args.includes('--registrar')) return registrar(posicionales[0], posicionales[1], posicionales[2]);
    if (!posicionales[0]) return salir('Falta el nombre de la carpeta. Uso: npm run fotos -- nombre-de-carpeta [--dry-run]');
    return procesar(posicionales[0]);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
