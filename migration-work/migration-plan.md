# Migration Plan: AAA Blog Article

**Mode:** Single Page
**Source:** https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car
**Generated:** 2026-04-07

## Steps
- [x] 1. Project Setup
- [x] 2. Site Analysis (1 template: blog-article)
- [x] 3. Page Analysis (3 variants: hero-blog, cards-cta, cards-article)
- [x] 4. Block Mapping (3 blocks: hero-blog, cards-cta, cards-article)
- [x] 5. Import Infrastructure (3 parsers, 2 transformers)
- [x] 6. URL Classification and Content Import (1 page imported)

## Artifacts
- `.migration/project.json`
- `tools/importer/page-templates.json`
- `migration-work/authoring-analysis.json`
- `tools/importer/parsers/*.js`
- `tools/importer/transformers/*.js`
- `tools/importer/import-*.js`
- `content/*.html`
