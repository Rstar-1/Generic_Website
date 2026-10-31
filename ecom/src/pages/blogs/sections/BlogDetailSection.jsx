import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Fields from '../../../components/forms/Fields';
import Badge from '../../../components/common/Badge';
import { resolveImagePath } from '../../../utils/imageResolver';
import { getItemSlug, matchBySlugOrId, shareContent } from '../../../utils/utils';
import blogData from '../../../data/blog.json';

import FilterSection from './FilterSection';

const BlogDetailSection = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

    const blogsList = useMemo(() => blogData || [], []);

    const currentBlog = useMemo(() => {
        if (location.state?.blog) return location.state.blog;
        const target = id || searchParams.get('id') || searchParams.get('slug');
        return (target ? blogsList.find((b) => matchBySlugOrId(b, target)) : null) || blogsList[0] || null;
    }, [location.state, id, searchParams, blogsList]);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(currentBlog?.reviews || []);
    }, [currentBlog]);

    const handleBlogClick = useCallback((post) => {
        setIsMobileCategoryOpen(false);
        navigate(`/blog/${getItemSlug(post)}`, { state: { blog: post } });
    }, [navigate]);

    const handleSelectCategory = useCallback((catId) => {
        setIsMobileCategoryOpen(false);
        navigate(`/blog?category=${catId}`);
    }, [navigate]);

    const handleShare = useCallback((platform) => {
        const blogSlug = getItemSlug(currentBlog);
        shareContent({
            platform,
            url: `${window.location.origin}/blog/${blogSlug}`,
            title: currentBlog?.title || 'Check out this article'
        });
    }, [currentBlog]);

    if (!currentBlog) return null;

    const renderSidebar = () => (
        <FilterSection
            selectedCategory={currentBlog.categoryId}
            onSelectCategory={handleSelectCategory}
            excludeBlogId={currentBlog.id}
            onBlogClick={handleBlogClick}
        />
    );

    return (
        <Container>
            <div className="py-60">
                <div className="hidden sm-flex items-center justify-between mb-20">
                    <Button
                        onClick={() => setIsMobileCategoryOpen(true)}
                        icon="Filter"
                        text="Categories & Articles"
                        iconWidth="11"
                        iconHeight="11"
                        version="v2"
                        variant="outline"
                        color="dark"
                        bg="tertiary"
                        className="rounded-30 font-500"
                    />
                </div>

                <div className="flex sm-grid-cols-1 items-start gap-12 w-full">
                    <div className="w-70 sm-w-full pr-10 sm-pr-1">
                        <div className="relative">
                            <Image
                                src={resolveImagePath(currentBlog.image)}
                                alt={currentBlog.title}
                                className="flex rounded-10 h-450 sm-h-300 w-full object-cover"
                            />
                            {currentBlog.category && (
                                <div
                                    onClick={() => handleSelectCategory(currentBlog.categoryId || currentBlog.category)}
                                    className="cursor-pointer absolute bottom-0 left-0 m-16 sm-m-8"
                                >
                                    <Badge text={currentBlog.category} color="primary" size="md" shape="rounded" className="font-500" />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center flex-wrap gap-12 mt-20">
                            <div className="flex items-center gap-6">
                                <Icon name="Customers" width="15" height="15" stroke="var(--gray)" />
                                <p className="small-text text-gray font-400">By {currentBlog.author || 'Admin'}</p>
                            </div>
                            <div className="flex items-center gap-6 ml-10">
                                <Icon name="Box" width="15" height="15" stroke="var(--gray)" />
                                <p className="small-text text-gray font-400">{currentBlog.date}</p>
                            </div>
                            {currentBlog.readTime && (
                                <div className="flex items-center gap-6">
                                    <Icon name="Clock" width="15" height="15" stroke="var(--gray)" />
                                    <p className="small-text text-gray font-400">{currentBlog.readTime}</p>
                                </div>
                            )}
                        </div>

                        <h3 className="text-dark font-600 head-text uppercase mt-16">{currentBlog.title}</h3>
                        <p className="text-gray font-400 para-text mt-14 leading-relaxed">{currentBlog.content}</p>

                        {currentBlog.quote && (
                            <div className="rounded-5 p-20 relative mt-16 bg-light-warning">
                                <p className="para-text font-500 text-dark">"{currentBlog.quote}"</p>
                            </div>
                        )}

                        <p className="text-gray font-400 para-text mt-16 leading-relaxed">{currentBlog.excerpt}</p>

                        <div className="flex sm-grid-cols-1 sm-gap-12 justify-between items-center py-20 bordb mb-20">
                            <div className="flex gap-8 items-center flex-wrap">
                                {currentBlog.tags?.map((tag) => (
                                    <Badge key={tag} text={tag} color="gray" size="md" shape="pill" className="font-500" />
                                ))}
                            </div>

                            <div className="flex gap-10 items-center">
                                {['Facebook', 'WhatsApp', 'Instagram'].map((iconName) => (
                                    <div
                                        key={iconName}
                                        onClick={() => handleShare(iconName)}
                                        className="cursor-pointer hover:opacity-80 flex items-center justify-center p-4 transition-all"
                                        title={`Share on ${iconName}`}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleShare(iconName)}
                                    >
                                        <Icon name={iconName} width="16" height="16" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-20">
                            <h3 className="text-dark uppercase mid-text font-600">
                                Reviews & Comments <span className="font-400 headmini-text">({comments.length.toString().padStart(2, '0')})</span>
                            </h3>

                            <div className="grid-cols-1 gap-12 mt-12">
                                {comments.map((c) => (
                                    <div key={c.id} className="flex gap-12 items-start py-20 bordb w-85 sm-w-full">
                                        <div className="w-15 sm-w-30">
                                            <Image src={c.avatar} alt={c.name} width="100" height="100" className="object-cover flex rounded-full mx-auto" />
                                        </div>

                                        <div className="w-85 sm-w-70">
                                            <h5 className="text-dark mid-text font-600 uppercase">{c.name}</h5>
                                            <Fields type="rating" value={c.rating || 5} disabled size={15} gap={2} className="mt-6" />
                                            <p className="small-text text-gray font-400 mt-12 leading-relaxed">{c.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-30 sm-hidden pl-10">{renderSidebar()}</div>
                </div>

                <Modal
                    type="sidebar"
                    placement="left"
                    size="sm"
                    title="Categories & Articles"
                    isOpen={isMobileCategoryOpen}
                    onClose={() => setIsMobileCategoryOpen(false)}
                    footer={null}
                >
                    <div className="py-10">{renderSidebar()}</div>
                </Modal>
            </div>
        </Container>
    );
});

BlogDetailSection.displayName = 'BlogDetailSection';

export default BlogDetailSection;
