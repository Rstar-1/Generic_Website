import seoData from "../data/seo.json";

const { siteInfo = {}, pages = {}, faqs = [] } = seoData;

export const SITE_NAME = siteInfo.name;
export const SITE_URL = siteInfo.url.replace(/\/+$/, "");
export const DEFAULT_IMAGE = siteInfo.image;

export const aeoFAQs = faqs;
export const pageSeoData = pages;

export const getUrl = (path = "/") => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getImageUrl = (image) =>
  image ? getUrl(image) : getUrl(DEFAULT_IMAGE);

// Direct canonical route & key resolver
export const getPageSeo = (identifier = "") => {
  const norm = String(identifier)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  if (!norm || norm === "home") return pageSeoData.home || {};
  if (pageSeoData[identifier]) return pageSeoData[identifier];

  const clean = identifier.startsWith("/")
    ? identifier.toLowerCase()
    : `/${identifier}`.toLowerCase();

  // Dynamic route prefix matching
  if (clean.startsWith("/product/"))
    return pageSeoData.productDetail || pageSeoData.product || {};
  if (clean.startsWith("/blog/"))
    return pageSeoData.blogDetail || pageSeoData.blog || {};
  if (clean.startsWith("/supplier/")) return pageSeoData.supplier || {};

  return (
    Object.values(pageSeoData).find(
      (p) =>
        p.path?.toLowerCase() === clean ||
        String(p.path).replace(/[^a-z0-9]/g, "") === norm,
    ) ||
    pageSeoData.home ||
    {}
  );
};

const seoConfig = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultTitle: pageSeoData.home?.title || SITE_NAME,
  defaultDescription:
    pageSeoData.home?.description || siteInfo.description || "",
  defaultKeywords: pageSeoData.home?.keywords || "",
  defaultImage: DEFAULT_IMAGE,
  language: "en_IN",
  siteInfo,
  pages: pageSeoData,
  faqs: aeoFAQs,
};

export { siteInfo, seoConfig };
export default seoConfig;
