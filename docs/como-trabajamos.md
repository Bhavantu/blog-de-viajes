# Cómo trabajamos

Acordado el 13/11/2026, después de mudar las reglas del blog de Drive al repo. Vale para Lore, Santi, los roles de Claude en claude.ai (Dirección, Clusters, Redacción, Analítica y Competencia) y Claude Code.

La idea es una sola: cada cosa vive en un único lugar y nadie la copia a otro.

## Dónde vive cada cosa

| Dónde | Qué vive ahí | Quién lo cambia |
|---|---|---|
| Repo `Bhavantu/blog-de-viajes` (rama main) | Reglas (`CLAUDE.md`, `docs/guia-estilo-blogcito.md`, `docs/plantilla-articulo.md`), mapas de clusters (`docs/mapa-cluster-china.md`), datos de viaje (`docs/datos-viaje-china.md`), pendientes del sitio (`docs/pendientes-blogcito.md`) y los artículos | Claude Code, cuando Santi se lo pide |
| Drive, carpeta "Blogcito- Claude" | 00 LEEME, Plan, Marca, Estado, Resumen de situación, registros de cierre (`_contexto/registro`), instrucciones y notas de cada rol, borradores finales (`contenido/borradores`), GA4 y Search Console (`datos`), canjes con hoteles | Los roles, cada uno en su cierre; Lore y Santi a mano solo cuando hace falta |
| Proyectos de Lore en claude.ai | El trabajo diario: briefs, borradores en canvas, análisis e informes | Lore |
| Claude Code (la terminal de Santi) | Pasar al repo lo aprobado, verificar, traducir y publicar | Santi |

Si una regla del repo no coincide con un documento de Drive, gana el repo. En estado y prioridades gana lo más reciente de Drive.

## Un artículo nuevo

1. Lore abre un chat en Redacción con el nombre del artículo. Redacción arma el brief en ese chat y el borrador en el canvas, y Lore corrige ahí.
2. Cuando está listo, Redacción guarda el canvas final, una sola vez, como Google Doc en `contenido/borradores`.
3. Santi le pide a Claude Code "pasá el borrador X al repo". Claude Code lo pasa a .md en una rama nueva, revisa datos, links, afiliados, voseo y fotos, convierte las imágenes a webp y abre un PR en borrador con la deploy preview.
4. Lore y Santi miran la preview. Claude Code corrige en la misma rama lo que haga falta y suma a `docs/revision-borradores-lore.md` el error para que no se repita.
5. Santi pide el merge. La traducción al inglés va después, en otro PR, desde el original en español.
6. Redacción o Dirección anotan en su cierre que el artículo se publicó, y Clusters propone actualizar el mapa.

## Si cambia algo

- **Una regla** (estilo, plantilla, afiliados, formatos): se le pide a Claude Code, que la cambia en el repo. Dirección la registra en su cierre. Nunca se edita una regla en un documento de Drive.
- **El mapa de un destino**: Clusters escribe la propuesta en su doc de cierre; Santi se la pasa a Claude Code, que la sube al repo. Un destino nuevo se arma primero como Google Doc en `roles/Clusters` y entra al repo cuando Lore lo aprueba.
- **Un dato del viaje** (hotel, noches, precio): se corrige en `docs/datos-viaje-*.md` del repo, de la misma forma.
- **Prioridades o estado**: los decide Dirección con Lore y quedan en Drive.

## Cómo se cierra cada sesión

- Cada rol cierra con un doc nuevo en `_contexto/registro` ("AAAA-MM-DD · Rol · cierre"), según el Protocolo de registro. No edita documentos compartidos.
- Cuando se juntan varios cambios grandes, Dirección escribe un Resumen de situación nuevo, que gana sobre todo lo anterior. Así nadie tiene que editar a mano Estado, Decisiones ni el Plan.
- Claude Code deja lo que hizo en el repo: commits, `docs/pendientes-blogcito.md` y, cuando corresponde, este archivo o la guía.

## Cada mes

- Día 1: Analítica hace el informe de GA4. Antes, Santi deja en `datos` el export de Search Console.
- Si en el mes cambiaron reglas, se corre el control de alineación en los 5 proyectos (prompt al final de este archivo) y Claude Code lee las respuestas.

## Lo que no se hace

- Pegar copias de las reglas en los proyectos o en Drive.
- Guardar borradores intermedios en Drive.
- Editar el mapa de clusters en Drive.
- Abrir un proyecto o un rol nuevo sin que Dirección lo registre.
- Pushear o mergear a `main` sin que Santi lo pida.

## Prompt del control de alineación

Se pega en cada proyecto. Cada rol deja su respuesta en `_contexto/registro` y Claude Code la compara con el repo. Si cambian las reglas, se actualizan las preguntas.

```
Control de alineación. No cambies, muevas ni borres nada. Respondé leyendo los archivos, no de memoria, y para cada respuesta decí de qué archivo la sacaste. Si no podés leer algo, escribí [NO PUEDO LEERLO] y seguí.

Creá un Google Doc nuevo en "Blogcito- Claude/_contexto/registro" con el título "AAAA-MM-DD · [nombre del rol] · control de alineación" y respondé:

1. ¿Podés leer el repo de GitHub Bhavantu/blog-de-viajes? Copiá la primera oración de docs/guia-estilo-blogcito.md.
2. Según la guía de estilo, ¿cuándo va el bloque "Si tenés poco tiempo"?
3. Según la guía de estilo, ¿quién decide los superlativos y las frases de folleto?
4. Si en un borrador falta el link de un afiliado propio (seguro de viaje, VPN), ¿qué se escribe? ¿Y si falta un dato, como un precio?
5. ¿Cuántos artículos van en el bloque "Más guías de [destino]"?
6. ¿Dónde está el mapa de China vigente, cuántos artículos tiene y cuántos están publicados?
7. ¿Cuántos archivos .md hay en src/pages/diario/ del repo?
8. ¿Cuál es el próximo artículo según el orden de publicación vigente?
9. ¿Van tildes en los slugs? ¿Y en los títulos visibles?
10. ¿Dónde se trabaja un borrador y cuándo se guarda en Drive?
11. Si una regla del repo no coincide con un documento de Drive, ¿cuál gana? ¿Y en estado y prioridades?
12. ¿Qué archivos tiene hoy el conocimiento de este proyecto? Lista con nombre y origen.
13. Copiá la primera oración de la parte "Al empezar" de tus instrucciones.
14. ¿Encontraste algo en tus instrucciones, en Drive o en el conocimiento del proyecto que contradiga al repo? Listalo.
```

