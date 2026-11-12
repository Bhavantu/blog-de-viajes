# Revisión de borradores de Lore

Este archivo es para Lore y para el Claude con el que trabaja. Tiene dos partes:

1. **Pendientes por artículo.** Lo que falta en cada borrador. Se tacha a medida que se resuelve.
2. **Errores que encontramos.** Lo que Santi tuvo que corregir en borradores anteriores. Sirve como lista de control para que los próximos borradores lleguen ya corregidos.

## Instrucciones para Claude

- Leé este archivo antes de trabajar en un borrador, junto con `CLAUDE.md`, `docs/guia-estilo-blogcito.md` y `docs/plantilla-articulo.md`.
- Trabajá los pendientes del artículo que toque. Cuando resuelvas uno, marcalo con `[x]` y agregá la fecha y cómo se resolvió en una línea (por ejemplo: `[x] ... Resuelto el 12/11: Lore confirmó que...`).
- Lo que solo Lore sabe (qué vivimos, qué pagamos, dónde comimos) se le pregunta a ella. Si no se acuerda, no se inventa: se saca del texto o queda como [VERIFICAR].
- Antes de abrir o actualizar el pull request, recorré la parte 2 completa sobre el borrador y corregí lo que aparezca.
- Si encontrás un error nuevo que se repite, sumalo al final de la parte 2.
- Ramas y PR: según la sección "Ramas, borradores y deploy previews" de `CLAUDE.md`. Con la cuenta de Lore nunca se hace push ni merge a main: se trabaja en la rama del borrador, se pushea la rama y se usa el PR en borrador.

---

## Parte 1. Pendientes por artículo

### Furongzhen (`src/pages/diario/furongzhen-que-ver.md`, rama `borrador/furongzhen-que-ver`, PR #126)

Ya corregido por Santi el 10/11/2026 (no hace falta tocarlo): voseo ("podés", "te quedás"), una o dos noches (nos quedamos dos, con una bien planificada alcanza), Jianghu dentro del recinto, entrada a 98 CNY (USD 14,98), precios con yuanes primero, ropa tradicional miao, la foto de Xi Jinping, los 818 años (pasó a "más de 800 años, hasta 1729"), sede de los tusi y traslado a Laosicheng en 1135, hogares reemplazados por el censo de 2010, y los otros tres hoteles con "No nos quedamos".

**Fotos**
- [x] Sumar fotos propias con epígrafe que incluya el nombre del lugar, en cada sección, y la portada (`main_image`). Resuelto el 12/11 por Santi con `/fotos`: 18 fotos en el cuerpo (tres pares de verticales) y portada de día con la cascada.
- [x] En "Nuestra experiencia" dice "sacamos fotos en varios de los puntos iluminados que compartiré a continuación". Resuelto el 12/11: justo después va el par de fotos de Lore con el traje miao (en el puesto y de noche en el puente Tuwang).

