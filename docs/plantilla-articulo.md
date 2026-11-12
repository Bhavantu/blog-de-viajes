# Plantilla de artículo de Blogcito

Las estructuras de abajo son el punto de partida, no una lista obligatoria. Las piezas marcadas "si aplica" se usan cuando aportan algo (ver la guía de estilo, sección "Por defecto").

## Brief (se completa antes de pedir el borrador)
- Categoría (Guía de Viaje, Vida Local, Contexto y Cultura, Punto de Fuga)
- ¿Es pilar o satélite? Si es satélite, cuál es su única intención de búsqueda
- ¿Quien llega probablemente está eligiendo dónde dormir? (define si lleva el bloque "Si tenés poco tiempo"; ver la guía de estilo)
- Cómo lo busca la gente (consultas de Search Console, si las hay) y keywords secundarias
- Ciudad o tema
- Autor que firma (Lore o Santi)
- Cuánto tiempo estuvimos ahí y dónde nos quedamos
- Qué hicimos nosotros y qué solo investigamos
- Lo que nos gustó, lo que no y lo que saltearíamos, si tenemos algo para decir
- Anécdotas, personas locales, lugares concretos
- Precios que anotamos (con fecha) y lo que pagamos nosotros
- Fotos disponibles
- Pilar y satélites del cluster para enlazar
- Recurso descargable del destino, si existe

El brief se arma en el chat del artículo: Redacción propone keyword, slug, título, meta, estructura, enlaces y afiliados, y le pasa a Lore una ficha con los datos que faltan (tiempo en el lugar, dónde nos quedamos, precios con fecha, horarios, qué nos gustó y qué no, fotos). Los links y datos de cada destino viven en la hoja de Drive "Links y datos de [destino]" (una pestaña por tipo: trenes, alojamientos, tours, eSIM y seguros; columnas destino, nombre, URL, precio con fecha y notas), y los fijos en "Biblioteca de afiliados (fijos)"; Redacción las lee sin pedírselas a Lore.

## Estructura para Guía de Viaje (pilar o satélite de "qué hacer")
1. **Título** que diga claramente de qué trata, con las palabras con que se busca y, si aplica, el año y un gancho de experiencia u opinión.
2. **Firma y fecha.**
3. **Apertura** con nuestra credencial (cuánto tiempo y cómo) y lo que más le sirve a quien lee. Puede arrancar con una pregunta.
4. **Recuadro** hacia la guía pilar del destino (si es satélite).
5. **Bloque "Si tenés poco tiempo"** (si quien llega probablemente está eligiendo dónde dormir, según la guía de estilo) con hasta 3 alojamientos en formato compacto, marcando "Nos quedamos acá", y el tour más recomendado si aplica.
6. **Índice** "En este artículo".
7. **Nuestra experiencia**, breve.
8. **Lugares o actividades** en H3 numerados, con un detalle vivido cuando lo tengamos y los bullets que apliquen (Entrada, Precio, Cómo llegar, Mejor hora, Consejo).
9. **Qué saltearíamos** (si aplica).
10. **Antes de ir** (transporte, efectivo, clima, seguro de viaje, conectividad).
11. **Tabla de costos** en moneda local, USD y EUR, con fecha, observaciones cortas y los conceptos enlazados cuando tengan link.
12. **Lo que nos gustó, lo que no y ¿vale la pena?** (si aplica).
13. **Preguntas frecuentes** (si hay preguntas reales que el cuerpo no responde de forma directa), cada una como H3.
14. **¿Para quién es?** (si ayuda a decidir según el tipo de viajero).
15. **Más guías de [destino]** con los artículos del destino enlazados.
16. **Cierre** breve, CTA a calculadora o descargable, invitación a comentar.

## Estructura para "Dónde quedarse"
1. Título, firma, apertura con credencial y el error más común al elegir zona.
2. Bloque "Si tenés poco tiempo".
3. Nuestra experiencia (en qué zonas y hoteles nos quedamos).
4. Zonas en H2 numerados, con título que incluya nuestra mirada ("1. Kuta (donde nos quedamos 2 meses)"), para quién es cada zona y 2 o 3 hoteles en H3, cada uno con detalle concreto, precio aproximado y "Reservar acá".
5. Tabla resumen de zonas por tipo de viajero.
6. Preguntas frecuentes con H3 (si aplica).
7. ¿Para quién es cada zona? (cierre).
8. Más guías de [destino].

## Estructura para itinerario por días
Igual que la guía, con tabla resumen del itinerario al principio y cada día dividido en Mañana, Tarde y Noche, con lo que hicimos nosotros y lo que cambiaríamos.

## Estructura para "¿Vale la pena?"
Acá el veredicto es el tema del artículo, así que siempre va.
1. Respuesta corta en el primer párrafo (sí, no, o depende de qué).
2. Nuestra experiencia.
3. Lo que nos encantó.
4. Lo que no nos gustó o nos costó.
5. Para quién es y para quién no.
6. Si vas, lo que tenés que saber (con enlaces a satélites).
7. Preguntas frecuentes (si aplica) y Más guías de [destino].

