import React, { useEffect } from "react";
import {
  pageSeoData,
  aeoFAQs,
  siteInfo,
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  getUrl,
  getImageUrl,
} from "./seoConfig";

const updateTag = (selector, createTag, updateAttr) => {
  let el = document.querySelector(selector);
  if (!el) {
    el = createTag();
    document.head.appendChild(el);
  }
  updateAttr(el);
  return el;
};

const SEO = ({
  page,
  title: customTitle,
  description: customDesc,
  keywords: customKeywords,
  image: customImage,
  path: customPath,
  type = "website",
  breadcrumbs,
  faqs,
}) => {
  const config = (page && pageSeoData?.[page]) || {};
  const title =
    customTitle ||
    config.title ||
    import.meta.env.VITE_SEO_TITLE ||
    SITE_NAME ||
    "";
  const description =
    customDesc ||
    config.description ||
    siteInfo?.description ||
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "";
  const keywords =
    customKeywords ||
    config.keywords ||
    import.meta.env.VITE_SEO_KEYWORDS ||
    "";
  const pagePath = customPath || config.path || (page ? `/${page}` : "");
  const canonicalUrl = getUrl(pagePath);
  const imageUrl = getImageUrl(customImage || config.image || DEFAULT_IMAGE);

  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // 2. Standard Meta
    if (description) {
      updateTag(
        'meta[name="description"]',
        () => document.createElement("meta"),
        (el) => {
          el.setAttribute("name", "description");
          el.setAttribute("content", description);
        },
      );
    }
    if (keywords) {
      updateTag(
        'meta[name="keywords"]',
        () => document.createElement("meta"),
        (el) => {
          el.setAttribute("name", "keywords");
          el.setAttribute("content", keywords);
        },
      );
    }
    updateTag(
      'meta[name="robots"]',
      () => document.createElement("meta"),
      (el) => {
        el.setAttribute("name", "robots");
        el.setAttribute(
          "content",
          import.meta.env.VITE_SEO_ROBOTS ||
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        );
      },
    );

    // 3. Canonical
    if (canonicalUrl) {
      updateTag(
        'link[rel="canonical"]',
        () => document.createElement("link"),
        (el) => {
          el.setAttribute("rel", "canonical");
          el.setAttribute("href", canonicalUrl);
        },
      );
    }

    // 4. Open Graph (Social Sharing)
    const ogTags = [
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: type },
      { property: "og:image", content: imageUrl },
      { property: "og:locale", content: "en_US" },
    ];
    ogTags.forEach(({ property, content }) => {
      if (content) {
        updateTag(
          `meta[property="${property}"]`,
          () => document.createElement("meta"),
          (el) => {
            el.setAttribute("property", property);
            el.setAttribute("content", content);
          },
        );
      }
    });

    // 5. Twitter Cards
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ];
    twitterTags.forEach(({ name, content }) => {
      if (content) {
        updateTag(
          `meta[name="${name}"]`,
          () => document.createElement("meta"),
          (el) => {
            el.setAttribute("name", name);
            el.setAttribute("content", content);
          },
        );
      }
    });

    // 6. Structured Data (JSON-LD)
    const address = siteInfo?.address || {};
    const geo = siteInfo?.geo || {};

    const graph = [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: siteInfo?.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: imageUrl,
        image: imageUrl,
        description: siteInfo?.description,
        telephone: siteInfo?.phone,
        email: siteInfo?.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: address.streetAddress || address.fullAddress,
          addressLocality: address.addressLocality,
          addressRegion: address.addressRegion,
          postalCode: address.postalCode,
          addressCountry: address.addressCountry || "IN",
        },
        geo:
          geo.latitude && geo.longitude
            ? {
                "@type": "GeoCoordinates",
                latitude: geo.latitude,
                longitude: geo.longitude,
              }
            : undefined,
        sameAs: siteInfo?.sameAs || [],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description: description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ];

    const activeBreadcrumbs = breadcrumbs ||
      config.breadcrumbs || [
        { label: "Home", path: "/" },
        ...(pagePath && pagePath !== "/" && pagePath !== "/home"
          ? [{ label: title.split("|")[0].trim(), path: pagePath }]
          : []),
      ];
    if (activeBreadcrumbs.length > 1) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: activeBreadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.label,
          item: crumb.path.startsWith("http")
            ? crumb.path
            : `${SITE_URL}${crumb.path}`,
        })),
      });
    }

    const activeFaqs = faqs || (page === "home" || !page ? aeoFAQs : []);
    if (activeFaqs && activeFaqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: activeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": graph.filter(Boolean),
    };

    let scriptEl = document.getElementById("site-seo-jsonld");
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "site-seo-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    imageUrl,
    type,
    faqs,
    page,
    breadcrumbs,
    config.breadcrumbs,
    pagePath,
  ]);

  return null;
};

export default React.memo(SEO);
