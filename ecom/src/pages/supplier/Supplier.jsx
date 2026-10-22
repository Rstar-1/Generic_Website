import React, { lazy, Suspense, memo, useCallback } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { SectionFallback } from '../../utils/utils';

const DetailSection = lazy(() => import('./sections/DetailSection'));
const FeatureSection = lazy(() => import('../home/sections/FeatureSection'));
const OfferSection = lazy(() => import('../home/sections/OfferSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBanner = resolveImagePath('Patch1.jpg');
const supplierBanner = resolveImagePath('Banner.jpg');

const supplierSections = [
    {
        id: 'detail',
        Component: DetailSection,
        minHeight: '500px',
        isContainer: true,
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
        isContainer: true
    },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBanner})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'Find A Store', path: '/supplier' }
];

const Supplier = () => {
    const renderSection = useCallback(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
        const fallback = <SectionFallback minHeight={minHeight} />;
        const SectionContent = (
            <Suspense fallback={fallback}>
                <Component />
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
                title="Find A Store"
                desc="Authorized Suppliers & Store Locations"
                breadcrumbs={BREADCRUMBS}
                image={supplierBanner}
                version="1"
            />
            {supplierSections.map(renderSection)}
        </>
    );
};

export default memo(Supplier);