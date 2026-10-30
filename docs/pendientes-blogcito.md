# Pendientes de mejora de Blogcito

Lista de problemas detectados en la revisión del sitio y del repo (octubre 2026). Ir tachando a medida que se resuelven y agregar los nuevos al final de cada sección.

## Para retomar (estado al 30/10/2026)

Commits hechos (sin push):
- `limpiar-links-afiliados` (eded8f0): limpieza de `utm_source=gemini` y `TU_ID_AFILIADO` en los originales en español. **Ya mergeada en `main`** (3dcbd43).
- `main`: CLAUDE.md y docs/.
- `retraducciones-en` (sin mergear): correcciones a los originales de Ubud y working holiday (b526abe), las retraducciones en inglés (87a8722, 2e37c72), y lo de Da Nang en 3 días (original corregido y retraducción, 30/10).

Copia de seguridad del estado previo a esos commits: tag `backup-antes-de-commits-2026-10-30` y carpeta `backup-stellar-series-2026-10-30/` (fuera del repo, con un .tar.gz y un .patch).

Pendiente:
1. Mergear `retraducciones-en` a `main` (incluye Da Nang, ya auditada). `limpiar-links-afiliados` ya está mergeada.
2. Auditar contra el original las 7 retraducciones de Prioridad 1 (todas quedan abiertas hasta entonces). Da Nang en 3 días ya se auditó (ver Prioridad 2).
3. Limpiar el resto del relevamiento de afiliados (Prioridad 5) solo con OK de Santi sobre cada grupo.

## Prioridad 1. Traducciones al inglés con errores graves

Retraducir desde el original en español, no parchear. Mientras tanto, marcarlos con noindex.

- [ ] what-to-do-amed-bali-real-guide-budget (original que-hacer-amed-que-ver-guia-presupuesto). "Lanterns" por velas, "Sweet Occupation", "Pure Lempuyang", "Marmaris", Agung en 10,342 meters, "brought some as a gift", link de snorkel perdido
  - Estado (29/10): retraducida en el commit 28eb616, pendiente de revisión contra el original
- [ ] history-of-coromandel-new-zealand (original historia-de-coromandel). Tres párrafos inventados sobre la isla de El Hierro
  - Estado (29/10): retraducida en el commit 28eb616, pendiente de revisión contra el original
- [ ] what-to-do-christchurch-2-days (original que-hacer-christchurch-2-dias). Restaurantes inventados, The Austin Club descrito como club de Texas, párrafos en español, "Tomorrow" por mañana
  - Nota: el original en español ya no tiene el placeholder `TU_ID_AFILIADO` (se limpió en la rama limpiar-links-afiliados). La retraducción tiene que copiar las URLs ya limpias del original. La traducción actual todavía lo tiene en 5 links, no parchearla
  - Estado (30/10): retraducida, pendiente de revisión contra el original. Las 7 URLs externas ya coinciden con las del original limpio (sin `TU_ID_AFILIADO`). Commiteado en `retraducciones-en`.
  - Auditada el 30/10 contra el original de `main` (ya limpio): las 5 URLs de comercios y los bloques HTML coinciden, números y estructura iguales, sin Tomorrow ni restaurantes inventados, The Austin Club descrito como speakeasy. Queda marcarla con [x] al mergear la rama
- [ ] roadtrip-new-zealand-west-coast-12-days (original ruta-nueva-zelanda-isla-sur-12-dias). Itinerario inventado al inicio, distancias cambiadas (165 km, 132 miles), Fat Eddie's como músico, link roto en ficha técnica
  - Estado (29/10): retraducida, sin commitear, pendiente de revisión contra el original. Chequeo preliminar: el `description` perdió "campervan".
  - Auditada el 30/10 contra el original: URLs, números (distancias en km, 1.200 → 1,200), bloques HTML y encabezados coinciden, el `description` ya tiene "campervan", la frase de Fat Eddie's sigue literal al original ("músico local de Fat Eddie's"), pero Fat Eddie's es un pub con música en vivo (dato de Santi), así que la frase es ambigua y [VERIFICAR] cómo quieren contarlo; las URLs de la ficha técnica son idénticas a las del original (no se probó que los links carguen). Se corrigió "goldenest" en la traducción. Queda marcarla con [x] al mergear la rama
