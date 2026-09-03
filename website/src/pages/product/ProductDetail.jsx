import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import DetailSection from './sections/DetailSection';

const ProductDetail = () => {
    return (
        <>
            <Banner
                title="Product Detail"
                desc="Arc Chair Limited"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Products', path: '/products' },
                    { label: 'Arc Chair Limited', path: '/product-detail' }
                ]}
            />
            <DetailSection />
        </>
    );
};

export default ProductDetail;