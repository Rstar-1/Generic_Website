import React from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import {
  getItemSlug,
  matchBySlugOrId,
  findCategory,
  resolveImagePath,
  blogData,
  blogCategoriesData
} from '../../utils';

import BlogDetailSection from './sections/BlogDetailSection';
import PatchSection from '../home/sections/PatchSection';

const patchBannerBg = resolveImagePath('Patch1.jpg');
const blogBannerBg = resolveImagePath('Banner.jpg');

const patchBackground = {
    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
};

const BlogDetail = () => {
    const location = useLocation();
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const currentBlog = React.useMemo(() => {
        if (location.state?.blog) return location.state.blog;
        const targetId = id || searchParams.get('id') || searchParams.get('slug');
        return (targetId ? (blogData || []).find((b) => matchBySlugOrId(b, targetId)) : null) || blogData?.[0] || null;
    }, [location.state, id, searchParams]);

    const category = React.useMemo(() => {
        if (!currentBlog) return null;
        return findCategory(blogCategoriesData, currentBlog);
    }, [currentBlog]);

    const categoryName = category?.name || currentBlog?.category;
    const title = currentBlog?.title || currentBlog?.name;
    const blogId = currentBlog?.id || id;
    const blogSlug = getItemSlug(currentBlog) || blogId;
    const description = currentBlog?.excerpt || currentBlog?.content?.slice(0, 160) || 'Read our latest blog post.';
    const path = blogSlug ? `/blog/${blogSlug}` : '/blog';

    const breadcrumbs = React.useMemo(() => [
        { label: 'Home', path: '/' },
        { label: categoryName, path: `/blog?category=${encodeURIComponent(categoryName)}` },
        { label: title, path: `/blog/${blogSlug}` }
    ], [categoryName, title, blogSlug]);

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
            <Banner title="Blogs Overview" desc='' breadcrumbs={breadcrumbs} bgImage={blogBannerBg} />
            <BlogDetailSection />
            <Container className="relative z-10" style={patchBackground}>
                <PatchSection />
            </Container>
        </>
    );
};

export default React.memo(BlogDetail);