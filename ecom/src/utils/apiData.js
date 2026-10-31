import headerData from "../data/header.json";
import footerData from "../data/footer.json";
import cmsData from "../data/cms.json";
import rawConfig from "../data/config.json";
import productsData from "../data/product.json";
import rawCategoriesData from "../data/productcategory.json";
import blogData from "../data/blog.json";
import rawBlogCategoriesData from "../data/blogcategory.json";
import seoData from "../data/seo.json";
import chatbotData from "../data/chatbot.json";
import supplierData from "../data/supplier.json";
import filterData from "../data/filter.json";
import { slugify } from "./slugify";

export const categoriesData = rawCategoriesData.map((c) => ({
  ...c,
  slug: slugify(c.name),
  image: c.image || c.icon,
}));

export const blogCategoriesData = rawBlogCategoriesData.map((c) => ({
  ...c,
  slug: slugify(c.name),
}));

const norm = (arr, extra = {}) =>
  Array.isArray(arr) ? Object.assign([...arr], arr[0], extra) : arr;

export const header = {
  ...headerData,
  navLinks: headerData.navLinks?.filter((i) => i.ecomOnly !== false),
};

export const configData = {
  ...rawConfig,
  Header: norm(rawConfig.Header, { HeaderSticky: rawConfig.Header?.[0]?.HeaderSticky }),
  HeaderSticky: rawConfig.Header?.[0]?.HeaderSticky ?? rawConfig.HeaderSticky ?? false,
  About: norm(rawConfig.About, { AboutVersion: rawConfig.About?.[0]?.AboutVersion }),
  Footer: norm(rawConfig.Footer, {
    FooterVersion: rawConfig.Footer?.[0]?.FooterVersion,
    FooterSocial: rawConfig.Footer?.[0]?.FooterSocial,
    FooterTopBar: rawConfig.Footer?.[0]?.FooterTopBar,
    FooterBottomBar: rawConfig.Footer?.[0]?.FooterBottomBar,
  }),
};

export const cmsMap = (Array.isArray(cmsData) ? cmsData : []).reduce(
  (acc, curr) => {
    if (curr?.section) {
      acc[curr.section] = curr;
      if (curr.section === "HeroBanner") acc.HeroSections = curr;
      if (curr.section === "AboutSection") acc.AboutSections = curr;
    }
    return acc;
  },
  typeof cmsData === "object" && !Array.isArray(cmsData) ? { ...cmsData } : {}
);

export const {
  HeroSections: heroCMS,
  AboutSections: aboutCMS,
  ServiceSection: serviceCMS,
  FeedSection: feedCMS,
  BlogSection: blogCMS,
  PatchSection: patchCMS,
} = cmsMap;

export {
  headerData,
  footerData as footer,
  footerData,
  cmsData,
  productsData,
  productsData as products,
  categoriesData as categories,
  blogData,
  blogData as blogs,
  blogCategoriesData as blogCategories,
  seoData,
  seoData as seo,
  seoData as seoConfig,
  chatbotData,
  chatbotData as chatbot,
  supplierData,
  supplierData as supplier,
  filterData,
  filterData as filter,
};

export default {
  header,
  footer: footerData,
  cmsData,
  cmsMap,
  configData,
  productsData,
  categoriesData,
  blogData,
  blogCategoriesData,
  seoData,
  chatbotData,
  supplierData,
  filterData,
};
