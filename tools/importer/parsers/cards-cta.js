/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-cta. Base: cards (no images variant).
 * Source: https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car
 * Extracts: CTA text (from h4/h3/p) and button link (from a.cmp-button).
 * Some instances have eyebrow + title + description + button (prominent CTA).
 * Target structure: Cards (no images) - 1 column, each row = text content.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Check for prominent CTA variant (has eyebrow + title + description)
  const eyebrow = element.querySelector('.cmp-end-cta__eyebrow');
  const title = element.querySelector('.cmp-end-cta__title');
  const description = element.querySelector('.cmp-end-cta__description');
  const inlineDesc = element.querySelector('.cmp-end-cta__inline-description');
  const ctaLink = element.querySelector('a.cmp-button, a[class*="button"]');

  const contentCell = [];

  if (eyebrow) {
    const eyebrowP = document.createElement('p');
    eyebrowP.textContent = eyebrow.textContent.trim();
    contentCell.push(eyebrowP);
  }

  if (title) {
    const h3 = document.createElement('h3');
    h3.textContent = title.textContent.trim();
    contentCell.push(h3);
  }

  if (description) {
    const descP = description.querySelector('p') || description;
    contentCell.push(descP);
  } else if (inlineDesc) {
    // Inline CTA: text is in h4.cmp-end-cta__inline-description > p
    const descP = inlineDesc.querySelector('p') || inlineDesc;
    contentCell.push(descP);
  }

  if (ctaLink) {
    const link = document.createElement('a');
    link.href = ctaLink.href;
    link.textContent = ctaLink.textContent.trim().replace(/\u200D/g, '');
    const p = document.createElement('p');
    p.append(link);
    contentCell.push(p);
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-cta', cells });
  element.replaceWith(block);
}
