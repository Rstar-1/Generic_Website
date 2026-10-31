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

import BlogSection from './sections/BlogSection';
import PatchSection from '../home/sections/PatchSection';

const patchBannerBg = resolveImagePath('Patch1.jpg');
const blogBannerBg = resolveImagePath('Banner.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    Blog001: bannerTitle,
    Blog002: bannerDesc,
    Blog003: bannerBgImage,
} = getSectionCms("BlogSection");

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

const bannerBg = resolveImagePath(bannerBgImage?.url || blogBannerBg);

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'News & Media', path: '/blog' }
];

const Blog = () => {
    const stickyTop = React.useMemo(() => getStickyTop(), []);

    return (
        <>
            <SEO page="blog" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || "News & Articles"}
                desc={bannerDesc || "News & Media"}
                breadcrumbs={BREADCRUMBS}
                bgImage={bannerBg}
            />
            <Container>
                <BlogSection stickyTop={stickyTop} />
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

export default React.memo(Blog);