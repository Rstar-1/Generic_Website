import React, { lazy, Suspense } from 'react';
import Loader from '../../components/common/generic/Loader';

const HeroBanner = lazy(() => import('./sections/HeroBanner'));
const CategorySection = lazy(() => import('./sections/CategorySection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const FeatureSection = lazy(() => import('./sections/FeatureSection'));
const OfferSection = lazy(() => import('./sections/OfferSection'));
const PatchSection = lazy(() => import('./sections/PatchSection'));
const ServiceSection = lazy(() => import('./sections/ServiceSection'));
const TrendingSection = lazy(() => import('./sections/TrendingSection'));
const AboutSections = lazy(() => import('./sections/AboutSections'));
const BlogSection = lazy(() => import('./sections/BlogSection'));
const FeedSection = lazy(() => import('./sections/FeedSection'));
const MarqueeSection = lazy(() => import('./sections/MarqueeSection'));
const FeatureSections = lazy(() => import('./sections/FeatureSections'));
const HeroSections = lazy(() => import('./sections/HeroSections'));

const ecomSections = [
    HeroBanner,
    CategorySection,
    FeatureSection,
    TrendingSection,
    AboutSection,
    ServiceSection,
    PatchSection,
    OfferSection,
];

const standardSections = [
    HeroSections,
    AboutSections,
    // MarqueeSection,
    ServiceSection,
    FeedSection,
    BlogSection,
    PatchSection,
    // FeatureSections,
];

const Home = () => {
    const isEcom = import.meta.env.VITE_ECOM === 'true';
    const activeSections = isEcom ? ecomSections : standardSections;

    return (
        <Suspense fallback={<Loader />}>
            {activeSections.map((Component, index) => (
                <Component key={index} />
            ))}
        </Suspense>
    );
};

export default Home;