**Datos para confirmar con Lore (si no se confirman, se sacan)**
- [x] Que adolescentes y personas mayores pagan menos la entrada. Resuelto el 11/11: Lore lo confirmó (además una guía de viajes lo indica: 54 CNY para 14 a 18 y 60 a 65 años sobre un adulto de 108 CNY); se deja como está. Aparece en la tabla de datos, en la tabla de costos y en la pregunta frecuente de la entrada.
- [x] Horario del recinto, de 8:00 a 24:00. Resuelto el 11/11: Lore confirmó que es de 8:00 a 24:00 (es lo que vieron ellos); se deja el texto. La ficha de Klook dice de 7:30 a 23:59.
- [x] "En verano se enciende antes" (pregunta frecuente de la cascada). Resuelto el 11/11: Lore pidió sacarlo; la FAQ quedó "Hacia las 19:00 en octubre. Confirmalo en la entrada el día que vayas".
- [x] "La cascada va más fuerte de junio a septiembre" (pregunta frecuente de la mejor época). La tabla de datos solo dice que baja de diciembre a febrero. Resuelto el 11/11: Lore pidió sacarlo (una guía de viajes incluso dice que julio y agosto traen crecidas con agua turbia); la FAQ quedó solo con "baja mucho entre diciembre y febrero".
- [x] "Hay más de diez salidas por día" del tren desde Zhangjiajie. Resuelto el 11/11: confirmado en la guía de transporte de China Discovery (más de 10 trenes por día entre Zhangjiajie West y Furongzhen); se deja el texto.
- [x] El taxi de la estación al pueblo a 15-25 CNY. Resuelto el 11/11: no lo tomaron. Se cambió por el dato de la guía de transporte de Trip.com (unos 20 CNY, USD 3, EUR 2,6) diciendo que no lo tomaron y que les pasaron a buscar.
- [x] Arroz con verduras (16 CNY) y arroz con pollo (20 CNY) de la tabla de costos: dónde los comimos. Resuelto el 11/11: Lore confirmó el arroz con verduras; lo otro eran fideos con carne (20 CNY), en un restaurante con vista al río, sin nombre (no es relevante). La fila pasó a "Fideos con carne". Si fue en un lugar con nombre, sumarlo en "Qué comer".
- [x] Llegada a Jianghu (resuelto el 11/11: Lore confirmó que el auto los llevó primero a la entrada del recinto, donde escanearon QR y pasaportes, y después los dejó en la calle del hotel; ahora los dos textos coinciden): en "Nuestra experiencia" el auto nos lleva hasta la entrada del recinto, donde escanean el QR, y en "Dónde quedarse" el auto nos deja en la calle del hotel. Contar cómo fue en un solo lugar y que el otro coincida.
- [x] Jianghu: cuánto pagamos por noche. Resuelto el 11/11: Lore confirmó USD 18 por noche; el texto pasó de "desde unos 120 CNY" a "pagamos unos 120 CNY (USD 18, EUR 16) por noche".
- [x] Cambio de nombre de Wangcun a Furongzhen (resuelto el 11/11: no hay fuente firme, dos medios chinos dicen 2007 y páginas de Hunan dicen 1997; se cambió por "años después" y se sacó el [VERIFICAR]): el texto dice 2007, pero dos páginas del gobierno de Hunan dicen 1997. Quedó marcado [VERIFICAR]. Si no se encuentra una fuente firme, cambiar por "años después" y sacar el año.

**Estructura (ver `docs/plantilla-articulo.md`)**
- [x] Índice "En este artículo". Resuelto el 11/11: no hace falta tocar nada, BlogPostLayout genera solo el índice a partir de los H2 y H3.
- [x] Sección "Qué saltearíamos". Resuelto el 11/11: Lore pidió sacar esa idea; se eliminó "no nos saltearíamos nada" de la apertura y de "Nuestra experiencia", y no hay sección de "Qué saltearíamos".
- [x] Sección "Lo que nos gustó, lo que no y ¿vale la pena?" (resuelto el 11/11: se agregó antes de las preguntas frecuentes; lo que nos costó es el recinto laberíntico y leer el mapa, con el Palacio Tusi como ejemplo), con algo que no nos gustó o nos costó (la gente a la tarde, las escaleras con valija, lo que sea).
- [ ] Seguro de viaje en "Antes de ir a Furongzhen". Parcial el 11/11: se sumó la línea "contratalo antes de salir", sin link porque todavía no hay seguro de afiliado; cuando haya, agregar el URL directo en esa línea.
- [ ] Recuadro 🎒 del principio: enlazar a la guía pilar de China cuando esté publicada (ver `docs/mapa-cluster-china.md`).
- [x] Bloque "Si tenés poco tiempo" (resuelto el 11/11: quedaron tres, Presupuesto = Jianghu, Confort = Huayangnianhua Inn y Con vista a la cascada = Tuwang Palace; Furong Town and Slow Yueshe queda solo en "Dónde quedarse", por estar fuera del recinto): la guía pide tres alojamientos (económico, medio, alto) con estrellas. Hoy hay cuatro en dos grupos.
- [ ] "Más guías de China": sumar los satélites que se vayan publicando.

**Redacción**
- [x] Primer párrafo de "Un pueblo colgado de una cascada": "etnia Tujia" se repite dos veces en la misma oración. Resuelto el 11/11: la primera mención pasó a "casas tujia".
- [x] Frases largas sin puntos ni comas, para partirlas (resuelto el 11/11: se agregaron puntos y comas, sin cambiar las palabras):
  - "Como nos quedábamos dos noches el primer día aprovechamos para caminar con calma, conocer y probar el famoso tofu de arroz, "mi doufu" fuimos al local más icónico…"
  - "la pasarela es divertida pasamos por detrás varias veces…"
  - "acá vimos "El llanto de la novia" la previa de una boda tujia alrededor de las 14:30" (le falta el punto final).
