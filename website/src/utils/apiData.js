import headerData from "../data/header.json";
import footer from "../data/footer.json";

const isEcom = import.meta.env.VITE_ECOM === 'true';

const header = {
    ...headerData,
    navLinks: headerData.navLinks?.filter(item => item.ecomOnly === undefined || item.ecomOnly === isEcom)
};

export { header, footer };
