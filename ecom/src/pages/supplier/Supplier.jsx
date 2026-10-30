import React, { lazy, Suspense, memo, useCallback } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { SectionFallback, getCmsData } from '../../utils/utils';
import { cmsMap } from '../../utils/apiData';

const DetailSection = lazy(() => import('./sections/DetailSection'));
const FeatureSection = lazy(() => import('../home/sections/FeatureSection'));
const OfferSection = lazy(() => import('../home/sections/OfferSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBanner = resolveImagePath('Patch1.jpg');
const supplierBanner = resolveImagePath('Banner.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    Supp001: bannerTitle,
    Supp002: bannerDesc,
    Supp003: bannerBgImage,
} = getSectionCms("SupplierSection");

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
    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBanner})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
};

const bannerBg = resolveImagePath(bannerBgImage?.url || supplierBanner);

const supplierSections = [
    {
        id: 'detail',
        Component: DetailSection,
        minHeight: '500px',
        isContainer: true,
        isEager: true,
    },
    {
        id: 'feature',
        Component: FeatureSection,
        minHeight: '400px',
        isContainer: true,
        containerStyle: { background: 'var(--forth)' }
    },
    {
        id: 'offer',
        Component: OfferSection,
        minHeight: '300px',
        isContainer: true,
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
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: patchBackground,
        props: {
            badge: patchBadge,
            title: patchTitle,
            description: patchDescription,
        },
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'Find A Store', path: '/supplier' }
];

const Supplier = () => {
    const renderSection = useCallback(({ id, Component, props = {}, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
        const fallback = <SectionFallback minHeight={minHeight} />;
        const SectionContent = (
            <Suspense fallback={fallback}>
                <Component {...props} />
            </Suspense>
        );

        const Content = isContainer ? (
            <Container className={containerClass} style={containerStyle}>
                {SectionContent}
            </Container>
        ) : (
            SectionContent
        );

        return isEager ? (
            <React.Fragment key={id}>
                {Content}
            </React.Fragment>
        ) : (
            <LazySection
                key={id}
                placeholderHeight={minHeight}
                placeholder={fallback}
            >
                {Content}
            </LazySection>
        );
    }, []);

    return (
        <>
            <SEO page="supplier" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || "Find A Store"}
                desc={bannerDesc || "Authorized Suppliers & Store Locations"}
                breadcrumbs={BREADCRUMBS}
                image={bannerBg}
                version="1"
            />
            {supplierSections.map(renderSection)}
        </>
    );
};

export default memo(Supplier);