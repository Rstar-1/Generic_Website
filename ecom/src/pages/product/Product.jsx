import React from 'react';

import Container from '../../components/common/Container';

import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';

import {
  resolveImagePath,
  getStickyTop,
  getCmsData,
  cmsMap
} from '../../utils';

import FilterSection from './sections/FilterSection';
import PatchSection from '../home/sections/PatchSection';

const patchBannerBg = resolveImagePath('Patch1.jpg');
const productBannerBg = resolveImagePath('Banner.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    ProdB001: bannerTitle,
    ProdB002: bannerDesc,
    ProdB003: bannerBgImage,
} = getSectionCms("ProductBanner");

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

const bannerBg = resolveImagePath(bannerBgImage?.url || productBannerBg);

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/product' }
];

const Product = () => {
    const stickyTop = React.useMemo(() => getStickyTop(), []);

    return (
        <>
            <SEO page="product" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || "Products Collection"}
                desc={bannerDesc || "Products"}
                breadcrumbs={BREADCRUMBS}
                bgImage={bannerBg}
            />
            <Container>
                <FilterSection stickyTop={stickyTop} />
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

export default React.memo(Product);
