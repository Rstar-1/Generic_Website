import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import MediaSection from './sections/MediaSection';
import SEO from '../../seo';
import bannerImg from '../../assets/about-banner.jpg';

const Blog = () => {
    return (
        <>
            <SEO page="blog" />
            <Banner
                title="News & Articles"
                desc="News & Media"
                bgImage={bannerImg}
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