## Estructura para Contexto y Cultura
1. **Título** con el tema y el lugar, que responda lo que la gente busca (por ejemplo, qué significa una palabra).
2. **Apertura** con pregunta intrigante.
3. **La leyenda o creencia**, contada con respeto.
4. **La historia**, con fechas y actores concretos.
5. **Qué dicen los datos**, contrastando la creencia con la explicación histórica o científica sin burlarse de ninguna y sin apoyarse en pseudociencia.
6. **Nuestra visita**, lo que vimos y sentimos.
7. **Guía práctica de visita** con Precio, Cómo llegar y Mejor hora.
8. **Etiqueta y respeto** en lugares de culto.
9. **Enlaces** a guías prácticas del mismo destino.

## Frontmatter (src/pages/diario/<slug>.md)

```
---
layout: ../../layouts/BlogPostLayout.astro
title: "..."
slug_url: <slug>
date: 2026-11-11T01:52:00.000+13:00
tag: guia de viaje
pais: China
description: "..."
main_image: /img/diario/<archivo>.webp
---
```

- El slug es el nombre definitivo de la URL: keyword al principio, minúsculas, ASCII sin tildes, con guiones, nunca "por libre" (por ejemplo `furongzhen-que-ver`). Se define antes de crear el archivo, porque después cambiarlo exige un redirect.
- `tag` admite: guia de viaje, vida local, contexto y cultura, punto de fuga, fotografia y bitacora (estos dos últimos no tienen categoría: ver Prioridad 5 de pendientes).
- Los posts en inglés llevan además `archivo_original` con el nombre del archivo en español.
- El índice "En este artículo" lo arma el sitio con los H2: no se escribe. El H1 es el `title` y no va en el cuerpo.

## Formatos del cuerpo

Los modelos son los artículos publicados `furongzhen-que-ver.md` (tarjetas de alojamiento y de trenes) y `que-hacer-amed-que-ver-guia-presupuesto.md` (bloque "Si tenés poco tiempo" y tablas de costos). Ante la duda, copiar el HTML de ahí.

- **Tablas:** en markdown. Las de costos llevan moneda local, USD, EUR y observaciones cortas (ver la guía de estilo).
- **Recuadros:** `> 💡 ...`, `> ⚠️ ...`, `> 🧡 *aviso de afiliados*`, `> 🎒 enlace a otro artículo`, `> 📩 ...`, con el significado de la guía de estilo.
- **Listas con ⭐:** categoría en negrita con ⭐ y después `[Nombre](url) — descripción`.
- **Imágenes** (webp en /img/diario/): `<div class="post-img-box img-completo img-centro"><img src="..." alt="Epígrafe"><span class="img-caption">Epígrafe con el nombre del lugar</span></div>`. El `alt` es el mismo texto que el epígrafe. El tamaño (`img-pequeño`, `img-mediano`, `img-completo`) no cambia cómo se ve: todas van centradas (ver "Fotos" en la guía). Dos verticales seguidas pueden ir en un bloque `post-img-par`.
- **Tarjetas de alojamiento y de trenes:** bloque HTML con estilos inline, borde `#006d77`, un ítem por línea con el nombre enlazado, una insignia de color y el botón "Ver alojamiento →" o "Ver tren →" a la derecha. Insignias: verde (#e6f4f1 / #006d77) solo para "Nos quedamos acá"; amarillo (#fef3c7 / #92400e), azul (#e0f2fe / #075985) y violeta (#ede9fe / #5b21b6) para el resto. Las de trenes se separan en "Ir a…" y "Volver", con insignias "Desde…" y "Hacia…".
- Los links a comercios se dejan como están: Stay22 los convierte y no se agregan IDs.

## Antes de entregar

- Voseo; tilde en "Qué", "Dónde" y "Cómo" de los títulos; ningún "por libre".
- Un solo tipo de cambio en todo el artículo, y las cuentas de monedas verificadas.
- Links internos solo a artículos publicados.
- En el borrador, lo dudoso va como [VERIFICAR] y los links de afiliado que faltan como [LINK FALTANTE]; en el .md final que va al PR no queda ninguno: lo que no se confirmó se saca o se dice como algo que no sabemos.
- Las formas verbales de Lore no se cambian: lo que haya que unificar se comenta.

## Entrega del borrador
- Artículo completo en voseo
- Título SEO, meta descripción y slug propuestos
- Lista de datos marcados como [VERIFICAR]
- Lugares sugeridos para enlaces de afiliados, cada uno con su alternativa local
- Sugerencias de fotos con epígrafe para cada sección
- Ideas de satélites nuevos que hayan surgido al escribir
- Filas del mapa del cluster que hay que actualizar (los datos del viaje mandan sobre el mapa)
