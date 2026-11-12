---
description: Procesa las fotos de una carpeta de Drive y las inserta en el artículo (con OK en cada paso)
argument-hint: nombre-de-carpeta (slug del artículo o nombre del lugar)
---

Procesá las fotos de la carpeta **$ARGUMENTS** y proponé cómo insertarlas en el artículo. Seguí los pasos en orden y frená donde diga "esperá el OK". No hagas commit ni push: eso lo hace Santi.

Antes de empezar, leé docs/guia-estilo-blogcito.md y la sección "Imágenes de los posts" de CLAUDE.md, si ya existe. Si la sección no existe todavía, avisá que las reglas de ubicación y de ritmo no están definidas y trabajá solo con lo que dice este comando.

## 0. Traer las fotos

- Las fotos originales están en Google Drive, en la carpeta `fotos`, una subcarpeta por artículo. Nunca se modifican ni se borran.
- El remote de rclone `fotos:` apunta directo a la carpeta `fotos` de Drive (configurado en la compu de Santi, solo lectura, sin ver el resto de su Drive). Verificá que exista con `rclone listremotes`.
- Si existe, bajá solo las imágenes (los videos y los Live Photos no se usan) con:
  `rclone copy fotos:$ARGUMENTS ~/.cache/blog-fotos/$ARGUMENTS --ignore-case --include "*.{jpg,jpeg,png,webp}"`
  Si ya hay una copia local, rclone solo baja lo que falta.
- Si no existe el remote `fotos:`, o ya hay una carpeta local con ese nombre en `~/.cache/blog-fotos/$ARGUMENTS` (o en `FOTOS_ORIGEN`), usá esa. Si no hay ninguna, decile a Santi cómo traerla (ver docs: instalar rclone y crear el remote `fotos` en modo solo lectura) y frená.
- No imprimas ni copies el contenido de `~/.config/rclone/rclone.conf`: tiene el token de acceso.

## 1. Prueba

Corré `npm run fotos -- $ARGUMENTS --dry-run` y mostrale el reporte a Santi (fotos, nombres provisorios, tamaños, las que pasan de 400 KB, videos y formatos que no se convierten). El script compara cada foto con las ya procesadas (manifiestos en scripts/fotos-manifiestos/, en cualquier carpeta): las que ya se procesaron, las repetidas con otro nombre y las parecidas (reenviadas, achicadas o retocadas) se saltean y el reporte las lista aparte, con el archivo con el que coinciden. Mostráselas a Santi: si una parecida es una foto que de verdad quiere de nuevo, se procesa con `--forzar`. Las fotos con `-retocada` en el nombre aparecen en su propia sección (qué archivo de la web reemplazan, si cambian las medidas y qué posts las usan); las que no encuentran su original también se listan. Esperá el OK.

## 2. Procesar

Corré `npm run fotos -- $ARGUMENTS`. Verificá que los archivos generados existen en public/img/diario/ y que el script no avisó de metadatos.

## 3. Nombres descriptivos

Mirá cada foto generada y renombrala con `npm run fotos -- --renombrar <carpeta> <viejo.webp> <nuevo.webp>` (no con `mv`, así el manifiesto sigue al día) con un nombre descriptivo en minúsculas, con guiones, sin tildes y con el lugar adentro (por ejemplo `amed-jemeluk-bay-snorkel.webp`). Usá las pistas que haya: un `notas.txt` en la carpeta de origen o el nombre original de la foto. Si no estás seguro de qué lugar es, dejá el nombre provisorio y marcalo [VERIFICAR]. No inventes nombres de lugares ni de personas.

## 4. Epígrafe y alt

Para cada foto, proponé un epígrafe descriptivo que incluya el nombre del lugar, en español, con voseo si le habla al lector. El alt es el mismo texto del epígrafe. Si no reconocés con seguridad el lugar o lo que se ve, escribí [VERIFICAR] en vez de adivinar.

## 5. Ubicación

