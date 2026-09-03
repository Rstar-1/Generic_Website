import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import MediaSection from './sections/MediaSection';

const Blog = () => {
    return (
        <>
            <Banner
                title="News & Articles"
                desc="News & Media"
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'News & Media', path: '/blog' }
                ]}
            />
            <MediaSection />
        </>
    );
};

export default Blog;