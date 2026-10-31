import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Fields from '../../../components/forms/Fields';
import {
  resolveImagePath,
  getItemSlug
} from '../../../utils';
import blogData from '../../../data/blog.json';
import blogCategoriesData from '../../../data/blogcategory.json';

const FilterSection = React.memo(({
    searchQuery = '',
    onSearchChange,
    selectedCategory = null,
    onSelectCategory,
    excludeBlogId,
    onBlogClick
}) => {
    const navigate = useNavigate();
    const blogsList = React.useMemo(() => blogData || [], []);
    const categoriesList = React.useMemo(() => blogCategoriesData || [], []);

    const categories = React.useMemo(() => {
        return categoriesList.map((cat) => {
            const count = blogsList.filter(
                (b) => b.categoryId === cat.id || String(b.categoryId) === String(cat.id) || b.category?.toLowerCase() === cat.name.toLowerCase()
            ).length;
            return { ...cat, count: String(count).padStart(2, '0') };
        });
    }, [categoriesList, blogsList]);

    const recentPosts = React.useMemo(() => {
        const filtered = excludeBlogId ? blogsList.filter((b) => b.id !== excludeBlogId) : blogsList;
        return filtered.slice(0, 3);
    }, [blogsList, excludeBlogId]);

    const isCatActive = React.useCallback((cat) => (
        selectedCategory === cat.id || String(selectedCategory) === String(cat.id) || selectedCategory === cat.name
    ), [selectedCategory]);

    const handleCategoryClick = React.useCallback((cat) => {
        if (onSelectCategory) {
            onSelectCategory(isCatActive(cat) ? null : cat.id);
        } else {
            navigate(`/blog?category=${cat.id}`);
        }
    }, [onSelectCategory, isCatActive, navigate]);

    const handlePostClick = React.useCallback((post) => {
        if (onBlogClick) {
            onBlogClick(post);
        } else {
            navigate(`/blog/${getItemSlug(post)}`, { state: { blog: post } });
        }
    }, [onBlogClick, navigate]);

    const handleSearch = React.useCallback((val) => {
        if (onSearchChange) onSearchChange(val);
        else navigate('/blog');
    }, [onSearchChange, navigate]);

    return (
        <aside className="w-full pb-50 sm-pb-5">
            <div className="mb-25 bg-forth rounded-10 p-15">
                <Fields
                    type="input"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearch}
                    icon="Search"
                    iconPosition="right"
                />
            </div>

            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">All Categories</h4>
                <div className="grid-cols-1 gap-10 mt-15">
                    {categories.map((cat) => {
                        const active = isCatActive(cat);
                        return (
                            <div
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat)}
                                className={`rounded-5 p-15 flex justify-between items-center cursor-pointer transition-colors ${
                                    active ? 'bg-primary text-white' : 'bg-forth text-dark hover:bg-white'
                                }`}
                            >
                                <h5 className={`headmini-text font-500 ${active ? 'text-white' : 'text-dark'}`}>{cat.name}</h5>
                                <p className={`mini-text font-500 ${active ? 'text-white' : 'text-light'}`}>({cat.count})</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mb-25">
                <h4 className="text-dark mid-text font-600">Recent Posts</h4>
                <div className="mt-15 grid-cols-1 gap-12">
                    {recentPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => handlePostClick(post)}
                            className="flex items-center gap-12 mb-10 cursor-pointer"
                        >
                            <div className="w-35 h-100px rounded-5 overflow-hidden flex-shrink-0">
                                <Image
                                    src={resolveImagePath(post.image)}
                                    alt={post.title}
                                    className="w-full h-full object-cover flex"
                                />
                            </div>
                            <div className="w-65">
                                <p className="text-primary mini-text font-600 mb-3">{post.date}</p>
                                <h5 className="text-dark mid-text font-600 line-clamp1">{post.title}</h5>
                                <p className="text-gray mt-4 small-text font-400 line-clamp2">{post.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
});

FilterSection.displayName = 'FilterSection';

export default FilterSection;