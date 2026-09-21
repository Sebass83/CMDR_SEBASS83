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

## Rutas

- T1–T6: **delegado** a un writer `general` (bounded writer, un único hilo). Evidence: 12+ archivos tocados (writer trigger).
- TDD: no hay infraestructura de tests → TDD off; cheque funcional = `npm run build` (exact command). Source of mode: proyecto sin test runner.

## Progreso / evidencia

- **Verificación de registro** (writer): instaló MDX vía WSL (npm de Windows falla por symlinks rotos sobre UNC → EISDIR); build final verde con 2 páginas.
- **Spot check (parent)**: `npm run build` re-corrido desde WSL → `2 page(s) built in 2.99s`, BUILD_OK.
- **Assessment nativo (RDD on)**: `gentle-ai review assess` → risk `medium`, `review_due=true` (slice_budget_reached, 3764 líneas).
- **Status nativo (preflight)**: falló seguro `operation_failed` pre_native — RAR no puede validar el filesystem del repo sobre UNC WSL ("unknown filesystem; cannot assume NTFS semantics"). Retry de una sola vez vía WSL: binario `gentle-ai` no instalado en el distro. Resultado typed preservado; **review nativo NO disponible en este entorno** (limitación de entorno, no defecto de Gentle AI: fallo seguro, sin mutación, retry-safe). No se inventó PASS ni se relanzó el ciclo.
- **Commit de work-unit**: `4578460` en branch `feat/blog-bitacora` — "feat: restructure site into CMDR SEBASS83 commander log blog" (21 archivos, 1656 insertions/34 deletions; renames 100% detectados).
- **URL final**: repo renombrado por el usuario a `Sebass83/CMDR_SEBASS83`; `astro.config.mjs` base → `/CMDR_SEBASS83/` (commit `dc9f027` en `feat/pages-url`, merge ff a main); remote actualizado a `git@github.com:Sebass83/CMDR_SEBASS83.git`; push OK. Sitio: `https://sebass83.github.io/CMDR_SEBASS83/`.

## Próximo paso

- Verificar deploy en la URL nueva.
- Luego: completar el bloque "sobre el commander" con bio real; próximas entradas = nuevo `.mdx` en `src/content/blog/`.