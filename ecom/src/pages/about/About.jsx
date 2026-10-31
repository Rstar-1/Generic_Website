import React from 'react';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import {
  resolveImagePath,
  getCmsData,
  cmsMap
} from '../../utils';

import DetailSection from './sections/DetailSection';
import OfferSection from '../home/sections/OfferSection';
import FeatureSection from '../home/sections/FeatureSection';
import PatchSection from '../home/sections/PatchSection';

const patchBanner = resolveImagePath('Patch1.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    AboutB001: bannerTitle,
    AboutB002: bannerDesc,
    AboutB003: bannerBgImage,
} = getSectionCms("AboutBanner");

const {
    Detail001: detailBadge,
    Detail002: detailTitle,
    Detail003: detailDescription,
    Detail004: detailShowcaseImage,
    Detail005: detailThumbnails,
} = getSectionCms("DetailSection");

const {
    Offer001: offerTitle,
    Offer002: offerDescription,
    Offer003: offerBannerImage,
    Offer004: { text: offerBtnText, link: offerBtnLink } = {},
    Offer005: offerTrending,
} = getSectionCms("OfferSection");

const {
    Patch001: patchBadge,
    Patch002: patchTitle,
    Patch003: patchDescription,
} = getSectionCms("PatchSection");

const patchBackground = {
    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBanner})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
};

const bannerBg = resolveImagePath(bannerBgImage?.url || 'Banner.jpg');

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' }
];

const About = () => {
    return (
        <>
            <SEO page="about" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || "About Us"}
                desc={bannerDesc || "We Love Finishing What You Start We Love Finishing What You Start"}
                breadcrumbs={BREADCRUMBS}
                image={bannerBg}
                version="1"
            />
            <Container>
                <DetailSection
                    badgeText={detailBadge}
                    title={detailTitle}
                    description={detailDescription}
                    showcaseImage={detailShowcaseImage}
                    rawThumbnails={detailThumbnails}
                />
            </Container>
            <Container style={{ background: 'var(--forth)' }}>
                <FeatureSection />
            </Container>
            <Container>
                <OfferSection
                    title={offerTitle}
                    description={offerDescription}
                    bannerImage={offerBannerImage}
                    btnText={offerBtnText}
                    btnLink={offerBtnLink}
                    rawTrending={offerTrending}
                />
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

export default React.memo(About);
