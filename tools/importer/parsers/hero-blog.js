/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-blog. Base: hero.
 * Source: https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car
 * Extracts: category tag, h1 title, author info (image, name, date, read time), hero image.
 * Target structure (from block library): Row 1 = image, Row 2 = content (heading, text).
 */
export default function parse(element, { document }) {
  // Extract hero image from .cmp-blog-detail__hero
  const heroImg = element.querySelector('.cmp-blog-detail__hero img, .cmp-image__image');

  // Extract category label
  const category = element.querySelector('.cmp-blog-detail__category');

  // Extract h1 title
  const heading = element.querySelector('h1');

  // Extract author info
  const authorImg = element.querySelector('.cmp-blog-detail__author-img img');
  const authorName = element.querySelector('.cmp-blog-detail__author-name');
  const dateEl = element.querySelector('time');
  const readTime = element.querySelector('.cmp-blog-detail__author-text-info span:last-child');

  // Build content cell: category + heading + author info line
  const contentCell = [];

  if (category) {
    const categoryP = document.createElement('p');
    categoryP.textContent = category.textContent.trim();
    contentCell.push(categoryP);
  }

  if (heading) {
    contentCell.push(heading);
  }

  // Build author info as a paragraph
  const authorInfo = document.createElement('p');
  const parts = [];
  if (authorName) parts.push(authorName.textContent.trim());
  if (dateEl) parts.push(dateEl.textContent.trim());
  if (readTime) parts.push(readTime.textContent.trim());
  authorInfo.textContent = parts.join(' | ');
  if (parts.length > 0) contentCell.push(authorInfo);

  // Build cells: Row 1 = hero image, Row 2 = content
  const cells = [];
  if (heroImg) {
    cells.push([heroImg]);
  }
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-blog', cells });
  element.replaceWith(block);
}
