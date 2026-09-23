import React, { lazy, Suspense, memo } from 'react';
import LazySection from '../../components/common/LazySection';
import SEO from '../../seo';
import HeroSections from './sections/agency/HeroSections';
import ScaleSection from './sections/agency/ScaleSection';

const HeroBanner = lazy(() => import('./sections/ecom/HeroBanner'));
const CategorySection = lazy(() => import('./sections/ecom/CategorySection'));
const FeatureSection = lazy(() => import('./sections/ecom/FeatureSection'));
const OfferSection = lazy(() => import('./sections/ecom/OfferSection'));
const AboutSection = lazy(() => import('./sections/ecom/AboutSection'));
const TrendingSection = lazy(() => import('./sections/ecom/TrendingSection'));
const CompareSection = lazy(() => import('./sections/ecom/CompareSection'));
const AboutSections = lazy(() => import('./sections/agency/AboutSections'));
const PatchSection = lazy(() => import('./sections/agency/PatchSection'));
const ServiceSection = lazy(() => import('./sections/agency/ServiceSection'));
const BlogSection = lazy(() => import('./sections/agency/BlogSection'));
const FeedSection = lazy(() => import('./sections/agency/FeedSection'));

const ecomSections = [
    { Component: HeroBanner, minHeight: '500px' },
    { Component: CategorySection, minHeight: '300px' },
    { Component: FeatureSection, minHeight: '400px' },
    { Component: AboutSection, minHeight: '400px' },
    { Component: CompareSection, minHeight: '300px' },
    { Component: TrendingSection, minHeight: '400px' },
    { Component: OfferSection, minHeight: '300px' }
];

const standardSections = [
    { Component: HeroSections, isEager: true },
    { Component: ScaleSection, isEager: true },
    { Component: AboutSections, minHeight: '400px' },
    { Component: ServiceSection, minHeight: '600px' },
    { Component: FeedSection, minHeight: '400px' },
    { Component: BlogSection, minHeight: '400px' },
    { Component: PatchSection, minHeight: '300px' }
];

const SectionFallback = memo(({ minHeight = '100px' }) => (
    <div className="w-full" style={{ minHeight }} />
));

const Home = () => {
    const isEcom = import.meta.env.VITE_ECOM === 'true';
    const activeSections = isEcom ? ecomSections : standardSections;

    return (
        <main className="w-full">
            <SEO page="home" />
            {activeSections.map(({ Component, isEager, minHeight }, index) => {
                if (isEager) {
                    return <Component key={index} />;
                }
                return (
                    <LazySection
                        key={index}
                        placeholderHeight={minHeight}
                        placeholder={<SectionFallback minHeight={minHeight} />}
                    >
                        <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                            <Component />
                        </Suspense>
                    </LazySection>
                );
            })}
        </main>
    );
};

export default memo(Home);