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
import FeatureSection from '../home/sections/FeatureSection';
import OfferSection from '../home/sections/OfferSection';
import PatchSection from '../home/sections/PatchSection';

const patchBanner = resolveImagePath('Patch1.jpg');
const supplierBanner = resolveImagePath('Banner.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    Supp001: bannerTitle,
    Supp002: bannerDesc,
    Supp003: bannerBgImage,
} = getSectionCms("SupplierSection");

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

const bannerBg = resolveImagePath(bannerBgImage?.url);

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'Find A Store', path: '/supplier' }
];

const Supplier = () => {
    return (
        <>
            <SEO page="supplier" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || "Find A Store"}
                desc={bannerDesc || "Authorized Suppliers & Store Locations"}
                breadcrumbs={BREADCRUMBS}
                image={bannerBg}
                version="1"
            />
            <Container>
                <DetailSection />
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

export default React.memo(Supplier);