/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: AAA Connect cleanup.
 * Selectors from captured DOM of https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove popup/overlay screens that may block parsing
    // Found in captured HTML: <div class="popupScreen" id="popupScreen">, <div class="popupScreenOverlay" id="popupScreenOverlay">
    WebImporter.DOMUtils.remove(element, [
      '#popupScreen', '#popupScreen1', '#popupScreen2',
      '#popupScreenOverlay', '.popupScreenOverlay1', '.popupScreenOverlay2',
      '#survey',
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome
    // Found in captured HTML: <header id="desktop-menu-main">, <footer>, .header, .mega-nav
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      '.header',
      '.mega-nav',
      '.cmp-navigation__search',
      '.filter.cmp-filter',
      '.ad-component',
      '.cmp-ad',
      '.blog-sidemenu',
      'iframe',
      'link',
      'noscript',
    ]);

    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-cmp-data-layer-enabled');
      el.removeAttribute('data-cmp-link-accessibility-enabled');
      el.removeAttribute('data-cmp-link-accessibility-text');
    });
  }
}
