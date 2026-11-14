// Genera docs/indice-articulos.md: la lista liviana de artículos publicados,
// para que los proyectos de Claude de Lore sepan qué hay sin leer los posts.
// Corre solo antes de cada build (npm run build) o a mano con npm run indice.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const leer = (dir) =>
  fs.readdirSync(path.join(raiz, dir))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const texto = fs.readFileSync(path.join(raiz, dir, f), 'utf8');
      const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return { archivo: f, slug: f.replace(/\.md$/, ''), fm: m ? yaml.load(m[1], { schema: yaml.CORE_SCHEMA }) || {} : {} };
    });

const es = leer('src/pages/diario');
const en = leer('src/pages/en/journal');
const enPorOriginal = new Map(
  en.filter((p) => p.fm.archivo_original).map((p) => [p.fm.archivo_original, p.slug]),
);

// La fecha tal como está escrita en el post (sin pasarla a UTC, que la corre un día).
const fecha = (d) => {
  const t = String(d ?? '');
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const f = new Date(t);
  if (Number.isNaN(f.getTime())) return t;
  const dos = (n) => String(n).padStart(2, '0');
  return `${f.getFullYear()}-${dos(f.getMonth() + 1)}-${dos(f.getDate())}`;
};
const celda = (t) => String(t ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();

const porPais = new Map();
for (const p of es) {
  const pais = p.fm.pais || 'Sin país';
  if (!porPais.has(pais)) porPais.set(pais, []);
  porPais.get(pais).push(p);
}

let md = `# Índice de artículos publicados

Generado automáticamente por \`scripts/indice-articulos.mjs\` antes de cada build (o con \`npm run indice\`). No se edita a mano. Los artículos completos están en \`src/pages/diario/\` (español) y \`src/pages/en/journal/\` (inglés).

Publicados: ${es.length} en español y ${en.length} en inglés.
`;
for (const [pais, posts] of [...porPais].sort((a, b) => b[1].length - a[1].length)) {
  md += `\n## ${pais} (${posts.length})\n\n| Título | URL | Categoría | Fecha | Inglés |\n|---|---|---|---|---|\n`;
  for (const p of posts.sort((a, b) => fecha(b.fm.date).localeCompare(fecha(a.fm.date)))) {
    const ing = enPorOriginal.get(p.archivo);
    md += `| ${celda(p.fm.title)} | /diario/${p.slug}/ | ${celda(p.fm.tag)} | ${fecha(p.fm.date)} | ${ing ? `/en/journal/${ing}/` : 'falta'} |\n`;
  }
}
fs.writeFileSync(path.join(raiz, 'docs/indice-articulos.md'), md);
console.log(`indice-articulos: ${es.length} artículos en español, ${en.length} en inglés`);