- [x] La entrada se explica cinco veces (intro, resumen rápido, tabla de datos, después de los trenes y FAQ). Dejar el detalle en la tabla y en un solo párrafo, y en el resto solo el precio. Resuelto el 11/11: la intro ya no repite el precio, el resumen rápido deja solo el precio, y el párrafo posterior a los trenes deja solo el link; el detalle queda en la tabla y la FAQ.

**Después del borrador**
- [x] `docs/mapa-cluster-china.md` (resuelto el 11/11 para la fila de Furongzhen y el gancho de Kunming; quedan otras filas con "por libre" de otros artículos): el slug queda `furongzhen-que-ver` (no `furongzhen-por-libre`) y el alojamiento es Jianghu (no Wangxiansheng Homestay).
- [x] Kunming (resuelto el 11/11, Lore confirmó): se agregó la anécdota del disfraz en la sección del Pueblo de las Etnias, con link a `/diario/furongzhen-que-ver/`; sale publicada junto con esta guía. Texto original del pendiente: en la sección del Pueblo de las Etnias se puede sumar que Lore quería disfrazarse y no lo hizo, y que en Furongzhen se animó con la ropa miao, con link a esta guía cuando se publique. Lo confirma Lore.
- [ ] Traducción al inglés, cuando el español quede cerrado.
- [ ] Pasar el PR #126 a "Ready for review" y avisar a Santi.

### Amed (`src/pages/diario/que-hacer-amed-que-ver-guia-presupuesto.md` y su traducción `src/pages/en/journal/what-to-do-amed-bali-real-guide-budget.md`)

Es el post con más chances de generar ingresos pronto: en Search Console está en posición 9 a 10 para "qué hacer en Amed" y "qué ver en Amed". Revisión de Santi y Claude del 12/11/2026. Todo lo que se cambie en español se pasa también a la traducción.

