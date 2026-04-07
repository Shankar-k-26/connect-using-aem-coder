/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article. Base: cards (with images).
 * Source: https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car
 * Extracts: related article cards from .cmp-dynamic-card-list.
 * Each card has: image, category tag, title, author + read time.
 * Target structure: Cards - 2 columns per row (image | text content).
 */
export default function parse(element, { document }) {
  const cells = [];

  // Find all card items
  const items = element.querySelectorAll('.cmp-dynamic-card-list__item');

  items.forEach((item) => {
    const img = item.querySelector('.cmp-dynamic-card-list__image, img');
    const tag = item.querySelector('.cmp-dynamic-card-list__tag');
    const title = item.querySelector('.cmp-dynamic-card-list__item-title');
    const details = item.querySelector('.cmp-dynamic-card-list__item-details');
    const link = item.querySelector('a.cmp-dynamic-card-list__link');

    // Column 1: image
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Column 2: text content (tag + title + details as a link)
    const textCell = [];

    if (tag) {
      const tagP = document.createElement('p');
      tagP.textContent = tag.textContent.trim();
      textCell.push(tagP);
    }

    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textCell.push(h3);
    }

    if (details) {
      const detailsP = document.createElement('p');
      detailsP.textContent = details.textContent.trim();
      textCell.push(detailsP);
    }

    if (link && link.href) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'Read more';
      const p = document.createElement('p');
      p.append(a);
      textCell.push(p);
    }

    if (imageCell.length > 0 || textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
