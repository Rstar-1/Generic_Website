import React, { lazy, Suspense, memo, useMemo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { getStickyTop, Fallback } from '../../utils/utils';

const BlogSection = lazy(() => import('./sections/BlogSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBannerBg = resolveImagePath('Patch1.jpg');
const blogBannerBg = resolveImagePath('Banner.jpg');

const blogSections = [
    { id: 'blog', Component: BlogSection, minHeight: '600px', isContainer: true },
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
    { label: 'News & Media', path: '/blog' }
];

const Blog = () => {
    const stickyTop = useMemo(() => getStickyTop(), []);

    return (
        <>
            <SEO page="blog" breadcrumbs={BREADCRUMBS} />
            <Banner title="News & Articles" desc="News & Media" breadcrumbs={BREADCRUMBS} bgImage={blogBannerBg} />
            {blogSections.map(({ id, Component, isEager, minHeight, isContainer = true, containerClass, containerStyle }) => {
                const el = isContainer ? (
                    <Container className={containerClass} style={containerStyle}>
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

export default memo(Blog);