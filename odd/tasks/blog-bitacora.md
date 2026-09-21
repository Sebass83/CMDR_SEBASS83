# Feature: blog-bitacora — CMDR SEBASS83 (blog)

**Objetivo**: convertir `raxxla-web` (single-page Astro 5) en una bitácora de commander "CMDR SEBASS83": home = landing con últimas entradas, RAXXLA = primera entrada del blog. Mantener 100% la estética HUD actual.

**Problema**: el sitio actual es una single-page con todo el contenido RAXXLA en `src/pages/index.astro`.

**Por qué**: el usuario quiere ampliar el sitio como blog; confirmó identidad "bitácora tipo commander log", nombre CMDR SEBASS83, landing con resumen de entradas, y que se mantenga la estética HUD.

**Autorización**: aprobación explícita del usuario del plan final (2026-09-21).

**Alcance**: raxxla-web/. Home nuevo, content collections, entrada RAXXLA como MDX, componentes de blog, nav/footer, `.prose` HUD. NO tocar: carpeta `raxxla/` (fuente de verdad de investigación), deploy workflow. `astro.config.mjs`: solo se registró la integración mdx (necesaria; site/base/output intactos).

**Restricciones**: contenido UI en español; comentarios de código en inglés; sin emojis en artefactos; estética HUD innegociable (nebula, starfield, scanlines, Orbitron/Rajdhani/Share Tech Mono, paneles, badges, radar, reveal, typewriter); links internos SIEMPRE con `import.meta.env.BASE_URL`.

## Tasks

- [x] **T1** Infraestructura de contenido: `@astrojs/mdx@^4.3.14` instalado; `src/content.config.ts` con colección `blog` (title, description, pubDate, tags, typewriter opcional, draft). Check: build verde.
- [x] **T2** Entrada RAXXLA: componentes seccionales movidos a `src/components/raxxla/` (Hero con prop kicker "COMANDER LOG // ENTRADA 001 — REFERENCIA NO OFICIAL", Facts, Timeline, Leads, Matrix, Order, Sources); `src/content/blog/raxxla.mdx` creado. Check: build verde.
- [x] **T3** Componentes blog: `PostCard`, `PostHeader`, `BlogNav` en `src/components/blog/`. Check: build verde.
- [x] **T4** Páginas: home landing CMDR SEBASS83 (hero + sobre el commander placeholder + últimas entradas) en `src/pages/index.astro`; detalle `src/pages/blog/[slug].astro`. Check: build verde (2 páginas).
- [x] **T5** Layout (header nav sticky), Footer (anclas → `BASE_URL blog/raxxla/#...`), `global.css` (`.prose` HUD con tablas contenidas). Check: build verde.
- [x] **T6** Verificación final: `npm install` + `npm run build` → `2 page(s) built in 2.99s`; `dist/index.html` y `dist/blog/raxxla/index.html` generados.
- [x] **T7** Entrada 002 — Guardianes: investigación (worker, sep 2026); v1 markdown `.prose` → revisión del usuario ("no respeta el diseño RAXXLA") → rediseño completo con componentes HUD en `src/components/guardianes/` (Hero + Facts + Timeline + Tech + Guide + Mysteries + Sources) espejando `src/components/raxxla/`; numeración de entradas agregada al schema (`entry` en content.config.ts, PostHeader usa `entry ?? index`; RAXXLA entry 1, Guardianes entry 2). Check: build verde (3 páginas) x3.
- [x] **T8** Entrada 003 — Thargoides: investigación worker con fuentes (memoria `investigacion/thargoides`, sep 2026); ángulo "Mixto" elegido por el usuario; componentes HUD en `src/components/thargoids/` (Hero + Facts + Timeline + Tech + Guide + Mysteries + Sources; Timeline con 19 entradas agrupadas en 6 eras; tabla de recompensas Update 18.06); `entry: 3` en `src/content/blog/thargoides.mdx`; cierre enlaza a Guardianes vía `BASE_URL`. Check: build verde (4 páginas) x2 + spot check del padre (9 containers, sin voseo, ENTRADA 003, link BASE_URL). Commit `27747d3` en branch `feat/entrada-thargoides`.
- [x] **T9** Bloque "Sobre el commander" (`#sobre`): tarjeta de identificación HUD con foto carnet `public/cmdr_sebass83.png` (896×1195, PNG provisto por el usuario el 2026-09-21) + datos de registro provistos: NOMBRE CMDR SEBASS83, RAZA HUMANO, GÉNERO MASCULINO, NACIMIENTO 3269, ALIANZA DARK WHEEL · FEDERACIÓN · OTROS, HORAS DE VUELO ~810 HS; reemplazó el placeholder "CONTENIDO PENDIENTE" en `src/pages/index.astro` (markup + CSS scoped `.id-card`/`.id-photo`/`.id-fields`; scanlines, corner-cut 3:4, badge IDENTIFICACIÓN ACTIVA; móvil colapsa a 1 columna). Check: build verde (4 páginas) + spot check (imagen en dist 2.1MB, campos presentes, sin voseo). Commit `6ae9c6d` en main (listo para publicar; push pendiente de OK del usuario).

## Rutas

