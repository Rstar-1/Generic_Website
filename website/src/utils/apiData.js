import headerData from "../data/header.json";
import footer from "../data/footer.json";
import cmsData from "../data/cms.json";

const isEcom = import.meta.env.VITE_ECOM === 'true';

const header = {
    ...headerData,
    navLinks: headerData.navLinks?.filter(item => item.ecomOnly === undefined || item.ecomOnly === isEcom)
};

export const {
    HeroSections: heroCMS,
    AboutSections: aboutCMS,
    ServiceSection: serviceCMS,
    FeedSection: feedCMS,
    BlogSection: blogCMS,
    PatchSection: patchCMS,
} = cmsData;

export { header, footer, cmsData };
