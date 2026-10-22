import React, { lazy, Suspense, memo, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { resolveImagePath } from '../../utils/imageResolver';
import { getItemSlug, matchBySlugOrId, Fallback } from '../../utils/utils';
import blogData from '../../data/blog.json';

const BlogDetailSection = lazy(() => import('./sections/BlogDetailSection'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBannerBg = resolveImagePath('Patch1.jpg');
const blogBannerBg = resolveImagePath('Banner.jpg');

const blogDetailSections = [
    { id: 'detail', Component: BlogDetailSection, minHeight: '600px', isContainer: false },
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

const BlogDetail = () => {
    const location = useLocation();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const currentBlog = useMemo(() => {
        if (location.state?.blog) return location.state.blog;
        const targetId = id || searchParams.get('id') || searchParams.get('slug');
        return (targetId ? (blogData || []).find((b) => matchBySlugOrId(b, targetId)) : null) || blogData?.[0] || null;
    }, [location.state, id, searchParams]);

    const title = currentBlog?.title || 'Blog Detail';
    const description = currentBlog?.excerpt || currentBlog?.content?.slice(0, 160) || 'Read our latest blog post.';
    const blogSlug = getItemSlug(currentBlog);
    const path = blogSlug ? `/blog/${blogSlug}` : '/blog';

    const breadcrumbs = useMemo(() => [
        { label: 'Home', path: '/home' },
        { label: 'News & Media', path: '/blog' },
        { label: title, path }
    ], [title, path]);

    return (
        <>
            <SEO
                page="blogDetail"
                title={title}
                description={description}
                image={currentBlog?.image}
                path={path}
                type="article"
                article={{
                    title,
                    description,
                    image: currentBlog?.image,
                    datePublished: currentBlog?.date,
                    author: currentBlog?.author || 'Admin',
                }}
                breadcrumbs={breadcrumbs}
            />
            <Banner title={title} desc={currentBlog?.category || 'News & Media'} breadcrumbs={breadcrumbs} bgImage={blogBannerBg} />
            {blogDetailSections.map(({ id: secId, Component, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
                const el = isContainer ? (
                    <Container className={containerClass} style={containerStyle}>
                        <Component />
                    </Container>
                ) : (
                    <Component />
                );

                const content = <Suspense fallback={<Fallback minHeight={minHeight} />}>{el}</Suspense>;
                return isEager ? (
                    <React.Fragment key={secId}>{content}</React.Fragment>
                ) : (
                    <LazySection key={secId} placeholderHeight={minHeight} placeholder={<Fallback minHeight={minHeight} />}>{content}</LazySection>
                );
            })}
        </>
    );
};

export default memo(BlogDetail);