- [ ] arthurs-pass-kura-tawhiti-national-canterbury-park-new-zealand-south-island (original parque-nacional-arthur-pass-nueva-zelanda-isla-sur). "Here is the translation", cuatro párrafos inventados, bullets en español, "Haywood Forest"
  - Estado (29/10): retraducida, sin commitear, pendiente de revisión contra el original.
  - Auditada el 30/10 contra el original: URLs, números (1.200 → 1,200), bloques HTML, encabezados y bullets coinciden, sin "Here is the translation", sin "Haywood Forest" ni párrafos inventados, frontmatter con `archivo_original`. Queda marcarla con [x] al mergear la rama
- [ ] christchurch-working-holiday-jobs-costs (original vivir-con-working-holiday-visa-christchurch). Restos del modelo, "2022" en la descripción, "within an hour" por media hora
  - Estado (29/10): retraducida, sin commitear, pendiente de revisión contra el original
- [ ] what-to-do-ubud-bali-tips-and-guide (original que-hacer-ubud-bali-que-ver-zonas-consejos-guia). Tour de 9 horas inventado, URLs de GetYourGuide traducidas (rotas), precio del guía en USD 15
  - Estado (29/10): retraducida, sin commitear, pendiente de revisión contra el original. Los links internos ya apuntan a las versiones en inglés

## Prioridad 2. Traducciones con errores menores

- [ ] bali-culture-traditions-and-secrets. Descripción con "#Discovering", cambio de "I" a "she", glosario en español, links inventados
- [ ] what-is-aotearoa-maori-culture-new-zealand. Título duplicado
- [ ] where-to-live-south-island-new-zealand. "Lack of travelers" por densidad, link al panel del CMS
- [ ] new-zealand-route-north-island. Traducción literal en partes
- [ ] digital-nomad-da-nang-cost-of-living. Números del presupuesto distintos al original
- [ ] travel-to-bali. Links a deploy-preview-95 en la tabla de zonas
- [x] what-to-do-da-nang-hoi-an-3-days-itinerary (original que-hacer-da-nang-vietnam-itinerario-3-dias). Estado (30/10): retraducida desde el original ya corregido, commiteada en `retraducciones-en` y **auditada contra el original** (URLs, números, bloques HTML y frontmatter coinciden; se tradujo el aviso 🧡 que había quedado en español y se sacó el link repetido del taller de farolillos). Falta mergear la rama. Ya no tiene el dato inventado del Mercado Con (cerdo y camarón), el `tag` vuelve a `guia de viaje` (como las otras 9 guías) y los bloques HTML, `alt` y URLs son los del original. Decisión sobre las tarjetas de hoteles: se tradujo el texto visible (etiquetas y descripciones)
- [ ] Etiquetas (`tag`) y `pais` mezclados entre español e inglés en posts EN. **No unificar ni tocar la lógica de filtrado:** las páginas de categoría y de destino aceptan ambos idiomas y el listado por país y categoría funciona bien (verificado el 30/10). Solo corregir casos puntuales, con captura de cómo se ve en pantalla:
  - Etiqueta en crudo: si el valor no tiene clave en `ui.js` (por ejemplo `local life`, `context & culture`) el texto no pasa por la traducción. En las tarjetas de categoría **no se nota**: la captura del 30/10 de /en/categories/travel-guide/ muestra "TRAVEL GUIDE" igual que las demás, en mayúsculas y con el mismo estilo. Sin verificar todavía: el color de la etiqueta en el buscador (el CSS solo tiene reglas para los valores en español) y la etiqueta del encabezado dentro del post
  - `pais: New Zealand` en what-is-aotearoa-maori-culture-new-zealand: `PostsRecomendados` compara `pais` con === estricto y el resto de los posts EN dice `Nueva Zelanda`, así que ese post no recomienda ni es recomendado. El de christchurch-working-holiday-jobs-costs ya quedó bien en `retraducciones-en`
  - `tag` sin categoría: `working holiday` y `bitacora` (ver Prioridad 5)

## Prioridad 3. Errores en artículos en español

