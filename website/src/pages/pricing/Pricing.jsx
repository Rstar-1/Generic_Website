import React, { lazy, Suspense } from 'react';
import Banner from '../../components/layout/generic/Banner';
import Loader from '../../components/common/generic/Loader';

const PriceSection = lazy(() => import('./sections/PriceSection'));
const FeatureSections = lazy(() => import('../home/sections/FeatureSections'));

const Pricing = () => {
    return (
        <>
            <Banner
                title="Pricing Plan"
                desc="Flexible Pricing for Your Business Growth"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Pricing', path: '/pricing' }
                ]}
            />
            <Suspense fallback={<Loader />}>
                <PriceSection />
                <FeatureSections />
            </Suspense>
        </>
    );
};

export default Pricing;
