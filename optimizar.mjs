import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// 1. Apuntamos a las raíces generales
const imgDir = './public/img'; // Ahora arranca desde la carpeta padre
const contentDir = './src';    // Busca en toda la web (pages, layouts, components)

async function optimizarTodo() {
    console.log('🔍 Escaneando todas las carpetas y subcarpetas de imágenes...');
    
    try {
        // 2. LEER IMÁGENES RECURSIVAMENTE (Entra a todas las subcarpetas solas)
        const files = await fs.readdir(imgDir, { recursive: true });
        // Filtramos para agarrar solo JPG/PNG
        const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

        if (images.length === 0) {
            console.log('✅ No hay imágenes nuevas en JPG/PNG para optimizar.');
        } else {
            for (const img of images) {
                const oldPath = path.join(imgDir, img);
                // Le cambiamos la extensión al nombre respetando su subcarpeta
                const newPath = oldPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

                // Convertimos a WebP y borramos la original
                await sharp(oldPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
                
                await fs.unlink(oldPath);
                console.log(`🖼️  Convertido: ${img}`);
            }
        }

        // 3. ACTUALIZAR TODOS LOS ARCHIVOS DE TEXTO Y CÓDIGO
        console.log('\n📝 Actualizando rutas en el código de toda la web...');
        const srcFiles = await fs.readdir(contentDir, { recursive: true });
        // Buscamos tanto en crónicas (.md) como en componentes de Astro (.astro)
        const textFiles = srcFiles.filter(f => f.endsWith('.md') || f.endsWith('.astro'));

        let archivosModificados = 0;

        for (const file of textFiles) {
            const filePath = path.join(contentDir, file);
            
            // Evitamos errores leyendo carpetas con puntos en el nombre
            const stat = await fs.stat(filePath);
            if (!stat.isFile()) continue;

            const content = await fs.readFile(filePath, 'utf8');
            // Reemplaza extensiones viejas por webp globalmente
            const updatedContent = content.replace(/\.(jpg|jpeg|png)/gi, '.webp');

            if (content !== updatedContent) {
                await fs.writeFile(filePath, updatedContent, 'utf8');
                console.log(`✍️  Actualizado: src/${file}`);
                archivosModificados++;
            }
        }

        if (archivosModificados === 0) {
            console.log('✅ El código ya estaba al día.');
        }

        console.log('\n🚀 ¡Toda la web está optimizada y lista!');

    } catch (error) {
        console.error('❌ Hubo un error en el proceso:', error);
    }
}

optimizarTodo();