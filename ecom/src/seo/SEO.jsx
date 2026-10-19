import React, { useEffect, useMemo } from "react";
import {
  getPageSeo,
  aeoFAQs,
  siteInfo,
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  getUrl,
  getImageUrl,
} from "./seoConfig";

const upsertTag = (selector, tagName, attrs) => {
  if (typeof document === "undefined") return null;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(tagName);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, val]) => {
    if (val !== undefined && val !== null) el.setAttribute(key, val);
  });
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
  robots: customRobots,
}) => {
  const currentPath =
    customPath ||
    (typeof window !== "undefined" ? window.location.pathname : "");

  const config = useMemo(
    () => getPageSeo(page || currentPath),
    [page, currentPath],
  );

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

  const pagePath =
    customPath ||
    config.path ||
    (page ? `/${page}` : currentPath || "/");

  const canonicalUrl = getUrl(pagePath);
  const imageUrl = getImageUrl(customImage || config.image || DEFAULT_IMAGE);
  const robots =
    customRobots ||
    import.meta.env.VITE_SEO_ROBOTS ||
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) document.title = title;

    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "robots", content: robots },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: type },
      { property: "og:image", content: imageUrl },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ];

    metaTags.forEach(({ name, property, content }) => {
      if (!content) return;
      const key = name ? "name" : "property";
      const val = name || property;
      upsertTag(`meta[${key}="${val}"]`, "meta", { [key]: val, content });
    });

    if (canonicalUrl) {
      upsertTag('link[rel="canonical"]', "link", {
        rel: "canonical",
        href: canonicalUrl,
      });
    }

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

    const activeBreadcrumbs =
      breadcrumbs ||
      config.breadcrumbs || [
        { label: "Home", path: "/home" },
        ...(pagePath && pagePath !== "/" && pagePath !== "/home"
          ? [{ label: title.split("|")[0].trim(), path: pagePath }]
          : []),
      ];

    if (activeBreadcrumbs?.length > 1) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: activeBreadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          item: getUrl(crumb.path),
        })),
      });
    }

    const isFaqPage =
      page === "faq" ||
      page === "faqs" ||
      pagePath?.includes("faq") ||
      page === "home" ||
      !page;
    const activeFaqs = faqs || (isFaqPage ? config.faqs || aeoFAQs : []);

    if (activeFaqs?.length > 0) {
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

    const script = upsertTag("#site-seo-jsonld", "script", {
      id: "site-seo-jsonld",
      type: "application/ld+json",
    });
    if (script) {
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": graph.filter(Boolean),
      });
    }
  }, [
    title,
    description,
    keywords,
    canonicalUrl,
    imageUrl,
    type,
    robots,
    faqs,
    page,
    breadcrumbs,
    config,
    pagePath,
  ]);

  return null;
};

export default React.memo(SEO);
