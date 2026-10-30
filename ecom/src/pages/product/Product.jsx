import React, { lazy, Suspense, memo, useMemo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { getStickyTop, Fallback, getCmsData } from '../../utils/utils';
import { cmsMap } from '../../utils/apiData';

const FilterSection = lazy(() => import('./sections/FilterSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

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

const productSections = [
    {
        id: 'filter',
        Component: FilterSection,
        minHeight: '600px',
        isContainer: true,
        isEager: true
    },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: patchBackground,
        props: {
            badge: patchBadge,
            title: patchTitle,
            description: patchDescription,
        },
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/product' }
];

const Product = () => {
    const stickyTop = useMemo(() => getStickyTop(), []);

    return (
        <>
            <SEO page="product" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || "Products Collection"}
                desc={bannerDesc || "Products"}
                breadcrumbs={BREADCRUMBS}
                bgImage={bannerBg}
            />
            {productSections.map(({ id, Component, props = {}, isEager, minHeight, isContainer = true, containerClass, containerStyle, version }) => {
                const el = isContainer ? (
                    <Container className={containerClass} style={containerStyle} version={version}>
                        <Component stickyTop={stickyTop} {...props} />
                    </Container>
                ) : (
                    <Component stickyTop={stickyTop} {...props} />
                );

                const content = <Suspense fallback={<Fallback minHeight={minHeight} />}>{el}</Suspense>;
                return isEager ? (
                    <React.Fragment key={id}>{content}</React.Fragment>
                ) : (
                    <LazySection key={id} placeholderHeight={minHeight} placeholder={<Fallback minHeight={minHeight} />}>{content}</LazySection>
                );
            })}
        </>
    );
};

export default memo(Product);