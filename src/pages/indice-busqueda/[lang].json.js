// Índice liviano para el buscador del Header: /indice-busqueda/es.json y /indice-busqueda/en.json.
// El Header lo descarga recién cuando alguien abre la lupa, en vez de llevar todos los posts en cada página.
const postsEs = import.meta.glob('../diario/*.md', { eager: true });
const postsEn = import.meta.glob('../en/journal/*.md', { eager: true });

export function getStaticPaths() {
    return [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];
}

const sinTildes = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '');

// Texto plano del Markdown: sin HTML, sin URLs de links ni imágenes, sin marcas de formato.
function textoPlano(md) {
    return md
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/https?:\/\/\S+/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .replace(/[#*_>|`~\\-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function GET({ params }) {
    const posts = Object.values(params.lang === 'en' ? postsEn : postsEs);
    const indice = posts.map((post) => {
        const fm = post.frontmatter || {};
        const titulo = fm.title || '';
        const contenido = typeof post.rawContent === 'function' ? textoPlano(post.rawContent()) : '';
        return {
            title: titulo,
            url: post.url || '',
            image: fm.main_image || '',
            tag: fm.tag || 'Diario',
            s: sinTildes(`${titulo} ${fm.description || ''} ${contenido}`.toLowerCase()),
        };
    });
    return new Response(JSON.stringify(indice), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