- [ ] que-hacer-amed-que-ver-guia-presupuesto. Bajo Monte Agung dice que el Batur es el punto más alto, frase cortada "Subirlo implica un desafío mayor ya que", encabezado duplicado "Virgin BeachVirgin beach", consejo de cajeros confuso
- [ ] nomada-digital-vietnam-da-nang-costo-de-vida-alquiler. El texto dice USD 637,96 y la tabla suma 693,75
- [ ] Unificar terremoto de Christchurch (2010 o 2011 según el artículo)
- [ ] donde-vivir-isla-sur-nueva-zelanda. "Chrischurch" mal escrito, link al panel del CMS
- [ ] viajar-a-bali. Imagen vacía, fila basura en la tabla de zonas, texto duplicado "Dónde quedarse en Nusa Pénida", links a deploy-preview-95
- [ ] que-hacer-ubud-bali-que-ver-zonas-consejos-guia. Verificado el 29/10 en el archivo: la caja de imagen y el link del taller de cocina envuelto en google.com/search ya no están mal (las 10 cajas de imagen están cerradas y no hay links a google.com). Queda por unificar el total del ritual de purificación: los componentes (entrada 75.000 + guía 150.000 + sarong 15.000 + casillero 10.000-15.000 + ofrendas 10.000-20.000) suman 260.000-275.000 IDR, pero el texto y la tabla dicen 200.000-250.000 IDR, y el texto dice "13-16 USD" contra 11,14-13,93 USD en la tabla. La traducción al inglés quedó con los valores del original
- [ ] bali-rituales-cultura-tradiciones-secretos. "la secretos" en el título
- [ ] triangulo-sagrado-da-nang-vietnam-pagodas-linh-ung. Párrafo de física cuántica, voseo mezclado con tú en etiqueta
- [x] ruta-nueva-zelanda-isla-sur-12-dias. Residuo del modelo `\[cite: 1]` junto a "Fat Eddie's" (corregido en `retraducciones-en`)
- [ ] que-hacer-christchurch-2-dias. Caption con "Chrischruch" mal escrito
- [x] que-hacer-da-nang-vietnam-itinerario-3-dias. Corregido el 30/10 en `retraducciones-en`: tilde de "Montañas de Mármol", "privilegeda", "PROXIMAMENTE", "farolitos" y "farolillos" mezclados, lista de Ba Na Hills, formato de horas, caption vacío del Dragon Bridge y el horario del espectáculo (viernes, sábado y domingo a las 21:00, hasta las 21:30; llegar 15 minutos antes). También resuelto en `retraducciones-en` (ES y EN): se sacó el segundo link repetido del taller de farolillos (la URL de GetYourGuide no se tocó), se quitó el span vacío del icono de "Te ahorramos la búsqueda", y las temporadas de clima se ajustaron a lo que dicen las guías de turismo (seca de enero a agosto, con la mejor ventana de febrero a mayo; lluvias de septiembre a diciembre) con una nota de que varían, más la experiencia propia de agosto y septiembre
- [ ] Voseo mezclado con tú en varios artículos

## Prioridad 4. Links internos rotos

Apuntar directo al slug actual en vez de pasar por redirects.

