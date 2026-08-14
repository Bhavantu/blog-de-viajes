import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const carpetaOrigen = './src/pages/diario';
const carpetaDestino = './src/pages/en/journal';

// Función para interactuar con Ollama e imprimir en tiempo real
async function traducirConOllama(prompt) {
    const respuesta = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3',
            system: "You are a professional travel blogger and translator. Your job is to translate Spanish text to English. You must maintain the exact same tone, punctuation, and Markdown formatting (like asterisks for bold, hashtags for headers, and URL brackets). Do not translate code blocks, HTML tags, or file paths.",
            prompt: `Translate the following text to English. ONLY output the translation, without any conversational filler or introductions:\n\n${prompt}`,
            stream: true
        })
    });

    let textoTraducido = '';
    const decoder = new TextDecoder("utf-8");

    for await (const chunk of respuesta.body) {
        const decodificado = decoder.decode(chunk);
        const lineas = decodificado.split('\n').filter(linea => linea.trim() !== '');
        
        for (const linea of lineas) {
            const json = JSON.parse(linea);
            process.stdout.write(json.response); 
            textoTraducido += json.response;
        }
    }
    
    return textoTraducido.trim();
}

async function procesarArticulos() {
    console.log('Analizando el estado de las traducciones...\n');

    const archivosIngles = fs.readdirSync(carpetaDestino).filter(a => a.endsWith('.md'));
    const yaTraducidos = archivosIngles.map(arch => {
        const contenido = fs.readFileSync(path.join(carpetaDestino, arch), 'utf-8');
        const { data } = matter(contenido);
        return data.archivo_original; 
    }).filter(Boolean);

    const archivosEspanol = fs.readdirSync(carpetaOrigen).filter(a => a.endsWith('.md'));

    for (const archivo of archivosEspanol) {
        if (yaTraducidos.includes(archivo)) {
            console.log(`✅ Salteando ${archivo} (Ya traducido)`);
            continue;
        }

        console.log(`\n==================================================`);
        console.log(`🚀 TRADUCIENDO: ${archivo}`);
        console.log(`==================================================\n`);
        
        const rutaOrigen = path.join(carpetaOrigen, archivo);
        const contenidoCrudo = fs.readFileSync(rutaOrigen, 'utf-8');
        const { data: frontmatter, content: cuerpoMarkdown } = matter(contenidoCrudo);

        console.log('\n➡️  Traduciendo Título...');
        const tituloTraducido = await traducirConOllama(frontmatter.title);
        
        console.log('\n➡️  Traduciendo Descripción...');
        const descTraducida = await traducirConOllama(frontmatter.description);

        console.log('\n➡️  Generando URL (slug) en inglés...');
        let slugGenerado = await traducirConOllama(`Convert this exact phrase into a URL slug. Use ONLY lowercase letters and hyphens (kebab-case). Example: "My Trip to Bali" becomes "my-trip-to-bali". Phrase: "${frontmatter.title}"`);
        slugGenerado = slugGenerado.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
        
        const prefijoFecha = archivo.match(/^\d{4}-\d{2}-\d{2}/);
        const nuevoNombreArchivo = prefijoFecha ? `${prefijoFecha[0]}-${slugGenerado}.md` : `${slugGenerado}.md`;

        console.log(`\n➡️  Traduciendo Contenido por fragmentos (Esto puede tardar)...`);
        
        // 1. Separamos el texto en bloques usando el doble salto de línea clásico de Markdown
        const fragmentos = cuerpoMarkdown.split('\n\n');
        let cuerpoTraducidoFinal = '';

        // 2. Procesamos cada fragmento uno por uno
        for (let i = 0; i < fragmentos.length; i++) {
            const fragmento = fragmentos[i].trim();
            
            // Ignoramos fragmentos vacíos
            if (!fragmento) continue;

            // Si el fragmento es puro HTML (como tus cajitas de imágenes) lo pasamos tal cual sin traducir
            if (fragmento.startsWith('<div') || fragmento.startsWith('<iframe') || fragmento.startsWith('![')) {
                cuerpoTraducidoFinal += fragmento + '\n\n';
                process.stdout.write(`\n[Bloque de código HTML o Imagen omitido]\n`);
                continue;
            }

            // Traducimos el fragmento de texto
            const fragmentoIngles = await traducirConOllama(fragmento);
            cuerpoTraducidoFinal += fragmentoIngles + '\n\n';
            console.log('\n'); // Salto de línea visual entre párrafos procesados
        }

        const nuevoFrontmatter = {
            ...frontmatter,
            title: tituloTraducido,
            description: descTraducida,
            layout: '../../layouts/BlogPostLayout.astro',
            archivo_original: archivo
        };

        const archivoFinal = matter.stringify(cuerpoTraducidoFinal.trim(), nuevoFrontmatter);
        const rutaDestino = path.join(carpetaDestino, nuevoNombreArchivo);
        
        fs.writeFileSync(rutaDestino, archivoFinal);
        console.log(`\n🎉 Guardado exitosamente como: ${nuevoNombreArchivo}`);
    }
    
    console.log('\n✨ Proceso automatizado finalizado al 100%.');
}

procesarArticulos();