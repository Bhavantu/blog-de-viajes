import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Convierte a WebP todas las imágenes de public/img que no lo sean (jpg, jpeg, png, heic, heif),
// normaliza el nombre (minúsculas, sin espacios ni tildes) y actualiza las rutas en src/.
//
// Uso:
//   npm run optimizar             convierte y actualiza las rutas
//   npm run optimizar -- --revisar   solo muestra lo que haría, sin tocar nada
//
// Los originales no se borran: se mueven a ../backup-imagenes-originales/ (fuera del repo).
// Para los HEIC del celular hace falta `npm install --save-dev heic-convert`
// (sharp no trae el decodificador HEVC).

const imgDir = './public/img';
const contentDir = './src';
const backupDir = '../backup-imagenes-originales';
const soloRevisar = process.argv.includes('--revisar');

const ANCHO_MAXIMO = 1920;
const CALIDAD_WEBP = 65;

const esConvertible = (f) => /\.(jpe?g|png|heic|heif)$/i.test(f);
const esHeic = (f) => /\.(heic|heif)$/i.test(f);

// "pagoda-de -la-Etnia_Dái.JPG" -> "pagoda-de-la-etnia-dai"
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

async function destinoLibre(dir, base) {
    let candidato = path.join(dir, `${base}.webp`);
    for (let n = 2; await existe(candidato); n++) {
        candidato = path.join(dir, `${base}-${n}.webp`);
    }
    return candidato;
}

let heicConvert = null;
async function cargarHeicConvert() {
    try {
        heicConvert = (await import('heic-convert')).default;
    } catch {
        heicConvert = null;
    }
}

async function leerImagen(ruta) {
    if (!esHeic(ruta)) return ruta;
    const buffer = await fs.readFile(ruta);
    return Buffer.from(await heicConvert({ buffer, format: 'JPEG', quality: 1 }));
}

async function optimizarTodo() {
    const archivos = (await fs.readdir(imgDir, { recursive: true })).filter(esConvertible);

    if (archivos.length === 0) {
        console.log('✅ No hay imágenes para convertir: todo está en WebP.');
        return;
    }

    await cargarHeicConvert();

    // ruta pública vieja (/img/...) -> ruta pública nueva
    const cambios = new Map();
    const pendientes = [];

    for (const rel of archivos) {
        const origen = path.join(imgDir, rel);
        const dir = path.dirname(origen);
        const base = nombreLimpio(path.parse(rel).name) || 'imagen';

        if (esHeic(rel) && !heicConvert) {
            pendientes.push(rel);
            continue;
        }

        const destino = await destinoLibre(dir, base);
        const publicaVieja = '/' + path.relative('./public', origen).split(path.sep).join('/');
        const publicaNueva = '/' + path.relative('./public', destino).split(path.sep).join('/');

        if (soloRevisar) {
            console.log(`🔎 ${publicaVieja}  ->  ${publicaNueva}`);
            cambios.set(publicaVieja, publicaNueva);
            continue;
        }

        await sharp(await leerImagen(origen))
            .rotate() // respeta la orientación EXIF de las fotos del celular
            .resize({ width: ANCHO_MAXIMO, withoutEnlargement: true })
            .webp({ quality: CALIDAD_WEBP, effort: 6 })
            .toFile(destino);

        const respaldo = path.join(backupDir, rel);
        await fs.mkdir(path.dirname(respaldo), { recursive: true });
        await fs.rename(origen, respaldo).catch(async () => {
            await fs.copyFile(origen, respaldo);
            await fs.unlink(origen);
        });

        const antes = (await fs.stat(respaldo)).size;
        const despues = (await fs.stat(destino)).size;
        console.log(`⚡ ${publicaVieja}  ->  ${publicaNueva}  (${Math.round(antes / 1024)} KB -> ${Math.round(despues / 1024)} KB)`);
        cambios.set(publicaVieja, publicaNueva);
    }

    // Actualiza solo las rutas locales de las imágenes convertidas, nunca URLs externas
    if (cambios.size > 0) {
        const textos = (await fs.readdir(contentDir, { recursive: true }))
            .filter((f) => /\.(md|mdx|astro|js|ts|json)$/.test(f));

        for (const archivo of textos) {
            const ruta = path.join(contentDir, archivo);
            if (!(await fs.stat(ruta)).isFile()) continue;

            const contenido = await fs.readFile(ruta, 'utf8');
            let nuevo = contenido;
            for (const [vieja, nueva] of cambios) {
                nuevo = nuevo.split(vieja).join(nueva);
                nuevo = nuevo.split(encodeURI(vieja)).join(nueva);
            }
            if (nuevo !== contenido) {
                if (soloRevisar) {
                    console.log(`🔎 Actualizaría rutas en src/${archivo}`);
                } else {
                    await fs.writeFile(ruta, nuevo, 'utf8');
                    console.log(`✍️  Rutas actualizadas en src/${archivo}`);
                }
            }
        }
    }

    if (pendientes.length > 0) {
        console.log('\n⚠️  Estos HEIC no se convirtieron porque falta el paquete heic-convert:');
        for (const p of pendientes) console.log(`   - public/img/${p}`);
        console.log('   Instalalo con `npm install --save-dev heic-convert` y volvé a correr `npm run optimizar`.');
        process.exitCode = 1;
    }

    console.log(soloRevisar ? '\n🔎 Modo revisión: no se tocó ningún archivo.' : '\n🚀 Listo.');
}

optimizarTodo().catch((error) => {
    console.error('❌ Hubo un error en el proceso:', error);
    process.exitCode = 1;
});
