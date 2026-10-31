import React from 'react';

import Container from '../../components/common/Container';

import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';

import {
  getCmsData,
  resolveImagePath,
  cmsMap
} from '../../utils';

import Enquiry from './sections/Enquiry';
import PatchSection from '../home/sections/PatchSection';

const patchBannerBg = resolveImagePath('Patch1.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    Conn001: bannerTitle,
    Conn002: bannerDesc,
    Conn003: bannerBgImage,
    Conn004: enquiryTag,
    Conn005: enquirySubtitle,
} = getSectionCms("ConnectSection");

const {
    Patch001: patchBadge,
    Patch002: patchTitle,
    Patch003: patchDescription,
} = getSectionCms("PatchSection");

const patchBackground = {
    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
};

const bannerBg = resolveImagePath(bannerBgImage?.url || 'Banner.jpg');

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'Connect Us', path: '/connect' }
];

const Connect = () => {
    return (
        <>
            <SEO page="connect" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || 'Connect Us'}
                desc={bannerDesc || 'Get In Touch With Us'}
                breadcrumbs={BREADCRUMBS}
                bgImage={bannerBg}
            />
            <Container>
                <Enquiry tag={enquiryTag} subtitle={enquirySubtitle} />
            </Container>
            <Container className="relative z-10" style={patchBackground}>
                <PatchSection
                    badge={patchBadge}
                    title={patchTitle}
                    description={patchDescription}
                />
            </Container>
        </>
    );
};

export default React.memo(Connect);