- T1–T6: **delegado** a un writer `general` (bounded writer, un único hilo). Evidence: 12+ archivos tocados (writer trigger).
- T7–T8: **delegado** a writers `general` (rediseño Guardianes y entrada Thargoides; writer + mapping triggers por 8–12 archivos).
- TDD: no hay infraestructura de tests → TDD off; cheque funcional = `npm run build` (exact command). Source of mode: proyecto sin test runner.
- RDD (T8): `gentle-ai review assess` no disponible en este entorno (binario ausente / UNC WSL) → tier registrado como **unavailable**, nunca baja de tier; verificación = checkpoint estructural del padre (paridad de containers en dist) + spot check.

## Progreso / evidencia

- **Verificación de registro** (writer): instaló MDX vía WSL (npm de Windows falla por symlinks rotos sobre UNC → EISDIR); build final verde con 2 páginas.
- **Spot check (parent)**: `npm run build` re-corrido desde WSL → `2 page(s) built in 2.99s`, BUILD_OK.
- **Assessment nativo (RDD on)**: `gentle-ai review assess` → risk `medium`, `review_due=true` (slice_budget_reached, 3764 líneas).
- **Status nativo (preflight)**: falló seguro `operation_failed` pre_native — RAR no puede validar el filesystem del repo sobre UNC WSL ("unknown filesystem; cannot assume NTFS semantics"). Retry de una sola vez vía WSL: binario `gentle-ai` no instalado en el distro. Resultado typed preservado; **review nativo NO disponible en este entorno** (limitación de entorno, no defecto de Gentle AI: fallo seguro, sin mutación, retry-safe). No se inventó PASS ni se relanzó el ciclo.
- **Commit de work-unit**: `4578460` en branch `feat/blog-bitacora` — "feat: restructure site into CMDR SEBASS83 commander log blog" (21 archivos, 1656 insertions/34 deletions; renames 100% detectados).
- **URL final**: repo renombrado por el usuario a `Sebass83/CMDR_SEBASS83`; `astro.config.mjs` base → `/CMDR_SEBASS83/` (commit `dc9f027` en `feat/pages-url`, merge ff a main); remote actualizado a `git@github.com:Sebass83/CMDR_SEBASS83.git`; push OK. Sitio: `https://sebass83.github.io/CMDR_SEBASS83/`.
- **Entrada Guardianes (T7)**: investigación worker con fuentes (memoria `investigacion/guardianes`); v1 markdown publicada (commit `1dd257f`), luego rediseño a componentes HUD (branch `feat/guardianes-hud`): `Hero` (kicker COMANDER LOG // ENTRADA 002, typewriter, toast Ram Tah, badges, radar), `Facts`, `Timeline` (8 entries, incluye Proteus Wave), `Tech` (tabla matriz 8 filas), `Guide` (pasos R/M/A/B/N + callout materiales), `Mysteries` (5 cards), `Sources` (7 fuentes); `entry` del schema para numeración coherente (RAXXLA 001, Guardianes 002).
- **Convención aprobada por el usuario (2026-09-21)**: entrada Guardianes "se ve de 10" (el "100% de ancho" era caché del navegador con la v1, no el deploy — verificado: ambas páginas en dist tienen 9 `.container` centrados). **TODAS las próximas entradas deben mantener el estilo HUD de componentes**: set espejo en `src/components/<tema>/`, campo `entry` (RAXXLA 001, Guardianes 002, siguiente 003...), kicker ENTRADA // 00N, todo dentro de `.container` centrado (1120px), tablas con `table-wrap`, español neutro sin voseo.
- **Entrada Thargoides (T8)**: investigación worker con fuentes (memoria `investigacion/thargoides`; GalNet oficial, Fandom, Canonn, AXI, Inara, EDSM — URLs verificadas por el worker); ángulo Mixto; componentes `src/components/thargoids/*` espejo exacto de Guardianes (mismo markup/CSS scoped, typewriter/reveal/radar globales intactos); commit `27747d3` en `feat/entrada-thargoides` (+1252 líneas, 8 archivos). Verificación padre: build 4 páginas, 9 containers, 2 table-wrap, sin voseo, ENTRADA 003, link BASE_URL a Guardianes. **Publicada (2026-09-21)**: merge ff a main + push vía WSL (`836a82a..e6cb17b`); URL `https://sebass83.github.io/CMDR_SEBASS83/blog/thargoides/`.

- **Bloque identificación (T9, 2026-09-21)**: usuario aportó foto carnet (`public/cmdr_sebass83.png`) + datos (raza humano, género masculino, nacimiento 3269, aliados Dark Wheel y Federación entre otros, ~810 hs de vuelo). Tarjeta ID HUD en `#sobre` (`.id-card` scoped en index.astro, grid foto 240px + campos, caption "FOTO // CARNET", footer "REGISTRO DE VUELO // ARCHIVO ABIERTO 3312"). Build 4 páginas verde; imagen en dist; sin voseo; commit `6ae9c6d`. **Publicado (2026-09-21)**: push vía WSL (`e4b93e0..f2b9447`); verificación en vivo: imagen HTTP 200 + campos presentes en el home.

## Próximo paso

- Entrada Thargoides publicada (2026-09-21).
- **Bloque identificación publicado (2026-09-21)** — tarjeta ID visible en `https://sebass83.github.io/CMDR_SEBASS83/`.
- Pendiente (opcional): texto corto de presentación/motivación bajo la tarjeta si el usuario lo quiere.
- Siguiente entrada: investigación + set de componentes espejo (patrón Guardianes/Thargoides) con `entry: 4`.