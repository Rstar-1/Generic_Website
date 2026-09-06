import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';

const ServiceDetailSection = lazy(() => import('./sections/ServiceDetailSection'));
const FeatureSections = lazy(() => import('../home/sections/FeatureSections'));
const FeedSection = lazy(() => import('../home/sections/FeedSection'));

const Service = () => {
    return (
        <>
            <Banner
                title="Our Services"
                desc="What We Offer"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Services', path: '/service' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                <ServiceDetailSection />
                <FeedSection />
                <FeatureSections />
            </Suspense>
        </>
    );
};

export default Service;
