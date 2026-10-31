import seoConfig, { getPageSeo, getImageUrl } from "./seoConfig.js";

export function buildMetadata({
  title,
  description,
  keywords,
  path = "/",
  image,
  noindex = false,
  robots: customRobots,
  type = "website",
  page,
  product,
  breadcrumbs,
  faqs,
} = {}) {
  const cleanPath = `/${path}`.replace(/\/+/g, "/");
  const defaults = getPageSeo(page || cleanPath) || {};

  const canonical =
    cleanPath === "/"
      ? `${seoConfig.siteUrl}/`
      : new URL(cleanPath, seoConfig.siteUrl).href;

  let finalTitle = title || defaults.title || seoConfig.defaultTitle;
  if (
    title &&
    !finalTitle.toLowerCase().includes(seoConfig.siteName.toLowerCase())
  ) {
    finalTitle = `${title} | ${seoConfig.siteName}`;
  }

  return {
    title: finalTitle,
    description:
      description || defaults.description || seoConfig.defaultDescription,
    keywords: keywords || defaults.keywords || seoConfig.defaultKeywords,
    canonical,
    image: getImageUrl(
      image ??
        defaults.image ??
        (product?.images && product.images[0]) ??
        product?.image
    ),
    robots: noindex
      ? "noindex, nofollow"
      : customRobots ||
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    type,
    siteName: seoConfig.siteName,
    language: seoConfig.language,
    path: cleanPath,
    breadcrumbs: breadcrumbs ||
      defaults.breadcrumbs || [
        { label: "Home", path: "/" },
        ...(cleanPath !== "/" && cleanPath !== "/home"
          ? [{ label: finalTitle.split("|")[0].trim(), path: cleanPath }]
          : []),
      ],
    faqs:
      faqs ||
      defaults.faqs ||
      (cleanPath.includes("faq") || page === "faq" || page === "home"
        ? seoConfig.faqs
        : []),
    product,
  };
}

export default buildMetadata;