- [ ] /diario/2026-07-20-ubud-bali-que-hacer/
- [ ] /diario/2026-07-22-el-alma-de-bali-rituales-familia-y-comunidad/
- [ ] /diario/el-alma-de-bali/
- [ ] /diario/el-alma-de-bali-cultura-tradiciones-y-la-secretos-sobre-la-isla/
- [ ] /diario/viajar-a-bali-requisitos-transporte-y-zonas-para-quedarse/
- [ ] /diario/que-hacer-en-amed-bali-guia-real-de-slow-travel/
- [ ] /diario/nomada-digital-vietnam-costo-de-vida-da-nang/
- [ ] Links con fecha vieja que funcionan por redirect (Amed, Coromandel, Arthur's Pass, Aotearoa, etc.)
- [ ] En que-hacer-ubud-bali-que-ver-zonas-consejos-guia: /diario/2026-06-23-el-alma-de-bali-rituales-la-familia-y-el-secreto-de-la-felicidad-balinesa/, /diario/2026-06-18-bali-bby-1/ y /diario/2026-07-18-amed-bali-guía-real-de-slow-travel/. Los tres funcionan hoy por redirect (verificado el 29/10 en public/_redirects: el primero lo cubre el comodín `/diario/2026-06-23-el-alma-de-bali-rituales*`). Apuntarlos directo al slug actual. La traducción al inglés ya apunta a los slugs actuales

## Prioridad 5. Técnico y SEO

- [ ] Agregar soporte para noindex por frontmatter en Layout.astro
- [ ] Alt de imágenes. El componente del CMS fija alt="Imagen de bitácora", usar el caption como alt
- [ ] Buscador duplicado en Header.astro y Layout.astro con los mismos IDs, y import.meta.glob de todos los posts en un script de cliente
- [ ] JSON-LD SearchAction apunta a /?search= en vez de /search?q=
- [ ] Agregar hreflang entre versiones ES y EN, y archivo_original en los posts en inglés nuevos para el switch de idioma
- [ ] Agregar og:image y schema de Article (autor, fecha de modificación)
- [ ] Cargar Netlify Identity solo en /admin
- [ ] Revisar scripts de afiliados. **Parcialmente resuelto:** el script de emrldco.com ya se quitó de Layout.astro. Hoy Stay22 (letmeallez en BlogPostLayout) maneja los links salientes y Travelpayouts queda solo en el link de Airalo (tpx.lu). Falta dejar asentado qué comercio maneja cada uno (Booking, GetYourGuide, Amazon con tag blogcito09-20, Airalo) y limpiar lo que quedó en los posts (relevado el 29/10/2026):
  - Link de Airalo con parámetros de tracking de Travelpayouts (`trs`, `journey_id`, `trace_id`, `page_url` apuntando a otro artículo): nomada-digital-vietnam-da-nang-costo-de-vida-alquiler y digital-nomad-da-nang-cost-of-living
  - Link de Airalo con parámetros de Impact (`irclickid`, `irgwc`, `utm_source=impact`): los mismos dos artículos
  - GetYourGuide con `partner_id=ZM6TN20` y `cmp=...`: viajar-a-bali-opinion-experiencia-real (4 links) e is-bali-worth-visiting (4)
  - GetYourGuide y Booking con el placeholder `TU_ID_AFILIADO`: **resuelto en que-hacer-christchurch-2-dias** (29/10, 5 links). En what-to-do-christchurch-2-days también quedó resuelto el 30/10 al corregir las URLs de la retraducción (commiteado en `retraducciones-en`)
  - Booking con `aid=` de distintos IDs (2440493, 318615, 1607597, 1610688, 2427663, 356980, 306396) y `label=` de campañas: viajar-a-bali y travel-to-bali (19 cada uno), ruta-nueva-zelanda-isla-sur-12-dias y roadtrip-new-zealand-west-coast-12-days (11), vivir-con-working-holiday-visa-christchurch y christchurch-working-holiday-jobs-costs (4), que-hacer-ubud-bali-que-ver-zonas-consejos-guia y what-to-do-ubud-bali-tips-and-guide (7), what-to-see-nusa-penida (2), where-to-stay-nusa-penida-what-to-do (1), nomada-digital-vietnam-da-nang-costo-de-vida-alquiler (1). [VERIFICAR] cuáles de esos IDs son de Blogcito
  - Booking con `utm_source=gemini`: **resuelto** el 29/10 en que-hacer-da-nang-vietnam-itinerario-3-dias y what-to-do-da-nang-hoi-an-3-days-itinerary (21 links cada uno)
  - Amazon con `tag=blogcito09-20` (propio, correcto): que-hacer-amed-que-ver-guia-presupuesto y what-to-do-amed-bali-real-guide-budget
- [ ] Confirmar con Stay22 si reemplaza parámetros de afiliado de terceros en URLs de Booking
- [x] Sacar los placeholders `TU_ID_AFILIADO` de los links de GetYourGuide y Booking de que-hacer-christchurch-2-dias y de la traducción what-to-do-christchurch-2-days (5 links en cada una). Hecho el 29/10 en el original y el 30/10 en la traducción; falta mergear las ramas `limpiar-links-afiliados` y `retraducciones-en`. Stay22 convierte los links, no hace falta ningún ID
- [ ] Borrar PostsRecomendados duplicado en BlogPostLayout (props equivocados)
- [ ] Home del repo con 6 destinos y links a /destinos y /categorias que no existen en el repo. Verificar contra el sitio publicado
- [ ] Tags sin categoría en taxonomies.js: "working holiday" (buy-campervan-car-new-zealand-backpackers-guide, sin traducción ni estilo) y "bitacora" (new-zealand-route-north-island). Esos posts no salen en ninguna página de categoría
- [ ] Meta descripciones de más de 160 caracteres

## Prioridad 6. Contenido y estrategia

- [ ] Diferenciar donde-quedarse-nusa-penida de que-ver-en-nusa-penida-guia (contenido duplicado)
- [ ] Adaptar guías viejas a la guía de estilo (experiencia al frente, veredicto, bloque "Si tenés poco tiempo", FAQ con H3)
- [ ] Dividir artículos demasiado largos en satélites (Amed como primer candidato)
- [ ] Convertir la calculadora de Amed en lead magnet con captura de email (hoy promete envío por mail y no lo hace)
- [ ] Agregar firma de autor y fecha de actualización en los posts
- [ ] Sumar seguro de viaje en las guías de destino
- [ ] Reemplazar traducir.mjs o agregarle enmascarado de URLs y HTML, y validación de números al final
