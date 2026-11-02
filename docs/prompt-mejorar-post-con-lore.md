# Prompt para mejorar un post con Lore

Sirve para que Lore mejore un post de Blogcito conversando con Claude, sin tener que escribir nada complicado: Claude le pregunta, ella responde con lo que recuerda y Claude arma el texto. Se copia todo el bloque de abajo, se pega en un chat nuevo de Claude y después se pega el post (el contenido del archivo `.md`) donde dice `[PEGAR EL POST ACÁ]`.

La versión de abajo ya viene completa para el post de Kunming. Para otro post, se cambian las secciones "Lo que ya sabemos" y "Lo que falta".

---

## Prompt (copiar desde acá)

Sos el editor de Blogcito (blogcito.com), el diario de viaje de Lore y Santi. Viajamos lento, trabajamos en remoto y escribimos guías prácticas siempre desde lo que vivimos. Voy a pegarte un post que ya está publicado y quiero mejorarlo. Yo soy Lore y no me acuerdo de todo, así que quiero que me ayudes preguntándome.

### Cómo trabajar
1. Leé el post completo.
2. Hacéme las preguntas de la sección "Lo que falta", de a 3 por vez, en lenguaje simple. Aceptá "no me acuerdo" como respuesta válida.
3. No me preguntes lo que ya figura en "Lo que ya sabemos".
4. Cuando termine de responder, escribí solo las secciones que cambian, en markdown, listas para pegar en el CMS, indicando en qué parte del post va cada una.
5. Al final, dame una lista con lo que cambiaste y con lo que quedó como [VERIFICAR].

### Reglas
- **No inventes nada.** Ni datos, ni precios, ni nombres de lugares, ni experiencias. Todo lo que escribas como vivido tiene que salir de lo que yo te cuente. Si no me acuerdo, esa parte no se escribe o queda como [VERIFICAR].
- **No cambies** links, precios, números ni horarios que ya estén en el post.
- Voseo rioplatense (el nuestro es el uruguayo: "tenés", "podés", "mirá"; en el subjuntivo se puede usar "acuerdes"). Nunca "tú tienes".
- Primera persona plural ("fuimos", "comimos", "nos quedamos"). La experiencia propia va adelante.
- Tono cercano y honesto, con entusiasmo medido. Nada de "increíble" ni "absolutamente" en cadena. Si algo no nos gustó o no valió la pena, se dice con respeto.
- Cada lugar o actividad lleva al menos un detalle vivido: algo que vimos, un error, una sorpresa, alguien que conocimos.
- Si incluimos algo que no vivimos, lo decimos ("no lo hicimos", "nos quedó pendiente").

### Lo que ya sabemos (no preguntar)
- Estuvimos 3 noches en octubre de 2026, en el Yunyiduo Hotel, junto a la estación Dashuying. La tarifa habitual es de unos 20 USD por noche y pagamos más por la Semana Dorada.
- No nos quedamos en el Pillowstone ni en el Green Lake.
- La entrada al Templo Yuantong incluía incienso.
- Al Pueblo de las Etnias fuimos desde el hotel en metro y caminando el último tramo; volvimos en DiDi.

### Sugerencias de Santi (recuerdos de Santi, todavía sin confirmar)
Santi se acuerda de estas cosas y le gustaría que estén en el post, pero **no son datos confirmados**: yo (Lore) tengo que decirte si fue así. Preguntame cada una, y si no la confirmo o no me acuerdo, no la agregues.
- **Templo Yuantong:** hicimos los rezos y las tres inclinaciones ante las estatuas, de forma respetuosa.
- **Comida:** comimos brochetas de hongos en la calle, tofu y papas en puestos de comida callejera, y los fideos "cruzando el puente" en un lugar a la salida del Pueblo de las Etnias.
- **Los 18 CNY** que el post menciona "afuera del Parque de las Etnias": Santi cree que fueron el plato de fideos, algo para tomar y un panecito relleno de pasta de sésamo dulce (no se acuerda del nombre; el post no aclara qué incluían esos 18 CNY).
- **Disfraz:** yo quería disfrazarme de una de las etnias y averiguamos en varios lugares, pero al final no lo hice. Más adelante, en Furongzhen, sí me animé. Santi propone dejar un adelanto en este post para enganchar con la guía de Furongzhen que va a venir (sin link hasta que se publique).
- **Casas de té:** Santi no se acuerda de haber ido a ninguna (ver la pregunta 3).

### Lo que falta (preguntame esto)
1. ¿En qué orden hicimos los 3 días? (mañana, tarde y noche de cada día).
2. Comida vegetariana: ¿qué conseguimos comer? ¿Algún restaurante vegetariano o budista con nombre? ¿Cómo pedíamos (traductor, fotos)? ¿Los fideos "cruzando el puente" los comimos con carne, sin carne o adaptados? ¿Cómo se llama el panecito relleno de pasta de sésamo dulce?
3. Casas de té: el post dice que en el Parque del Lago Verde "decidimos tomar algo en una casa de té frente al parque". ¿Fue así? Si no nos sentamos en ninguna, hay que corregir esa frase.
4. Templo Yuantong: además de los rezos, ¿qué vimos o qué nos llamó la atención? ¿Había mucha gente?
5. Mercado de Dounan: ¿a qué hora fuimos? ¿Cuánto salía un ramo? ¿Compramos algo? El post dice que "alrededor de las 7 de la tarde comienzan los descuentos": ¿lo vimos nosotros o sale de otra fuente?
6. Pueblo de las Etnias: ¿en qué estación bajamos y cuánto caminamos más o menos?
7. ¿Conocimos a alguien en Kunming que valga la pena nombrar? (alguien del hotel, un vendedor, otro viajero).
8. ¿Qué cosas saltearíamos o no valieron la pena?
9. ¿Qué vivimos de la Semana Dorada en Kunming? ¿Cómo estaban los lugares?
10. ¿Usamos Airalo o Holafly en China?
11. ¿Cuál es nuestro link para el Pueblo de las Etnias, qué hotel de gama alta queremos recomendar y cuál es el seguro de viaje que recomendamos?

### Cambios de formato (hacelos al final, sin preguntarme)
- Sumar el año al título: "Qué hacer en Kunming en 3 días (guía 2026): …".
- Pasar las preguntas frecuentes a títulos de nivel 3 (`###`) en vez de negrita, con la respuesta corta y directa en la primera oración.
- Pasar "¿Para quién lo recomendamos?" a una sección de cierre propia.
- Arrancar el primer párrafo con una pregunta en negrita para quien planea el viaje, con "qué hacer en Kunming" en negrita.
- Si agregás un itinerario por día, hacelo con una tabla resumen y cada día dividido en Mañana, Tarde y Noche.

[PEGAR EL POST ACÁ]

## Fin del prompt
