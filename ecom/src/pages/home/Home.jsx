import React from "react";

import Container from "../../components/common/Container";
import SEO from "../../seo";

import { resolveImagePath } from "../../utils/imageResolver";
import { getCmsData } from "../../utils/utils";
import { cmsMap } from "../../utils/apiData";

import HeroBanner from "./sections/HeroBanner";
import CategorySection from "./sections/CategorySection";
import ServiceSection from "./sections/ServiceSection";
import ProductSection from "./sections/ProductSection";
import AboutSection from "./sections/AboutSection";
import PatchSection from "./sections/PatchSection";
import OfferSection from "./sections/OfferSection";

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    Hero001: heroTitle,
    Hero0011: heroSubtitle,
    Hero002: heroDescription,
    Hero003: heroBgImage,
    Hero005: { text: heroBtnText, link: heroBtnLink } = {},
} = getSectionCms("HeroBanner");

const { Cat001: catTag, Cat002: catTitle } =
    getSectionCms("CategorySection");

const {
    Prod001: prodTag,
    Prod002: prodTitle,
    Prod003: { text: prodBtnText, link: prodBtnLink } = {},
} = getSectionCms("ProductSection");

const {
    About001: aboutTitle,
    About002: aboutDescription,
    About003: aboutImage,
    About005: { text: aboutBtnText, link: aboutBtnLink } = {},
} = getSectionCms("AboutSection");

const {
    Serv001: servTag,
    Serv002: servTitle,
    Serv003: servBadges,
    Serv004: servServices,
} = getSectionCms("ServiceSection");

const {
    Offer001: offerTitle,
    Offer002: offerDescription,
    Offer003: offerBannerImage,
    Offer004: { text: offerBtnText, link: offerBtnLink } = {},
    Offer005: offerTrending,
} = getSectionCms("OfferSection");

const {
    Patch001: patchBadge,
    Patch002: patchTitle,
    Patch003: patchDescription,
} = getSectionCms("PatchSection");

const patchBackground = {
    backgroundImage: `linear-gradient(90deg, rgba(10,15,25,.94), rgba(10,15,25,.82) 50%, rgba(10,15,25,.45)), url(${resolveImagePath("Patch1.jpg")})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
};

const ecomSections = [
    {
        id: "hero",
        Component: HeroBanner,
        isContainer: false,
        props: {
            title: heroTitle,
            subtitle: heroSubtitle,
            description: heroDescription,
            bgImage: heroBgImage,
            btnText: heroBtnText,
            btnLink: heroBtnLink,
        },
    },
    {
        id: "category",
        Component: CategorySection,
        props: { tag: catTag, title: catTitle },
    },
    {
        id: "product",
        Component: ProductSection,
        containerStyle: { background: "var(--forth)" },
        props: {
            tag: prodTag,
            title: prodTitle,
            actionText: prodBtnText,
            actionLink: prodBtnLink,
        },
    },
    {
        id: "about",
        Component: AboutSection,
        containerStyle: { background: "var(--forth)" },
        props: {
            title: aboutTitle,
            description: aboutDescription,
            aboutImage,
            btnText: aboutBtnText,
            btnLink: aboutBtnLink,
        },
    },
    {
        id: "feature",
        Component: ServiceSection,
        containerStyle: { background: "var(--forth)" },
        props: {
            tag: servTag,
            title: servTitle,
            rawBadges: servBadges,
            rawServices: servServices,
        },
    },
    {
        id: "offer",
        Component: OfferSection,
        props: {
            title: offerTitle,
            description: offerDescription,
            bannerImage: offerBannerImage,
            btnText: offerBtnText,
            btnLink: offerBtnLink,
            rawTrending: offerTrending,
        },
    },
    {
        id: "patch",
        Component: PatchSection,
        containerClass: "relative z-10",
        containerStyle: patchBackground,
        props: {
            badge: patchBadge,
            title: patchTitle,
            description: patchDescription,
        },
    },
];

const Home = () => (
    <>
        <SEO page="home" />

        {ecomSections.map(({
            id,
            Component,
            props = {},
            isContainer = true,
            containerClass,
            containerStyle,
        }) => {
            const section = <Component {...props} />;
            return isContainer ? (
                <Container key={id} className={containerClass} style={containerStyle}>
                    {section}
                </Container>
            ) : (
                <React.Fragment key={id}>{section}</React.Fragment>
            );
        })}
    </>
);

export default React.memo(Home);
