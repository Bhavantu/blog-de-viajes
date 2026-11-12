// Marca con rel="sponsored" los links a comercios de los posts en Markdown.
// Google pide ese atributo en los links de programas de afiliados, sean manuales o automáticos
// (Stay22 convierte los links salientes a comercios en links de afiliado).
// https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
//
// Si se suma un comercio nuevo a los posts, agregar su dominio acá.
export const DOMINIOS_COMERCIALES = [
    'booking.com',
    'getyourguide.com',
    'trip.com',
    'agoda.com',
    'viator.com',
    '12go.asia',
    'tripadvisor.com',
    'campstar.com',
    'airalo.pxf.io',
    'airalo.com',
    'amazon.com',
    'amazon.es',
    'amzn.to',
];

export function esComercial(href) {
    let host;
    try {
        host = new URL(href).hostname.toLowerCase();
    } catch {
        return false; // links internos o relativos
    }
    return DOMINIOS_COMERCIALES.some((d) => host === d || host.endsWith(`.${d}`));
}

function recorrer(nodo, fn) {
    fn(nodo);
    if (nodo.children) for (const hijo of nodo.children) recorrer(hijo, fn);
}

// Los bloques HTML que Astro deja sin procesar (nodos "raw") se corrigen sobre el texto:
// a cada <a> con href a un comercio se le suma sponsored y noopener al rel (o se le agrega el rel).
function corregirHtml(html) {
    return html.replace(/<a\b[^>]*>/gi, (etiqueta) => {
        const href = etiqueta.match(/\shref\s*=\s*["']([^"']+)["']/i);
        if (!href || !esComercial(href[1].replace(/&amp;/g, '&'))) return etiqueta;
        const rel = etiqueta.match(/\srel\s*=\s*["']([^"']*)["']/i);
        if (rel) {
            const valores = new Set(rel[1].split(/\s+/).filter(Boolean));
            valores.add('sponsored');
            valores.add('noopener');
            return etiqueta.replace(rel[0], ` rel="${[...valores].join(' ')}"`);
        }
        return etiqueta.replace(/^<a\b/i, '<a rel="sponsored noopener"');
    });
}

export default function rehypeLinksAfiliados() {
    return (arbol) => {
        recorrer(arbol, (nodo) => {
            if (nodo.type === 'raw' && typeof nodo.value === 'string') {
                nodo.value = corregirHtml(nodo.value);
                return;
            }
            if (nodo.type !== 'element' || nodo.tagName !== 'a') return;
            const href = nodo.properties?.href;
            if (typeof href !== 'string' || !esComercial(href)) return;
            const actual = nodo.properties.rel;
            const rel = new Set(Array.isArray(actual) ? actual : typeof actual === 'string' ? actual.split(/\s+/) : []);
            rel.add('sponsored');
            rel.add('noopener');
            nodo.properties.rel = [...rel].filter(Boolean);
        });
    };
}
