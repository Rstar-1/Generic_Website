import { seoData as config } from "../utils/apiData";

const env = import.meta.env || {};

export const SITE_NAME = env.VITE_SITE_NAME || config.siteInfo?.name;

export const SITE_URL = (
  env.VITE_SITE_URL ||
  config.siteInfo?.url ||
  ""
).replace(/\/$/, "");

export const DEFAULT_IMAGE = env.VITE_SEO_IMAGE || config.siteInfo?.image || "";

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description: env.VITE_SEO_DESCRIPTION || config.siteInfo?.description || "",
  phone: env.VITE_PHONE || config.siteInfo?.phone || "",
  email: env.VITE_EMAIL || config.siteInfo?.email || "",
  address: {
    ...config.siteInfo?.address,
    ...(env.VITE_ADDRESS || env.VITE_LOCATION
      ? { fullAddress: env.VITE_ADDRESS || env.VITE_LOCATION }
      : {}),
  },
  geo: config.siteInfo?.geo || {},
  sameAs: [
    env.VITE_SOCIAL_INSTAGRAM,
    env.VITE_SOCIAL_YOUTUBE,
    env.VITE_SOCIAL_FACEBOOK,
    env.VITE_SOCIAL_LINKEDIN,
    env.VITE_SOCIAL_WHATSAPP,
  ].filter(Boolean),
};

export const pageSeoData = Object.fromEntries(
  Object.entries(config.pages || {}).map(([key, page]) => [
    key,
    {
      ...page,
      ...(key === "home" && env.VITE_SEO_TITLE
        ? { title: env.VITE_SEO_TITLE }
        : {}),
    },
  ]),
);

export const aeoFAQs = config.faqs || [];

export const getUrl = (path = "/") => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getImageUrl = (image) => getUrl(image || DEFAULT_IMAGE);

const normalizeKey = (key = "") =>
  String(key)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

// Fast normalized aliases for user routes
const aliasMap = {
  home: "home",
  about: "about",
  aboutus: "about",
  blog: "blog",
  blogs: "blog",
  blogdetail: "blogDetail",
  supplier: "supplier",
  suppliers: "supplier",
  connect: "connect",
  connectus: "connect",
  faq: "faq",
  faqs: "faq",
  privacy: "privacy",
  privacypolicy: "privacy",
  terms: "terms",
  termscondition: "terms",
  termsconditions: "terms",
  termsandcondition: "terms",
  termsandconditions: "terms",
  collection: "collection",
  collections: "collection",
  product: "product",
  products: "products",
  productdetail: "productDetail",
  quality: "quality",
};

/**
 * Enhanced helper to resolve page SEO by key, friendly title, or route path
 */
export const getPageSeo = (identifier = "") => {
  if (!identifier) return pageSeoData.home || {};
  if (pageSeoData[identifier]) return pageSeoData[identifier];

  const norm = normalizeKey(identifier);
  if (aliasMap[norm] && pageSeoData[aliasMap[norm]]) {
    return pageSeoData[aliasMap[norm]];
  }

  const cleanPath = identifier.startsWith("/")
    ? identifier.toLowerCase()
    : `/${identifier}`.toLowerCase();

  return (
    Object.values(pageSeoData).find(
      (p) =>
        p.path?.toLowerCase() === cleanPath ||
        normalizeKey(p.path) === norm ||
        normalizeKey(p.title) === norm,
    ) ||
    pageSeoData.home ||
    {}
  );
};

export { default } from "./SEO";
export { default as SEO } from "./SEO";
