import { seoData as config } from "../utils/apiData";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || "";
export const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "";

export const siteInfo = {
  ...config.siteInfo,
  name: SITE_NAME,
  url: SITE_URL,
  description: import.meta.env.VITE_SEO_DESCRIPTION,
  phone: import.meta.env.VITE_PHONE,
  email: import.meta.env.VITE_EMAIL,
  address: {
    ...config.siteInfo.address,
    fullAddress: import.meta.env.VITE_ADDRESS,
  },
  geo: config.siteInfo.geo,
  sameAs: [
    import.meta.env.VITE_SOCIAL_INSTAGRAM,
    import.meta.env.VITE_SOCIAL_YOUTUBE,
    import.meta.env.VITE_SOCIAL_FACEBOOK,
    import.meta.env.VITE_SOCIAL_LINKEDIN,
  ].filter(Boolean),
};

export const pageSeoData = Object.fromEntries(
  Object.entries(config.pages).map(([key, page]) => [
    key,
    {
      ...page,
      ...(key === "home" && {
        title: import.meta.env.VITE_SEO_TITLE || page.title,
      }),
    },
  ]),
);

export const aeoFAQs = config.faqs;

export const getUrl = (path = "/") =>
  /^https?:\/\//i.test(path)
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const getImageUrl = (image) => getUrl(image || DEFAULT_IMAGE);

export { default } from "./SEO";
export { default as SEO } from "./SEO";
