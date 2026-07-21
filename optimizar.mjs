import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// 1. Apuntamos a las raíces generales
const imgDir = './public/img'; 
const contentDir = './src';    

async function optimizarTodo() {
    console.log('🔍 Escaneando todas las carpetas buscando imágenes (incluyendo WebP)...');
    
    try {
        const files = await fs.readdir(imgDir, { recursive: true });
        
        // AHORA BUSCAMOS TAMBIÉN ARCHIVOS .WEBP
        const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

        if (images.length === 0) {
            console.log('✅ No hay imágenes para optimizar.');
        } else {
            for (const img of images) {
                const oldPath = path.join(imgDir, img);
                const isWebp = /\.webp$/i.test(img);
                
                // Si ya es webp, Sharp necesita un archivo temporal para no chocar consigo mismo
                const newPath = isWebp 
                    ? oldPath.replace(/\.webp$/i, '-tmp.webp') 
                    : oldPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

                // Aplicamos compresión y redimensionado a TODAS las fotos
                await sharp(oldPath)
                    .resize({
                        width: 1920,
                        withoutEnlargement: true
                    })
                    .webp({ 
                        quality: 65,
                        effort: 6
                    })
                    .toFile(newPath);
                
                // Borramos el archivo original (ya sea JPG o el WebP al 80%)
                await fs.unlink(oldPath);
                
                // Si era WebP desde el principio, le devolvemos el nombre original al temporal
                if (isWebp) {
                    await fs.rename(newPath, oldPath);
                    console.log(`♻️  Re-optimizado: ${img}`);
                } else {
                    console.log(`⚡  Convertido y Optimizado: ${img}`);
                }
            }
        }

        // 3. ACTUALIZAR TODOS LOS ARCHIVOS DE TEXTO Y CÓDIGO
        console.log('\n📝 Actualizando rutas en el código de toda la web...');
        const srcFiles = await fs.readdir(contentDir, { recursive: true });
        const textFiles = srcFiles.filter(f => f.endsWith('.md') || f.endsWith('.astro'));

        let archivosModificados = 0;

        for (const file of textFiles) {
            const filePath = path.join(contentDir, file);
            
            const stat = await fs.stat(filePath);
            if (!stat.isFile()) continue;

            const content = await fs.readFile(filePath, 'utf8');
            // Reemplaza extensiones viejas por webp globalmente (si ya dice .webp, lo deja igual)
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

        console.log('\n🚀 ¡Todas las imágenes (nuevas y viejas) optimizadas!');

    } catch (error) {
        console.error('❌ Hubo un error en el proceso:', error);
    }
}

optimizarTodo();