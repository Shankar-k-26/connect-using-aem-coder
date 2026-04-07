/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AAA Connect section breaks and section-metadata.
 * Runs in afterTransform only. Uses payload.template.sections from page-templates.json.
 * Selectors from captured DOM of https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid shifting DOM positions
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section, reverseIndex) => {
      const isFirst = reverseIndex === sections.length - 1;

      // Find the first element matching the section selector
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });

        // Insert section-metadata after the section's last related element
        sectionEl.parentNode.insertBefore(sectionMetadataBlock, sectionEl.nextSibling);
      }

      // Add <hr> section break before non-first sections (only if there's content before)
      if (!isFirst && sectionEl.previousElementSibling) {
        const hr = document.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    });
  }
}
