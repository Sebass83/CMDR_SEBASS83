# Feature: blog-bitacora — CMDR SEBASS83 (blog)

**Objetivo**: convertir `raxxla-web` (single-page Astro 5) en una bitácora de commander "CMDR SEBASS83": home = landing con últimas entradas, RAXXLA = primera entrada del blog. Mantener 100% la estética HUD actual.

**Problema**: el sitio actual es una single-page con todo el contenido RAXXLA en `src/pages/index.astro`.

**Por qué**: el usuario quiere ampliar el sitio como blog; confirmó identidad "bitácora tipo commander log", nombre CMDR SEBASS83, landing con resumen de entradas, y que se mantenga la estética HUD.

**Autorización**: aprobación explícita del usuario del plan final (2026-09-21).

**Alcance**: raxxla-web/. Home nuevo, content collections, entrada RAXXLA como MDX, componentes de blog, nav/footer, `.prose` HUD. NO tocar: carpeta `raxxla/` (fuente de verdad de investigación), deploy workflow, `astro.config.mjs` (base `/raxxla-web/`).

**Restricciones**: contenido UI en español; comentarios de código en inglés; sin emojis en artefactos; estética HUD innegociable (nebula, starfield, scanlines, Orbitron/Rajdhani/Share Tech Mono, paneles, badges, radar, reveal, typewriter); links internos SIEMPRE con `import.meta.env.BASE_URL`.

## Tasks

- [ ] **T1** Infraestructura de contenido: agregar `@astrojs/mdx`; crear `src/content.config.ts` con colección `blog` (title, description, pubDate, tags, typewriter opcional, draft). Check: build pasa con colección vacía + entrada.
- [ ] **T2** Entrada RAXXLA: mover componentes seccionales a `src/components/raxxla/` (Hero adaptado con props, Facts, Timeline, Leads, Matrix, Order, Sources); crear `src/content/blog/raxxla.mdx` (frontmatter + compose). Check: build ok.
- [ ] **T3** Componentes blog: `PostCard`, `PostHeader`, `BlogNav` en `src/components/blog/`. Check: build ok.
- [ ] **T4** Páginas: home landing CMDR SEBASS83 (hero + sobre el commander placeholder + últimas entradas) en `src/pages/index.astro`; detalle `src/pages/blog/[slug].astro`. Check: build ok.
- [ ] **T5** Layout (header nav mínimo), Footer (anclas → `/blog/raxxla/#...`), `global.css` (`.prose` HUD). Check: build ok.
- [ ] **T6** Verificación final: `npm install` + `npm run build`; revisar output estático (index + blog/raxxla). Check: build sin errores y archivos generados.

## Rutas

- T1–T6: **delegado** a un writer `general` (bounded writer, un único hilo). Evidence: 12+ archivos tocados (writer trigger).
- TDD: no hay infraestructura de tests → TDD off; cheque funcional = `npm run build` (exact command). Source of mode: proyecto sin test runner.

## Progreso / evidencia

(se completa durante la ejecución)

## Próximo paso

T1: delegar writer con brief completo.