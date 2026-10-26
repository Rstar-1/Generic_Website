import React from "react";

import LazySection from "../../components/common/LazySection";
import Container from "../../components/common/Container";

import SEO from "../../seo";

import { resolveImagePath } from "../../utils/imageResolver";
import { SectionFallback, getCmsData } from "../../utils/utils";
import { cmsMap } from "../../utils/apiData";

const HeroBanner = React.lazy(() => import("./sections/HeroBanner"));
const CategorySection = React.lazy(() => import("./sections/CategorySection"));
const ServiceSection = React.lazy(() => import("./sections/ServiceSection"));
const ProductSection = React.lazy(() => import("./sections/ProductSection"));
const AboutSection = React.lazy(() => import("./sections/AboutSection"));
const PatchSection = React.lazy(() => import("./sections/PatchSection"));
const OfferSection = React.lazy(() => import("./sections/OfferSection"));

const ecomSections = [
    { id: "hero", cmsKey: "HeroBanner", Component: HeroBanner, minHeight: "500px", isContainer: false },
    { id: "category", cmsKey: "CategorySection", Component: CategorySection, minHeight: "300px" },
    { id: "product", cmsKey: "ProductSection", Component: ProductSection, minHeight: "400px", containerStyle: { background: "var(--forth)" } },
    { id: "about", cmsKey: "AboutSection", Component: AboutSection, minHeight: "400px", containerStyle: { background: "var(--forth)" } },
    { id: "feature", cmsKey: "ServiceSection", Component: ServiceSection, minHeight: "400px", containerStyle: { background: "var(--forth)" } },
    { id: "offer", cmsKey: "OfferSection", Component: OfferSection, minHeight: "300px" },
    {
        id: "patch",
        cmsKey: "PatchSection",
        Component: PatchSection,
        minHeight: "300px",
        containerClass: "relative z-10",
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10,15,25,.94), rgba(10,15,25,.82) 50%, rgba(10,15,25,.45)), url(${resolveImagePath("Patch1.jpg")})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
        },
    },
];

const Home = () => (
    <>
        <SEO page="home" />

        {ecomSections.map(({
            id,
            cmsKey,
            Component,
            minHeight,
            isEager = false,
            isContainer = true,
            containerClass,
            containerStyle,
        }) => {
            const fallback = <SectionFallback minHeight={minHeight} />;
            const cms = getCmsData(cmsKey, cmsMap?.[cmsKey]);
            const section = (
                <React.Suspense fallback={fallback}>
                    <Component {...cms} cms={cms} />
                </React.Suspense>
            );

            const content = isContainer ? (
                <Container className={containerClass} style={containerStyle}>
                    {section}
                </Container>
            ) : section;

            return (
                <React.Fragment key={id}>
                    {isEager ? (
                        content
                    ) : (
                        <LazySection placeholderHeight={minHeight} placeholder={fallback}>
                            {content}
                        </LazySection>
                    )}
                </React.Fragment>
            );
        })}
    </>
);

export default React.memo(Home);