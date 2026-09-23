import React from 'react';
import Banner from '../../components/layout/generic/Banner';
import Enquiry from './sections/Enquiry';
import PatchSection from '../home/sections/agency/PatchSection';
import SEO from '../../seo';
import bannerImg from '../../assets/about-banner.jpg';

const Connect = () => {
    return (
        <>
            <SEO page="connect" />
            <Banner
                title="Connect Us"
                desc="Get In Touch With Us"
                bgImage={bannerImg}
                breadcrumbs={[
                    { label: 'Home', path: '/home' },
                    { label: 'Connect Us', path: '/connect' }
                ]}
            />
            <Enquiry />
            <PatchSection />
        </>
    );
};

export default Connect;