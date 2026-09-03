import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import MediaDetailSection from './sections/MediaDetailSection';

const BlogDetail = () => {
    return (
        <>
            <Banner
                title="Blog Detail"
                desc="Blog Details"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Blog', path: '/blog' },
                    { label: 'Blog Detail', path: '/blog-detail' }
                ]}
            />
            <MediaDetailSection />
        </>
    );
};

export default BlogDetail;