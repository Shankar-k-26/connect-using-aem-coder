# AEM Page Migration Plan

## Overview
Migrate the AAA blog article **"Questions to Ask When Buying a Car"** to AEM Edge Delivery Services (EDS).

**Source URL:** `https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car`

## Phase 1: Site & Page Analysis
- [ ] Classify the page template type (likely a blog/article template)
- [ ] Create `page-templates.json` with template skeleton and URL grouping
- [ ] Analyze page structure — identify sections, content sequences, and block variants
- [ ] Map content elements to EDS blocks (hero, columns, cards, etc.)

## Phase 2: Design System Extraction
- [ ] Extract global design tokens (colors, typography, spacing) from the original page
- [ ] Generate CSS custom properties and apply to EDS project styles

## Phase 3: Block Variant Management
- [ ] Scan existing local blocks for reuse opportunities
- [ ] Identify new block variants needed (70% similarity threshold)
- [ ] Create custom block variant code (JS + CSS) for any new variants

## Phase 4: Import Infrastructure
- [ ] Generate block parsers for each mapped block
- [ ] Generate page transformers for the template
- [ ] Build and bundle the import script

## Phase 5: Content Import
- [ ] Execute import script for the target URL
- [ ] Verify generated HTML file in the content directory

## Phase 6: Navigation Setup
- [ ] Extract navigation structure from the original site
- [ ] Create local `nav.html` for EDS header/footer rendering

## Phase 7: Preview & Validation
- [ ] Preview migrated page on the local dev server
- [ ] Compare rendered output against the original page
- [ ] Fix any rendering or styling issues

## Checklist
- [x] Receive page URL from user
- [ ] Complete site analysis and template classification
- [ ] Analyze page structure and map blocks
- [ ] Extract and apply design system
- [ ] Manage block variants (reuse or create)
- [ ] Build import infrastructure (parsers + transformers)
- [ ] Import page content
- [ ] Set up navigation
- [ ] Validate page in preview

---

*Ready for execution. Switch to Execute mode to begin the migration using the site migration workflow.*
