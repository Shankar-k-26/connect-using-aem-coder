/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBlogParser from './parsers/hero-blog.js';
import cardsCtaParser from './parsers/cards-cta.js';
import cardsArticleParser from './parsers/cards-article.js';

// TRANSFORMER IMPORTS
import aaaCleanupTransformer from './transformers/aaa-cleanup.js';
import aaaSectionsTransformer from './transformers/aaa-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-blog': heroBlogParser,
  'cards-cta': cardsCtaParser,
  'cards-article': cardsArticleParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'blog-article',
  description: 'Blog article page from AAA Connect blogs section covering automotive topics',
  urls: [
    'https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car',
  ],
  blocks: [
    {
      name: 'hero-blog',
      instances: ['.cmp-blog-detail__container'],
    },
    {
      name: 'cards-cta',
      instances: ['.end-cta-component .cmp-end-cta'],
    },
    {
      name: 'cards-article',
      instances: ['.cmp-dynamic-card-list'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Blog Header',
      selector: '.cmp-blog-detail',
      style: null,
      blocks: ['hero-blog'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Article Overview',
      selector: '#text-33a7b9e875',
      style: null,
      blocks: [],
      defaultContent: ['#text-33a7b9e875', '#image-4a07a8e827'],
    },
    {
      id: 'section-3',
      name: 'Quick Checklist',
      selector: '#text-9992830db9',
      style: null,
      blocks: [],
      defaultContent: ['#text-9992830db9'],
    },
    {
      id: 'section-4',
      name: 'Used Car Questions',
      selector: '#text-0c52d8be41',
      style: null,
      blocks: ['cards-cta'],
      defaultContent: ['#text-0c52d8be41'],
    },
    {
      id: 'section-5',
      name: 'New Car Questions',
      selector: '#text-a82f85e025',
      style: null,
      blocks: [],
      defaultContent: ['#text-a82f85e025', '#image-c91e22ddfe'],
    },
    {
      id: 'section-6',
      name: 'Financing and Negotiation',
      selector: '#text-5ef4c3c421',
      style: null,
      blocks: ['cards-cta'],
      defaultContent: ['#text-5ef4c3c421', '#text-e1072221a1'],
    },
    {
      id: 'section-7',
      name: 'Insurance and Final CTA',
      selector: '#text-7d60034ced',
      style: null,
      blocks: ['cards-cta'],
      defaultContent: ['#text-7d60034ced'],
    },
    {
      id: 'section-8',
      name: 'Disclaimer',
      selector: '.cmp-source-and-disclaimer',
      style: null,
      blocks: [],
      defaultContent: ['.cmp-source-and-disclaimer'],
    },
    {
      id: 'section-9',
      name: 'Related Articles',
      selector: '.cmp-dynamic-card-list',
      style: 'grey',
      blocks: ['cards-article'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  aaaCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [aaaSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
