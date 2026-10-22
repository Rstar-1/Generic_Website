import React, { lazy, Suspense, memo, useMemo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { getStickyTop, Fallback } from '../../utils/utils';

const FilterSection = lazy(() => import('./sections/FilterSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBannerBg = resolveImagePath('Patch1.jpg');
const productBannerBg = resolveImagePath('Banner.jpg');

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
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'Products', path: '/product' }
];

const Product = () => {
    const stickyTop = useMemo(() => getStickyTop(), []);

    return (
        <>
            <SEO page="product" breadcrumbs={BREADCRUMBS} />
            <Banner title="Products Collection" desc="Products" breadcrumbs={BREADCRUMBS} bgImage={productBannerBg} />
            {productSections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle, version }) => {
                const el = isContainer ? (
                    <Container className={containerClass} style={containerStyle} version={version}>
                        <Component stickyTop={stickyTop} />
                    </Container>
                ) : (
                    <Component stickyTop={stickyTop} />
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