Ya hecho por Santi el 12/11 (rama `amed-si-tenes-poco-tiempo`, PR #129, sin publicar): bloque "Si tenés poco tiempo" antes de la Introducción, con los tres hoteles de la tabla de costos: Bali Yogi Amed (económico), Valomia Beachfront (medio) y Surya Amed Beach (alto), con los precios que ya tenía el post.

**Para Lore (lo que solo ella sabe)**
- [ ] ¿Dónde nos quedamos en los 15 días en Amed? Marcar ese alojamiento con "Nos quedamos acá" en el bloque y contarlo en el texto: cuántas noches, cuánto pagamos, qué nos gustó y qué no. Si no es ninguno de los tres del bloque, reemplazar el que corresponda a su categoría.
- [ ] Confirmar que los nombres de los hoteles son esos (salieron de los links de Booking).
- [ ] La lista de 5 alojamientos en "¿Por qué Amed es el refugio de los slow travelers?" tiene textos genéricos ("Estadía frente al mar spa"): poner el nombre de cada hotel o sacar la lista, porque ahora está el bloque arriba.
- [ ] Fotos: hay 6 en unas 4.600 palabras y un tramo de casi 1.500 palabras sin imagen. Sumar fotos propias de las bahías de snorkel (Jemeluk, Lipah, el naufragio japonés), de los templos y de los volcanes, con `/fotos` (carpeta `amed` en Drive).
- [ ] Secciones "Lo que nos gustó, lo que no y ¿vale la pena?" y "Qué saltearíamos" (si hay algo): faltan y solo las puede escribir Lore.

**Mejoras de texto y estructura (se pueden hacer con Claude)**
- [ ] La experiencia aparece tarde: el post arranca con "Hace años tenía el sueño de viajar a Bali" y los "15 días" recién aparecen en "Circuitos turísticos". Llevar a los primeros párrafos cuánto tiempo estuvimos, dónde nos quedamos y el consejo clave (por ejemplo, el de los cajeros sin efectivo).
- [ ] Título: no dice "qué ver", que es una de las búsquedas que ya trae. Propuesta: "Qué hacer en Amed, Bali: qué ver, snorkel y presupuesto (15 días) 2026". Lo decide Santi, porque la página ya posiciona.
- [ ] Afiliados que faltan en "Todo lo que necesitás saber antes de ir": eSIM de Airalo (link de Impact de siempre) y seguro de viaje (cuando haya afiliado). Evaluar un traslado desde Ubud o el aeropuerto.
- [ ] Preguntas frecuentes: están como viñetas en dos lugares ("Preguntas frecuentes de snorkel" y "Preguntas frecuentes"). Pasarlas a una sola sección al final, con cada pregunta como H3.
- [ ] Costos: hay 4 secciones H2 seguidas sobre costos y presupuesto. Unirlas en una ("¿Cuánto cuesta Amed? Precios 2026") con las tablas adentro. En la tabla los USD van con punto ("8.36"): pasarlos a coma, como en el resto del blog.
- [ ] Calculadora: el texto promete que el presupuesto llega "al mail en formato Excel" (y dice "recinir"), pero solo se descarga un CSV. Corregir el texto ya y, más adelante, convertirla en un descargable a cambio del mail. La versión en inglés del post linkea a la calculadora en español.
- [ ] Más adelante, satélites: "Snorkel en Amed", "Dónde quedarse en Amed" y "Excursiones desde Amed". No dividir el post todavía.

---

## Parte 2. Errores que encontramos (revisar en cada borrador)

1. **Voseo con tilde.** "Podés", "tenés", "te quedás", "llegás". "Podes" sin tilde y "te quedas" son errores. El subjuntivo con forma de tú ("acuerdes", "debas") está bien y no se corrige.
2. **El mismo dato igual en todo el artículo.** Noches que nos quedamos, precio de la entrada, ubicación del hotel, horarios. Si la recomendación es distinta de lo que hicimos, explicarlo ("nos quedamos dos, pero con una alcanza").
3. **Precios con la moneda local primero.** Formato "98 CNY (USD 14,98 o unos EUR 13)". Decimales con coma. Si el precio estaba en USD (Trip.com), poner los yuanes aproximados con "unos". Indicar el mes de los precios.
4. **El alojamiento donde nos quedamos va marcado y contado.** "Nos quedamos acá", cuántas noches, cuánto pagamos y qué nos gustó y qué no. En los demás no hace falta escribir "No nos quedamos" (regla cambiada el 11/11/2026).
5. **Datos históricos y de terceros con fuente.** Fechas, cifras, años de gobierno, población: verificarlos o marcarlos [VERIFICAR]. No usar "según las guías" o "según medios" sin decir cuál. Preferir cifras de fuentes oficiales (por ejemplo, un censo) a las de blogs turísticos.
6. **Lo que nos contaron no es lo que pasó.** Si nos mostraron una foto o nos contaron algo, escribirlo así ("nos mostraron una foto de…"), sin afirmarlo como hecho.
7. **Nombres de etnias, lugares y personas correctos.** Ojo con mezclar tujia y miao, o lugares parecidos.
8. **No prometer lo que no está.** Fotos "a continuación", artículos "que vamos a publicar" sin link, secciones que no existen.
9. **Superlativos solo si son de Lore.** Los que Lore escribe en sus notas o borradores quedan como están. Claude no agrega superlativos por su cuenta ("al 100%", "increíble", "absolutamente") ni los suma al corregir o completar un texto (regla cambiada el 12/11/2026).
10. **Estructura según la plantilla.** Índice, "Nuestra experiencia", seguro de viaje en "Antes de ir", "Más guías de [destino]" y recuadro hacia la guía pilar. Las piezas "si aplica" ("Qué saltearíamos", "Lo que nos gustó, lo que no y ¿vale la pena?", preguntas frecuentes, "¿Para quién es?") van solo si aportan algo; si van, las preguntas frecuentes llevan cada pregunta como H3 (regla cambiada el 12/11/2026).
11. **Frases cortas y con puntuación.** Releer los párrafos de experiencia: ahí suelen quedar frases pegadas sin punto o sin coma.
12. **Lista final en el PR.** En la descripción del PR, listar lo que quedó como [VERIFICAR] y lo que falta (por ejemplo, fotos).
13. **Bloque "Si tenés poco tiempo" solo cuando el lector está eligiendo dónde dormir** (dónde quedarse, guía pilar, "qué hacer" de un lugar donde se hace noche, itinerarios) y en formato compacto: cada alojamiento en una fila con nombre, etiqueta y botón "Ver alojamiento" en la misma línea, y debajo una línea con categoría y precio. Sin títulos por grupo ni espacios grandes. Modelo: el bloque de Furongzhen.
14. **Tablas.** Observaciones de pocas palabras (el detalle va en el texto) y los conceptos con link natural (entrada, tren, alojamiento, sección del artículo) enlazados.
