import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { buildMetadata } from "./metadata.js";
import { buildGraphJsonLd, productJsonLd } from "./jsonLd.js";

export default function SEO({
  title,
  description,
  keywords,
  path,
  image,
  noindex = false,
  type = "website",
  page,
  product,
  breadcrumbs,
  faqs,
  jsonLd,
}) {
  const location = useLocation();
  const currentPath = path || location?.pathname || "/";

  const meta = useMemo(
    () =>
      buildMetadata({
        title,
        description,
        keywords,
        path: currentPath,
        image,
        noindex,
        type,
        page,
        product,
        breadcrumbs,
        faqs,
      }),
    [
      title,
      description,
      keywords,
      currentPath,
      image,
      noindex,
      type,
      page,
      product,
      breadcrumbs,
      faqs,
    ]
  );

  const finalJsonLd = useMemo(() => {
    if (jsonLd) return jsonLd;
    if (product) return productJsonLd(product);
    return buildGraphJsonLd({ meta, product, breadcrumbs, faqs });
  }, [jsonLd, product, meta, breadcrumbs, faqs]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (meta.title) {
      document.title = meta.title;
    }

    const setMeta = (attribute, key, content) => {
      if (!content) return;
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta("name", "description", meta.description);
    if (meta.keywords) setMeta("name", "keywords", meta.keywords);
    setMeta("name", "robots", meta.robots);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.canonical);
    setMeta("property", "og:image", meta.image);
    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:site_name", meta.siteName);
    setMeta("property", "og:locale", meta.language || "en_US");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.image);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;

    if (finalJsonLd) {
      let script = document.head.querySelector("#site-seo-jsonld");
      if (!script) {
        script = document.createElement("script");
        script.id = "site-seo-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(finalJsonLd).replace(/</g, "\\u003c");
    }
  }, [meta, finalJsonLd]);

  return null;
}
