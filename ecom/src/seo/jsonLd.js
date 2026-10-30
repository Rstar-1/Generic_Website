import seoConfig from "./seoConfig.js";

export function organizationJsonLd() {
  const { address = {}, geo = {}, phone, email } = seoConfig.siteInfo;
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${seoConfig.siteUrl}/#organization`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: new URL(seoConfig.defaultImage, seoConfig.siteUrl).href,
    image: new URL(seoConfig.defaultImage, seoConfig.siteUrl).href,
    description: seoConfig.defaultDescription,
    telephone: phone || undefined,
    email: email || undefined,
    address:
      address.streetAddress || address.fullAddress
        ? {
            "@type": "PostalAddress",
            streetAddress: address.streetAddress || address.fullAddress,
            addressLocality: address.addressLocality,
            addressRegion: address.addressRegion,
            postalCode: address.postalCode,
            addressCountry: address.addressCountry || "IN",
          }
        : undefined,
    geo:
      geo.latitude && geo.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          }
        : undefined,
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${seoConfig.siteUrl}/#website`,
    url: seoConfig.siteUrl,
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    publisher: { "@id": `${seoConfig.siteUrl}/#organization` },
  };
}

export function productJsonLd(product) {
  if (!product) return null;
  const title = product.title || product.name;
  const price = product.price;
  if (!title || price === undefined || price === null || price === "") return null;

  const id = product.id || product.slug || "product";
  const rawImage =
    (Array.isArray(product.images) && product.images[0]) || product.image;
  const stock =
    typeof product.stock === "number"
      ? product.stock
      : product.inStock === false
      ? 0
      : product.stockCount ?? 10;
  const brand = product.brand || product.vendor || seoConfig.siteName;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: product.description || product.desc || "",
    image: rawImage ? new URL(rawImage, seoConfig.siteUrl).href : undefined,
    sku: product.sku || `SKU-${id}`,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    offers: {
      "@type": "Offer",
      url: new URL(`/product/${id}`, seoConfig.siteUrl).href,
      price: String(price),
      priceCurrency: product.currency || "INR",
      availability:
        stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };
}

export function breadcrumbJsonLd(breadcrumbs = []) {
  if (!breadcrumbs || breadcrumbs.length <= 1) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label || crumb.name,
      item: new URL(crumb.path || "/", seoConfig.siteUrl).href,
    })),
  };
}

export function faqJsonLd(faqs = []) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function buildGraphJsonLd({
  meta = {},
  product,
  breadcrumbs,
  faqs,
  jsonLd,
} = {}) {
  if (jsonLd) return jsonLd;

  const canonicalUrl = meta.canonical || seoConfig.siteUrl;
  const graph = [
    websiteJsonLd(),
    organizationJsonLd(),
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: meta.title || seoConfig.defaultTitle,
      description: meta.description || seoConfig.defaultDescription,
      isPartOf: { "@id": `${seoConfig.siteUrl}/#website` },
    },
  ];

  const breadcrumbObj = breadcrumbJsonLd(breadcrumbs || meta.breadcrumbs);
  if (breadcrumbObj) graph.push(breadcrumbObj);

  const faqObj = faqJsonLd(faqs || meta.faqs);
  if (faqObj) graph.push(faqObj);

  const productObj = productJsonLd(product || meta.product);
  if (productObj) {
    const { "@context": _, ...rest } = productObj;
    graph.push(rest);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph.filter(Boolean),
  };
}

export default {
  organizationJsonLd,
  websiteJsonLd,
  productJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  buildGraphJsonLd,
};
