import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';

const DetailSection = lazy(() => import('./sections/DetailSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));
const OfferSection = lazy(() => import('../home/sections/OfferSection'));
const FeedSection = lazy(() => import('../home/sections/FeedSection'));
const FeatureSections = lazy(() => import('../home/sections/FeatureSections'));

const ecomSections = [
    DetailSection,
    PatchSection,
    OfferSection,
];

const standardSections = [
    DetailSection,
    PatchSection,
    FeedSection,
    FeatureSections
];

const About = () => {
    const isEcom = import.meta.env.VITE_ECOM === 'true';
    const activeSections = isEcom ? ecomSections : standardSections;

    return (
        <>
            <Banner
                title="About Us"
                desc="About Our Story"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'About Us', path: '/about' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                {activeSections.map((Component, index) => (
                    <Component key={index} />
                ))}
            </Suspense>
        </>
    );
};

export default About;