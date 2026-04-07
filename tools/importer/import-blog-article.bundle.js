var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-blog-article.js
  var import_blog_article_exports = {};
  __export(import_blog_article_exports, {
    default: () => import_blog_article_default
  });

  // tools/importer/parsers/hero-blog.js
  function parse(element, { document }) {
    const heroImg = element.querySelector(".cmp-blog-detail__hero img, .cmp-image__image");
    const category = element.querySelector(".cmp-blog-detail__category");
    const heading = element.querySelector("h1");
    const authorImg = element.querySelector(".cmp-blog-detail__author-img img");
    const authorName = element.querySelector(".cmp-blog-detail__author-name");
    const dateEl = element.querySelector("time");
    const readTime = element.querySelector(".cmp-blog-detail__author-text-info span:last-child");
    const contentCell = [];
    if (category) {
      const categoryP = document.createElement("p");
      categoryP.textContent = category.textContent.trim();
      contentCell.push(categoryP);
    }
    if (heading) {
      contentCell.push(heading);
    }
    const authorInfo = document.createElement("p");
    const parts = [];
    if (authorName) parts.push(authorName.textContent.trim());
    if (dateEl) parts.push(dateEl.textContent.trim());
    if (readTime) parts.push(readTime.textContent.trim());
    authorInfo.textContent = parts.join(" | ");
    if (parts.length > 0) contentCell.push(authorInfo);
    const cells = [];
    if (heroImg) {
      cells.push([heroImg]);
    }
    cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-blog", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-cta.js
  function parse2(element, { document }) {
    const cells = [];
    const eyebrow = element.querySelector(".cmp-end-cta__eyebrow");
    const title = element.querySelector(".cmp-end-cta__title");
    const description = element.querySelector(".cmp-end-cta__description");
    const inlineDesc = element.querySelector(".cmp-end-cta__inline-description");
    const ctaLink = element.querySelector('a.cmp-button, a[class*="button"]');
    const contentCell = [];
    if (eyebrow) {
      const eyebrowP = document.createElement("p");
      eyebrowP.textContent = eyebrow.textContent.trim();
      contentCell.push(eyebrowP);
    }
    if (title) {
      const h3 = document.createElement("h3");
      h3.textContent = title.textContent.trim();
      contentCell.push(h3);
    }
    if (description) {
      const descP = description.querySelector("p") || description;
      contentCell.push(descP);
    } else if (inlineDesc) {
      const descP = inlineDesc.querySelector("p") || inlineDesc;
      contentCell.push(descP);
    }
    if (ctaLink) {
      const link = document.createElement("a");
      link.href = ctaLink.href;
      link.textContent = ctaLink.textContent.trim().replace(/\u200D/g, "");
      const p = document.createElement("p");
      p.append(link);
      contentCell.push(p);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse3(element, { document }) {
    const cells = [];
    const items = element.querySelectorAll(".cmp-dynamic-card-list__item");
    items.forEach((item) => {
      const img = item.querySelector(".cmp-dynamic-card-list__image, img");
      const tag = item.querySelector(".cmp-dynamic-card-list__tag");
      const title = item.querySelector(".cmp-dynamic-card-list__item-title");
      const details = item.querySelector(".cmp-dynamic-card-list__item-details");
      const link = item.querySelector("a.cmp-dynamic-card-list__link");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const textCell = [];
      if (tag) {
        const tagP = document.createElement("p");
        tagP.textContent = tag.textContent.trim();
        textCell.push(tagP);
      }
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        textCell.push(h3);
      }
      if (details) {
        const detailsP = document.createElement("p");
        detailsP.textContent = details.textContent.trim();
        textCell.push(detailsP);
      }
      if (link && link.href) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = "Read more";
        const p = document.createElement("p");
        p.append(a);
        textCell.push(p);
      }
      if (imageCell.length > 0 || textCell.length > 0) {
        cells.push([imageCell, textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/aaa-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#popupScreen",
        "#popupScreen1",
        "#popupScreen2",
        "#popupScreenOverlay",
        ".popupScreenOverlay1",
        ".popupScreenOverlay2",
        "#survey"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        ".header",
        ".mega-nav",
        ".cmp-navigation__search",
        ".filter.cmp-filter",
        ".ad-component",
        ".cmp-ad",
        ".blog-sidemenu",
        "iframe",
        "link",
        "noscript"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-cmp-data-layer-enabled");
        el.removeAttribute("data-cmp-link-accessibility-enabled");
        el.removeAttribute("data-cmp-link-accessibility-text");
      });
    }
  }

  // tools/importer/transformers/aaa-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section, reverseIndex) => {
        const isFirst = reverseIndex === sections.length - 1;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.parentNode.insertBefore(sectionMetadataBlock, sectionEl.nextSibling);
        }
        if (!isFirst && sectionEl.previousElementSibling) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      });
    }
  }

  // tools/importer/import-blog-article.js
  var parsers = {
    "hero-blog": parse,
    "cards-cta": parse2,
    "cards-article": parse3
  };
  var PAGE_TEMPLATE = {
    name: "blog-article",
    description: "Blog article page from AAA Connect blogs section covering automotive topics",
    urls: [
      "https://www.acg.aaa.com/connect/blogs/4c/auto/questions-to-ask-when-buying-a-car"
    ],
    blocks: [
      {
        name: "hero-blog",
        instances: [".cmp-blog-detail__container"]
      },
      {
        name: "cards-cta",
        instances: [".end-cta-component .cmp-end-cta"]
      },
      {
        name: "cards-article",
        instances: [".cmp-dynamic-card-list"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Blog Header",
        selector: ".cmp-blog-detail",
        style: null,
        blocks: ["hero-blog"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Article Overview",
        selector: "#text-33a7b9e875",
        style: null,
        blocks: [],
        defaultContent: ["#text-33a7b9e875", "#image-4a07a8e827"]
      },
      {
        id: "section-3",
        name: "Quick Checklist",
        selector: "#text-9992830db9",
        style: null,
        blocks: [],
        defaultContent: ["#text-9992830db9"]
      },
      {
        id: "section-4",
        name: "Used Car Questions",
        selector: "#text-0c52d8be41",
        style: null,
        blocks: ["cards-cta"],
        defaultContent: ["#text-0c52d8be41"]
      },
      {
        id: "section-5",
        name: "New Car Questions",
        selector: "#text-a82f85e025",
        style: null,
        blocks: [],
        defaultContent: ["#text-a82f85e025", "#image-c91e22ddfe"]
      },
      {
        id: "section-6",
        name: "Financing and Negotiation",
        selector: "#text-5ef4c3c421",
        style: null,
        blocks: ["cards-cta"],
        defaultContent: ["#text-5ef4c3c421", "#text-e1072221a1"]
      },
      {
        id: "section-7",
        name: "Insurance and Final CTA",
        selector: "#text-7d60034ced",
        style: null,
        blocks: ["cards-cta"],
        defaultContent: ["#text-7d60034ced"]
      },
      {
        id: "section-8",
        name: "Disclaimer",
        selector: ".cmp-source-and-disclaimer",
        style: null,
        blocks: [],
        defaultContent: [".cmp-source-and-disclaimer"]
      },
      {
        id: "section-9",
        name: "Related Articles",
        selector: ".cmp-dynamic-card-list",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_blog_article_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_blog_article_exports);
})();
