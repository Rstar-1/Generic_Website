import React from "react";

import LazySection from "../../components/common/LazySection";
import Container from "../../components/common/Container";

import SEO from "../../seo";

import { resolveImagePath } from "../../utils/imageResolver";

const carpetPatchBanner = resolveImagePath("products/carpet_patch_banner.jpg");

const HeroBanner = React.lazy(() => import("./sections/HeroBanner"));
const CategorySection = React.lazy(() => import("./sections/CategorySection"));
const FeatureSection = React.lazy(() => import("./sections/FeatureSection"));
const ProductSection = React.lazy(() => import("./sections/ProductSection"));
const AboutSection = React.lazy(() => import("./sections/AboutSection"));
const PatchSection = React.lazy(() => import("./sections/PatchSection"));
const OfferSection = React.lazy(() => import("./sections/OfferSection"));

const ecomSections = [
    { id: "hero", Component: HeroBanner, minHeight: "500px", isContainer: false },
    { id: "category", Component: CategorySection, minHeight: "300px" },
    {
        id: "product",
        Component: ProductSection,
        minHeight: "400px",
        containerStyle: { background: "var(--forth)" },
    },
    {
        id: "about",
        Component: AboutSection,
        minHeight: "400px",
        containerStyle: { background: "var(--forth)" },
    },
    {
        id: "patch",
        Component: PatchSection,
        minHeight: "300px",
        containerClass: "relative z-10",
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10,15,25,.94), rgba(10,15,25,.82) 50%, rgba(10,15,25,.45)), url(${carpetPatchBanner})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
        },
    },
    {
        id: "feature",
        Component: FeatureSection,
        minHeight: "400px",
        containerStyle: { background: "var(--forth)" },
    },
    { id: "offer", Component: OfferSection, minHeight: "300px" },
];

const SectionFallback = React.memo(({ minHeight = "100px" }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Home = () => (
    <>
        <SEO page="home" />

        {ecomSections?.map(({
            id,
            Component,
            minHeight,
            isEager = false,
            isContainer = true,
            containerClass,
            containerStyle,
        }) => {
            const fallback = <SectionFallback minHeight={minHeight} />;

            const section = (
                <React.Suspense fallback={fallback}>
                    <Component />
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
                        <LazySection
                            placeholderHeight={minHeight}
                            placeholder={fallback}
                        >
                            {content}
                        </LazySection>
                    )}
                </React.Fragment>
            );
        })}
    </>
);

export default React.memo(Home);