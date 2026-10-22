import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { SectionFallback } from '../../utils/utils';

const CatSection = lazy(() => import('./sections/CatSection'));
const OfferSection = lazy(() => import('../home/sections/OfferSection'));
const FeatureSection = lazy(() => import('../home/sections/FeatureSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBanner = resolveImagePath('Patch1.jpg');
const catBanner = resolveImagePath('Banner.jpg');

const categorySections = [
    {
        id: 'category',
        Component: CatSection,
        minHeight: '400px',
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
    { label: 'Category', path: '/category' }
];

const Category = () => {
    return (
        <>
            <SEO page="collection" breadcrumbs={BREADCRUMBS} />
            <Banner
                title="Categories"
                desc="Explore Our Wide Range of Products"
                breadcrumbs={BREADCRUMBS}
                image={catBanner}
                version="1"
            />
            {categorySections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
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
                        placeholder={<SectionFallback minHeight={minHeight} />}
                    >
                        {Content}
                    </LazySection>
                );
            })}
        </>
    );
};

export default memo(Category);