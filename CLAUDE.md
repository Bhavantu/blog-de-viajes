# Blogcito

Blog de viajes de Lore y Santi (blogcito.com). Turismo lento, guías prácticas y cultura.

## Documentos del proyecto
- @docs/guia-estilo-blogcito.md
- @docs/plantilla-articulo.md
- @docs/pendientes-blogcito.md

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
- Travelpayouts solo queda en el link de Airalo (tpx.lu). El script de emrldco.com se quitó de Layout.astro
- Amazon con tag blogcito09-20
- No agregar ni cambiar IDs de afiliado sin preguntar
- Mantener los links a comercios como están en el original
- Limpiar solo los links rotos o envueltos en otra URL (por ejemplo google.com/search)
- Avisar si aparece algún parámetro de afiliado de terceros
- Ignorar la línea de la guía de estilo que pide revisar el ID de afiliado en cada enlace, porque de eso se encarga Stay22

## Reglas de trabajo
- Hacer commit cuando corresponda (mensajes en español, cambios chicos y agrupados por tema, sin mezclar tareas). Nunca hacer push: lo hace Santi cuando se lo sugiera, y desde la terminal de VS Code, porque desde Claude Code no hay credenciales
- Usar una rama por tarea solo para retraducciones y cambios de código. Los cambios en docs/ pueden ir directo en main
- Si una decisión editorial cambia una regla, actualizar el archivo de docs/ correspondiente en el mismo cambio
- Mostrar el diff antes de cambios grandes
- Correr `npm run build` después de cambios en layouts o componentes
- Tareas acotadas, un artículo o un tema por vez
- No inventar datos, precios ni experiencias. Lo que no esté confirmado va como [VERIFICAR]
- Entregar el archivo completo, listo para reemplazar
- Al terminar un punto de la lista de pendientes, avisar a Santi y marcarlo en docs/pendientes-blogcito.md

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
- Cada recomendación de alojamiento dice si nos quedamos o no
- Guía completa en @docs/guia-estilo-blogcito.md