Proponé (no decidas) en qué sección del artículo va cada foto, siguiendo las reglas de ubicación de CLAUDE.md. Mostrá una tabla con: foto, epígrafe, sección, tamaño (`pequeño`, `mediano` o `completo`), alineación y motivo. Las fotos que no encajan en ninguna sección quedan listadas aparte, sin forzarlas. Si el artículo ya tiene fotos, contá las nuevas junto con las existentes. Esperá el OK.

## 6. Insertar

Insertá los bloques en el post en español (src/pages/diario/<slug>.md) con el mismo formato que usa el blog:

```html
<div class="post-img-box img-completo img-centro"><img src="/img/diario/NOMBRE.webp" alt="EPÍGRAFE" width="ANCHO" height="ALTO" loading="lazy"><span class="img-caption">EPÍGRAFE</span></div>
```

- `width` y `height` son los píxeles que informó el script (el tamaño real del archivo generado).
- Todas las fotos van centradas (`img-centro`). Una vertical sola va en `img-mediano`; una horizontal, en `img-completo`.
- Dos verticales seguidas pueden ir lado a lado, dentro de un mismo bloque sin líneas en blanco:
  `<div class="post-img-par">` + los dos `<div class="post-img-box img-completo img-centro">…</div>` + `</div>`. Nunca dos horizontales lado a lado: van una arriba de la otra.
- El alt no lleva etiquetas HTML ni comillas dobles (usar `&quot;` o reescribir).
- Todas las imágenes del cuerpo llevan `loading="lazy"`: el hero del post es un fondo CSS, no una imagen del cuerpo.
- Si el artículo tiene portada (`main_image` en el frontmatter) y todavía no está puesta, proponé cuál sería y no la cambies sin OK.

Si existe la traducción en src/pages/en/journal/ (buscá `archivo_original` con el nombre del post en español), insertá los mismos bloques en el mismo lugar, con las mismas rutas, `width`, `height` y `loading`, y con el epígrafe y el alt traducidos al inglés. Si la traducción todavía no existe, no la crees: anotalo.

## 7. Control del post

Mostrá en pocas líneas, para este post: cuántas fotos tiene ahora, palabras por foto, el tramo más largo de texto sin imagen (en palabras), el peso total de sus imágenes y si alguna regla de ubicación o de ritmo de CLAUDE.md quedó sin cumplir. Es una verificación de este post, no una medición del sitio.

## 8. Build

Corré `npm run build` y avisá si falla.

## 9. Cierre

Dejá un resumen con los archivos creados y modificados, lo que quedó como [VERIFICAR] y las fotos que no se usaron. No hagas commit ni push; cuando Santi commitee, el manifiesto (scripts/fotos-manifiestos/<carpeta>.json) va en el mismo commit que las imágenes.

## Dónde queda cada cosa

- **Originales:** Google Drive, `fotos/<carpeta>/`, y la copia local descartable en `~/.cache/blog-fotos/<carpeta>/`. No se modifican ni se commitean.
- **Imágenes de la web:** solo las que se usan, en public/img/diario/. Todo lo que está ahí se publica en el sitio, esté o no en un post.
- **Fotos generadas que no se usan:** se borran de public/img/diario/ (`rm`). El manifiesto las recuerda y el script no las regenera solo; el original sigue en Drive. Para usarlas más adelante: `npm run fotos -- <carpeta> --forzar`.
- **Fotos para retocar:** retocar siempre desde el original de Drive, no desde el .webp. Subir la versión retocada a la misma carpeta de Drive con el nombre del original más `-retocada` (por ejemplo `IMG_8111-retocada.jpg` junto a `IMG_8111.JPEG`). Al correr `/fotos <carpeta>`, el script reemplaza el archivo de la web que salió de ese original, con el mismo nombre (el post no cambia), actualiza `width` y `height` en los posts si cambiaron las medidas y guarda la versión anterior en `~/.cache/blog-fotos/.reemplazadas/`. No hace falta avisar foto por foto: se procesan todas las retocadas de una vez. Para retocar de nuevo, se sube otra vez con el mismo nombre.
