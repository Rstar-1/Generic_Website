import React, { useState, useMemo, useCallback, useEffect, lazy, Suspense, memo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Pagination from '../../../components/common/Pagination';
import CardLayout from '../../../components/layout/sections/CardLayout';
import { getItemSlug, getStickyTop, findCategory } from '../../../utils/utils';
import blogData from '../../../data/blog.json';
import blogCategoriesData from '../../../data/blogcategory.json';

const FilterSection = lazy(() => import('./FilterSection'));
const ITEMS_PER_PAGE = 5;

const BlogSection = memo(({ stickyTop = getStickyTop() }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const paramCategory = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState(paramCategory || null);

    useEffect(() => {
        if (paramCategory !== null) {
            setSelectedCategory(paramCategory);
            setCurrentPage(1);
        }
    }, [paramCategory]);

    const blogsList = useMemo(() => blogData || [], []);
    const categoriesList = useMemo(() => blogCategoriesData || [], []);

    const activeCategory = useMemo(() => {
        if (!selectedCategory) return null;
        return findCategory(categoriesList, selectedCategory);
    }, [selectedCategory, categoriesList]);

    const activeCategoryLabel = activeCategory?.name || selectedCategory;

    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const cat = selectedCategory;

        return blogsList.filter((post) => {
            const matchesQuery = query
                ? post.title?.toLowerCase().includes(query) ||
                  post.excerpt?.toLowerCase().includes(query) ||
                  post.category?.toLowerCase().includes(query)
                : true;

            const matchesCategory = cat
                ? post.categoryId === cat ||
                  String(post.categoryId) === String(cat) ||
                  (activeCategory && post.categoryId === activeCategory.id) ||
                  post.category?.toLowerCase() === String(cat).toLowerCase()
                : true;

            return matchesQuery && matchesCategory;
        });
    }, [blogsList, searchQuery, selectedCategory, activeCategory]);

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    const handleBlogClick = useCallback((post) => {
        setIsMobileCategoryOpen(false);
        navigate(`/blog/${getItemSlug(post)}`, { state: { blog: post } });
    }, [navigate]);

    const handleSelectCategory = useCallback((catId) => {
        setSelectedCategory(catId);
        setCurrentPage(1);
        setIsMobileCategoryOpen(false);
        if (catId) {
            setSearchParams({ category: String(catId) });
        } else {
            setSearchParams({});
        }
    }, [setSearchParams]);

    const handleClearCategory = useCallback(() => {
        setSelectedCategory(null);
        setCurrentPage(1);
        setSearchParams({});
    }, [setSearchParams]);

    const handleSearchChange = useCallback((val) => {
        setSearchQuery(val);
        setCurrentPage(1);
    }, []);

    const categoryProps = {
        searchQuery,
        onSearchChange: handleSearchChange,
        selectedCategory,
        onSelectCategory: handleSelectCategory,
        onBlogClick: handleBlogClick,
    };

    return (
        <div className="w-full py-40">
            <div className="hidden sm-flex items-center justify-between mb-20">
                <Button
                    onClick={() => setIsMobileCategoryOpen(true)}
                    icon="Filter"
                    text={`Categories & Search${activeCategoryLabel ? ` (${activeCategoryLabel})` : ''}`}
                    iconWidth="11"
                    iconHeight="11"
                    version="v2"
                    variant={selectedCategory || searchQuery ? 'primary' : 'outline'}
                    color={selectedCategory || searchQuery ? 'white' : 'dark'}
                    bg={selectedCategory || searchQuery ? 'dark' : 'tertiary'}
                    className="rounded-30 font-500"
                />
                <p className="small-text text-gray font-500">{filteredPosts.length} Articles</p>
            </div>

            <div className="flex sm-grid-cols-1 items-start gap-12 w-full">
                <div className="w-70 sm-w-full pr-10 sm-pr-1">
                    {activeCategoryLabel && (
                        <div className="flex items-center justify-between mb-20 p-12 bg-forth rounded-5">
                            <p className="small-text font-500 text-dark">
                                Category filter: <span className="text-primary font-600">{activeCategoryLabel}</span>
                            </p>
                            <Button
                                text="Clear"
                                version="v0"
                                bg="transparent"
                                color="danger"
                                className="small-text font-600 cursor-pointer"
                                onClick={handleClearCategory}
                            />
                        </div>
                    )}

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-100 bg-forth rounded-10">
                            <h4 className="title-text font-600 text-dark uppercase">No articles found</h4>
                            <p className="para-text text-gray capitalize mt-6">Try adjusting your search query or category filter.</p>
                        </div>
                    ) : (
                        <>
                            {paginatedPosts.map((post) => (
                                <CardLayout
                                    key={post.id}
                                    version="blog"
                                    post={post}
                                    onClick={handleBlogClick}
                                />
                            ))}

                            {filteredPosts.length > ITEMS_PER_PAGE && (
                                <div className="flex justify-center mt-30">
                                    <Pagination
                                        page={currentPage}
                                        totalItems={filteredPosts.length}
                                        itemsPerPage={ITEMS_PER_PAGE}
                                        onPageChange={setCurrentPage}
                                        itemName="articles"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="w-30 sm-hidden pl-10 overflow-auto h-550 sticky" style={{ top: stickyTop }}>
                    <Suspense fallback={<div className="w-full h-300" />}>
                        <FilterSection {...categoryProps} />
                    </Suspense>
                </div>
            </div>

            <Modal
                type="sidebar"
                placement="left"
                size="sm"
                title="Categories & Search"
                isOpen={isMobileCategoryOpen}
                onClose={() => setIsMobileCategoryOpen(false)}
                footer={null}
            >
                <div className="py-10">
                    <Suspense fallback={<div className="w-full h-300" />}>
                        <FilterSection {...categoryProps} />
                    </Suspense>
                </div>
            </Modal>
        </div>
    );
});

BlogSection.displayName = 'BlogSection';

export default BlogSection;
