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
- [ ] Sumar fotos propias con epígrafe que incluya el nombre del lugar, en cada sección, y la portada (`main_image`). Convertirlas a .webp con `npm run optimizar`.
- [ ] En "Nuestra experiencia" dice "sacamos fotos en varios de los puntos iluminados que compartiré a continuación". Poner esas fotos ahí o sacar la frase.

**Datos para confirmar con Lore (si no se confirman, se sacan)**
- [ ] Que adolescentes y personas mayores pagan menos la entrada. Aparece en la tabla de datos, en la tabla de costos y en la pregunta frecuente de la entrada.
- [ ] Horario del recinto, de 8:00 a 24:00. La ficha de Klook dice de 7:30 a 23:59.
- [ ] "En verano se enciende antes" (pregunta frecuente de la cascada).
- [ ] "La cascada va más fuerte de junio a septiembre" (pregunta frecuente de la mejor época). La tabla de datos solo dice que baja de diciembre a febrero.
- [ ] "Hay más de diez salidas por día" del tren desde Zhangjiajie.
- [ ] El taxi de la estación al pueblo a 15-25 CNY.
- [ ] Arroz con verduras (16 CNY) y arroz con pollo (20 CNY) de la tabla de costos: dónde los comimos. Si fue en un lugar con nombre, sumarlo en "Qué comer".
- [ ] Llegada a Jianghu: en "Nuestra experiencia" el auto nos lleva hasta la entrada del recinto, donde escanean el QR, y en "Dónde quedarse" el auto nos deja en la calle del hotel. Contar cómo fue en un solo lugar y que el otro coincida.
- [ ] Jianghu: cuánto pagamos por noche (hoy dice "desde unos 120 CNY (USD 18)", que es la tarifa de Trip.com).
- [ ] Cambio de nombre de Wangcun a Furongzhen: el texto dice 2007, pero dos páginas del gobierno de Hunan dicen 1997. Quedó marcado [VERIFICAR]. Si no se encuentra una fuente firme, cambiar por "años después" y sacar el año.

**Estructura (ver `docs/plantilla-articulo.md`)**
- [ ] Índice "En este artículo".
- [ ] Sección "Qué saltearíamos". Si de verdad no saltearíamos nada, decirlo ahí con una línea y el motivo.
- [ ] Sección "Lo que nos gustó, lo que no y ¿vale la pena?", con algo que no nos gustó o nos costó (la gente a la tarde, las escaleras con valija, lo que sea).
- [ ] Seguro de viaje en "Antes de ir a Furongzhen".
- [ ] Recuadro 🎒 del principio: enlazar a la guía pilar de China cuando esté publicada (ver `docs/mapa-cluster-china.md`).
- [ ] Bloque "Si tenés poco tiempo": la guía pide tres alojamientos (económico, medio, alto) con estrellas. Hoy hay cuatro en dos grupos.
- [ ] "Más guías de China": sumar los satélites que se vayan publicando.

**Redacción**
- [ ] Primer párrafo de "Un pueblo colgado de una cascada": "etnia Tujia" se repite dos veces en la misma oración.
- [ ] Frases largas sin puntos ni comas, para partirlas:
  - "Como nos quedábamos dos noches el primer día aprovechamos para caminar con calma, conocer y probar el famoso tofu de arroz, "mi doufu" fuimos al local más icónico…"
  - "la pasarela es divertida pasamos por detrás varias veces…"
  - "acá vimos "El llanto de la novia" la previa de una boda tujia alrededor de las 14:30" (le falta el punto final).
- [ ] La entrada se explica cinco veces (intro, resumen rápido, tabla de datos, después de los trenes y FAQ). Dejar el detalle en la tabla y en un solo párrafo, y en el resto solo el precio.

**Después del borrador**
- [ ] `docs/mapa-cluster-china.md`: el slug queda `furongzhen-que-ver` (no `furongzhen-por-libre`) y el alojamiento es Jianghu (no Wangxiansheng Homestay).
- [ ] Kunming: en la sección del Pueblo de las Etnias se puede sumar que Lore quería disfrazarse y no lo hizo, y que en Furongzhen se animó con la ropa miao, con link a esta guía cuando se publique. Lo confirma Lore.
- [ ] Traducción al inglés, cuando el español quede cerrado.
- [ ] Pasar el PR #126 a "Ready for review" y avisar a Santi.

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
9. **Sin superlativos vacíos.** Nada de "al 100%", "increíble" o "absolutamente" en cadena.
10. **Estructura de la plantilla completa.** Índice, "Nuestra experiencia", "Qué saltearíamos", "Lo que nos gustó, lo que no y ¿vale la pena?", seguro de viaje en "Antes de ir", FAQ con cada pregunta como H3, "¿Para quién es?", "Más guías de [destino]" y recuadro hacia la guía pilar.
11. **Frases cortas y con puntuación.** Releer los párrafos de experiencia: ahí suelen quedar frases pegadas sin punto o sin coma.
12. **Lista final en el PR.** En la descripción del PR, listar lo que quedó como [VERIFICAR] y lo que falta (por ejemplo, fotos).
13. **Bloque "Si tenés poco tiempo" compacto.** Cada alojamiento en una fila: nombre, etiqueta y botón "Ver alojamiento" en la misma línea, y debajo una línea con categoría y precio. Sin títulos por grupo ni espacios grandes. Modelo: el bloque de Furongzhen.
14. **Tablas.** Observaciones de pocas palabras (el detalle va en el texto) y los conceptos con link natural (entrada, tren, alojamiento, sección del artículo) enlazados.
