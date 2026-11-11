import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

// Procesa las fotos de una carpeta de origen (copia de la carpeta de Drive) y las deja listas para el blog.
//
// Uso:
//   npm run fotos -- nombre-de-carpeta [--dry-run] [--salida carpeta] [--origen carpeta]
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

const LADO_MAXIMO = 1920;
const CALIDAD_WEBP = 80;
const AVISO_KB = 400;
const SALIDA_POR_DEFECTO = './public/img/diario';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

function valorDe(flag) {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : null;
}

const flagsConValor = new Set(['--salida', '--origen']);
const posicionales = args.filter((a, i) => !a.startsWith('--') && !flagsConValor.has(args[i - 1]));
const entrada = posicionales[0];

if (!entrada) {
    console.error('Falta el nombre de la carpeta. Uso: npm run fotos -- nombre-de-carpeta [--dry-run]');
    process.exit(1);
}

const salidaDir = path.resolve(valorDe('--salida') || SALIDA_POR_DEFECTO);
const origenRaiz = path.resolve(
    valorDe('--origen') || process.env.FOTOS_ORIGEN || path.join(os.homedir(), '.cache', 'blog-fotos')
);

const EXT_FOTO = /\.(jpe?g|png|webp)$/i;
const EXT_IMAGEN_NO_SOPORTADA = /\.(heic|heif|tiff?|bmp|gif|avif|raw|dng|cr2|nef|arw)$/i;
const EXT_VIDEO = /\.(mov|mp4|m4v|avi|mkv|webm|3gp)$/i;

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

async function resolverOrigen() {
    const comoRuta = path.resolve(entrada);
    if (entrada.includes('/') && await existe(comoRuta)) return comoRuta;
    const enRaiz = path.join(origenRaiz, entrada);
    if (await existe(enRaiz)) return enRaiz;
    console.error(`No encontré la carpeta "${entrada}".`);
    console.error(`Busqué en: ${enRaiz}`);
    console.error('Pasá la ruta completa, o usá --origen / la variable FOTOS_ORIGEN para indicar dónde están las carpetas.');
    process.exit(1);
}

// Siguiente número libre para slug-NN.webp, sin pisar nada que ya exista.
async function numerosOcupados(slug) {
    const ocupados = new Set();
    let archivos = [];
    try { archivos = await fs.readdir(salidaDir); } catch { /* la carpeta de salida puede no existir todavía */ }
    const re = new RegExp(`^${slug}-(\\d+)\\.webp$`);
    for (const f of archivos) {
        const m = f.match(re);
        if (m) ocupados.add(Number(m[1]));
    }
    return ocupados;
}

const kb = (bytes) => Math.round(bytes / 1024);

async function main() {
    const origen = await resolverOrigen();
    const slug = nombreLimpio(path.basename(origen)) || 'foto';
    const todos = (await fs.readdir(origen, { withFileTypes: true }))
        .filter((e) => e.isFile() && !e.name.startsWith('.'))
        .map((e) => e.name)
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

    const fotos = todos.filter((f) => EXT_FOTO.test(f));
    const videos = todos.filter((f) => EXT_VIDEO.test(f));
    const noSoportadas = todos.filter((f) => EXT_IMAGEN_NO_SOPORTADA.test(f));
    const ignorados = todos.filter((f) => !EXT_FOTO.test(f) && !EXT_VIDEO.test(f) && !EXT_IMAGEN_NO_SOPORTADA.test(f));

    console.log(`${dryRun ? '[PRUEBA, no se escribe nada] ' : ''}Origen: ${origen}`);
    console.log(`Salida: ${salidaDir}`);
    console.log(`Fotos para procesar: ${fotos.length}\n`);

    if (!dryRun) await fs.mkdir(salidaDir, { recursive: true });
    const ocupados = await numerosOcupados(slug);
    let siguiente = 1;
    const proximoNumero = () => {
        while (ocupados.has(siguiente)) siguiente++;
        ocupados.add(siguiente);
        return siguiente;
    };

    const resultados = [];
    const fallidas = [];

    for (const nombre of fotos) {
        const rutaOrigen = path.join(origen, nombre);
        try {
            const { data, info } = await sharp(rutaOrigen)
                .rotate() // aplica la orientación EXIF antes de cualquier otra cosa
                .resize({ width: LADO_MAXIMO, height: LADO_MAXIMO, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: CALIDAD_WEBP })
                .toBuffer({ resolveWithObject: true });

            const n = String(proximoNumero()).padStart(2, '0');
            const archivo = `${slug}-${n}.webp`;
            const destino = path.join(salidaDir, archivo);

            // Nunca pisar: si por una carrera el archivo apareció, se avisa y no se escribe.
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

            resultados.push({ original: nombre, archivo, ancho: info.width, alto: info.height, kb: kb(data.length) });
        } catch (e) {
            fallidas.push({ original: nombre, motivo: e.message });
        }
    }

    // Reporte
    if (resultados.length) {
        console.log('Original | Archivo generado | Píxeles | Peso');
        for (const r of resultados) {
            const aviso = r.kb > AVISO_KB ? `  ⚠ pasa los ${AVISO_KB} KB` : '';
            console.log(`${r.original} | ${r.archivo} | ${r.ancho}x${r.alto} | ${r.kb} KB${aviso}`);
        }
        const total = resultados.reduce((s, r) => s + r.kb, 0);
        console.log(`\nTotal: ${resultados.length} foto(s), ${(total / 1024).toFixed(2)} MB`);
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
    if (dryRun) console.log('\nPrueba terminada, no se escribió nada. Sin --dry-run se generan los archivos de arriba.');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
