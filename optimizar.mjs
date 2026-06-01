import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Rutas de tus carpetas
const imgDir = './public/img/diario';
const mdDir = './src/pages/diario';

async function optimizarTodo() {
    console.log('🔍 Buscando imágenes para optimizar...');
    
    try {
        // 1. LEER IMÁGENES Y CONVERTIR A WEBP
        const files = await fs.readdir(imgDir);
        // Filtramos solo los jpg, jpeg o png
        const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

        if (images.length === 0) {
            console.log('✅ No hay imágenes nuevas en JPG/PNG para optimizar.');
        } else {
            for (const img of images) {
                const oldPath = path.join(imgDir, img);
                // Le cambiamos la extensión al nombre
                const newFileName = img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                const newPath = path.join(imgDir, newFileName);

                // Convertimos a WebP con calidad al 80%
                await sharp(oldPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
                
                // Borramos el JPG original pesado
                await fs.unlink(oldPath);
                console.log(`🖼️  Convertido y reemplazado: ${img} -> ${newFileName}`);
            }
        }

        // 2. ACTUALIZAR LOS ARCHIVOS .MD
        console.log('\n📝 Revisando los textos del diario...');
        const mdFiles = await fs.readdir(mdDir);
        const mds = mdFiles.filter(f => f.endsWith('.md'));

        let mdModificados = 0;

        for (const md of mds) {
            const mdPath = path.join(mdDir, md);
            const content = await fs.readFile(mdPath, 'utf8');

            // Buscamos cualquier mención a .jpg, .jpeg o .png y la pasamos a .webp
            const updatedContent = content.replace(/\.(jpg|jpeg|png)/gi, '.webp');

            // Si hubo cambios en el texto, guardamos el archivo
            if (content !== updatedContent) {
                await fs.writeFile(mdPath, updatedContent, 'utf8');
                console.log(`✍️  Rutas actualizadas en: ${md}`);
                mdModificados++;
            }
        }

        if (mdModificados === 0) {
            console.log('✅ Los textos ya estaban al día.');
        }

        console.log('\n🚀 ¡Todo listo! La bitácora está optimizada y lista para subir.');

    } catch (error) {
        console.error('❌ Hubo un error en el proceso:', error);
    }
}

optimizarTodo();