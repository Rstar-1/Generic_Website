import headerData from "../data/header.json";
import footer from "../data/footer.json";
import cmsData from "../data/cms.json";
import rawConfigData from "../data/config.json";
import productsData from "../data/product.json";
import categoriesData from "../data/category.json";
import blogData from "../data/blog.json";

const header = {
    ...headerData,
    navLinks: headerData.navLinks?.filter(item => item.ecomOnly === undefined || item.ecomOnly === true)
};

const configData = {
    ...rawConfigData,
    Header: Array.isArray(rawConfigData.Header)
        ? Object.assign([...rawConfigData.Header], rawConfigData.Header[0], {
            HeaderSticky: rawConfigData.Header[0]?.HeaderSticky
        })
        : rawConfigData.Header,
    HeaderSticky: rawConfigData.Header?.[0]?.HeaderSticky ?? rawConfigData.HeaderSticky ?? false,
    About: Array.isArray(rawConfigData.About)
        ? Object.assign([...rawConfigData.About], rawConfigData.About[0], {
            AboutVersion: rawConfigData.About[0]?.AboutVersion
        })
        : rawConfigData.About,
    Footer: Array.isArray(rawConfigData.Footer)
        ? Object.assign([...rawConfigData.Footer], rawConfigData.Footer[0], {
            FooterVersion: rawConfigData.Footer[0]?.FooterVersion,
            FooterSocial: rawConfigData.Footer[0]?.FooterSocial,
            FooterTopBar: rawConfigData.Footer[0]?.FooterTopBar,
            FooterBottomBar: rawConfigData.Footer[0]?.FooterBottomBar
        })
        : rawConfigData.Footer
};

export const {
    HeroSections: heroCMS,
    AboutSections: aboutCMS,
    ServiceSection: serviceCMS,
    FeedSection: feedCMS,
    BlogSection: blogCMS,
    PatchSection: patchCMS,
} = cmsData;

export {
    header,
    headerData,
    footer,
    footer as footerData,
    cmsData,
    configData,
    productsData,
    productsData as products,
    categoriesData,
    categoriesData as categories,
    blogData,
    blogData as blogs
};

export default {
    header,
    footer,
    cmsData,
    configData,
    productsData,
    categoriesData,
    blogData
};
