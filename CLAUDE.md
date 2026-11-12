# Blogcito

Blog de viajes de Lore y Santi (blogcito.com). Turismo lento, guías prácticas y cultura.

## Documentos del proyecto
- @docs/guia-estilo-blogcito.md
- @docs/plantilla-articulo.md
- @docs/pendientes-blogcito.md
- docs/mapa-cluster-china.md (mapa del cluster de China: pilar, satélites, slugs y estado de cada artículo)
- docs/datos-viaje-china.md (hoteles, trenes y fechas del viaje a China, con lo que no cierra entre la planilla y lo publicado)
- docs/como-trabajamos.md (dónde vive cada cosa entre el repo, Drive y los proyectos de Lore, y el flujo de un artículo de punta a punta)
- docs/revision-borradores-lore.md (pendientes de cada borrador y errores que encontramos en revisión, para tachar y revisar antes de cada PR)

Estos tres archivos son la fuente de verdad. Si algo de este archivo choca con la guía de estilo, vale la guía de estilo, salvo en afiliados, donde vale lo que dice este archivo.

## Stack
- Astro 6 con Tailwind 4, deploy en Netlify
- CMS Decap en public/admin (git-gateway, editorial workflow)
- Contenido en Markdown
  - Español en src/pages/diario/
  - Inglés en src/pages/en/journal/
  - Los posts en inglés deben llevar `archivo_original` con el nombre del archivo en español
- Layouts en src/layouts (Layout.astro, BlogPostLayout.astro)
- Textos de interfaz en src/i18n/ui.js
- Redirects en public/_redirects

## Afiliados
- Stay22 convierte automáticamente los links salientes (script letmeallez en BlogPostLayout)
- Airalo se cobra por Impact: el link es siempre https://airalo.pxf.io/c/7468102/1268485/15608?partnerpropertyid=8600748 (en el layout y en los artículos). Travelpayouts ya no se usa. El script de emrldco.com se quitó de Layout.astro
- Amazon con tag blogcito09-20
- Si falta el link propio de un comercio que Stay22 no convierte (Airalo, Amazon, seguro de viaje, VPN), va [LINK FALTANTE: nombre | programa]. Para alojamientos, tours y trenes se usa el link normal del comercio. [VERIFICAR] es para datos, no para links
- No agregar ni cambiar IDs de afiliado sin preguntar
- Mantener los links a comercios como están en el original
- Limpiar solo los links rotos o envueltos en otra URL (por ejemplo google.com/search)
- Avisar si aparece algún parámetro de afiliado de terceros
- Ignorar la línea de la guía de estilo que pide revisar el ID de afiliado en cada enlace, porque de eso se encarga Stay22

## Reglas de trabajo
- Hacer commit cuando corresponda (mensajes en español, cambios chicos y agrupados por tema, sin mezclar tareas). Para el push, ver "Ramas, borradores y deploy previews"
- Usar una rama por tarea solo para retraducciones y cambios de código. Los cambios en docs/ pueden ir directo en main
- Si una decisión editorial cambia una regla, actualizar el archivo de docs/ correspondiente en el mismo cambio
- Mostrar el diff antes de cambios grandes
- Correr `npm run build` después de cambios en layouts o componentes
- Antes de commitear o pushear, si hay imágenes en public/img que no sean .webp (jpg, png, heic), convertirlas con `npm run optimizar`. Nunca commitear HEIC
- Tareas acotadas, un artículo o un tema por vez
- No inventar datos, precios ni experiencias. Lo que no esté confirmado va como [VERIFICAR]
- Entregar el archivo completo, listo para reemplazar
- Al terminar un punto de la lista de pendientes, avisar a Santi y marcarlo en docs/pendientes-blogcito.md

## Ramas, borradores y deploy previews
- Antes de cualquier push, chequear el usuario con `git config user.name` y `gh auth status`, y decir con cuál se va a pushear
- Si el usuario es Bhavantu (Santi), se puede hacer push a main, pero solo cuando Santi lo pida explícitamente en ese chat
- Con cualquier otro usuario (por ejemplo Lore), nunca push a main ni merge a main. Trabajar en una rama nueva y abrir un pull request en modo borrador para ver la deploy preview
- Para cualquier artículo nuevo, reescritura o traducción que se quiera ver antes de publicar, trabajar en una rama nueva con nombre descriptivo (por ejemplo `borrador-pekin-que-hacer` o `traduccion-amed-en`)
- De esas ramas se hace push solo de la rama y se abre un pull request en modo borrador (draft) contra main. Netlify publica la deploy preview y deja el link en el PR
- Cada push nuevo a la rama actualiza la preview. Cuando el borrador está listo, pasar el PR a "Ready for review" y avisar a Santi
- Nunca copiar links de deploy preview (`deploy-preview-N--...netlify.app`) dentro de un artículo ni en ningún archivo del sitio
- Si la rama toca un artículo existente, seguir las mismas reglas de la guía de estilo y de traducción que el resto del repo
- Antes de trabajar en un borrador, leer docs/revision-borradores-lore.md: tachar los pendientes de ese artículo a medida que se resuelven y, antes de abrir o actualizar el PR, revisar el borrador contra la lista de errores que encontramos

## Reglas para traducciones al inglés
- Traducir desde el original en español, nunca desde otra traducción
- Mantener el frontmatter igual, salvo agregar `archivo_original` si falta
- Traducir solo title y description
- No tocar bloques HTML de imágenes, iframes ni calculadoras, salvo los captions
- No modificar ninguna URL externa
- Links internos a la versión en inglés si existe, si no al original en español
- Números, precios y distancias idénticos al original
- Avisar si el original en español tiene errores, con una lista al final de la entrega
- Marcar con noindex las traducciones viejas con errores graves hasta retraducirlas

## Estilo de contenido
- Voseo rioplatense siempre, nunca formas de tú
- Primera persona plural, la experiencia propia va adelante
- Si nos quedamos en un alojamiento recomendado, se dice y se cuenta; si no nos quedamos, no hace falta aclararlo
- Guía completa en @docs/guia-estilo-blogcito.md
