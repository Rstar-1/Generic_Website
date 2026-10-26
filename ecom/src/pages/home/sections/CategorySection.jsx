import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Heading from '../../../components/layout/generic/Heading';

import { categoriesData, configData } from '../../../utils/apiData';
import productcategoryData from '../../../data/productcategory.json';
import { resolveImagePath } from '../../../utils/imageResolver';
import { navigateToCategory, getCmsData } from '../../../utils/utils';

const categories = productcategoryData || categoriesData || [];

const ViewMoreButton = ({ text, link }) => {
    const navigate = useNavigate();

    return (
        <div className="mt-25 flex justify-center">
            <Button
                version="v2"
                variant="outline"
                text={text || "View All"}
                icon="ArrowRight"
                iconPosition="right"
                iconWidth="12"
                iconHeight="12"
                onClick={() => navigate(link || '/category')}
            />
        </div>
    );
};

const CategoryVersion1 = memo(({ items, onCategoryClick }) => (
    <>
        <div className="grid-cols-6 sm-grid-cols-3 mt-30 border-ec">
            {items?.slice(0, 6)?.map((item, index) => {
                const isLastInRow = (index + 1) % 6 === 0;
                return (
                    <div
                        key={`${item.id}-${index}`}
                        onClick={() => onCategoryClick(item)}
                        style={{
                            borderRight: isLastInRow ? 'none' : '1px solid #EBEBEB',
                            borderBottom: 'none'
                        }}
                        className="p-20 sm-p-14 grid-cols-1 cursor-pointer"
                    >
                        <Image
                            src={resolveImagePath(item.icon || item.image)}
                            alt={item.name || item.title}
                            width="116"
                            height="116"
                            className="rounded-full object-contain flex mx-auto"
                        />
                        <p className="small-text text-center text-dark font-500 line-clamp1 mt-12">
                            {item.name || item.title}
                        </p>
                    </div>
                );
            })}
        </div>

        {items && items.length > 6 && <ViewMoreButton />}
    </>
));

CategoryVersion1.displayName = 'CategoryVersion1';

const CategoryVersion2 = memo(({ items, onCategoryClick }) => (
    <>
        <div className="grid-cols-6 sm-grid-cols-2 mt-30 gap-12">
            {items?.slice(0, 6)?.map((cat, idx) => (
                <div
                    key={`${cat.id}-${idx}`}
                    className="p-14 border-ec rounded-5 cursor-pointer text-center"
                    onClick={() => onCategoryClick(cat)}
                >
                    <div className="relative">
                        <Image
                            src={resolveImagePath(cat.icon || cat.image)}
                            alt={cat.name || cat.title}
                            width="110"
                            height="110"
                            loading={idx < 3 ? "eager" : "lazy"}
                            fetchPriority={idx < 3 ? "high" : undefined}
                            className="flex object-cover rounded-full mx-auto"
                        />
                    </div>
                    <p className="text-dark font-500 small-text text-center line-clamp1 mt-12">
                        {cat.name || cat.title}
                    </p>
                </div>
            ))}
        </div>

        {items && items.length > 6 && <ViewMoreButton />}
    </>
));

CategoryVersion2.displayName = 'CategoryVersion2';

const CategoryVersion3 = memo(({ items, onCategoryClick }) => (
    <>
        <style>{`
            .category-card {
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover {
                transform: translateY(-2px);
            }
            .card-image-right {
                clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
                transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover .card-image-right {
                clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
            }
        `}</style>
        <div className="grid-cols-3 sm-grid-cols-1 mt-30" style={{ gap: '20px' }}>
            {items?.slice(0, 6)?.map((cat, idx) => (
                <div
                    key={`${cat.id}-${idx}`}
                    className="category-card bg-forth rounded-5 overflow-hidden flex cursor-pointer relative"
                    onClick={() => onCategoryClick(cat)}
                >
                    <div className="w-50 sm-w-60 p-20">
                        <div>
                            <div
                                className="icon-lg rounded-5"
                                style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                            >
                                <Icon name={cat.iconName} width="22" height="22" stroke={cat.accentColor} />
                            </div>
                            <h3 className="mid-text text-dark font-600 pt-8">{cat.name || cat.title}</h3>
                            <p className="text-gray mini-text line-clamp3 mt-4">
                                {cat.description}
                            </p>
                        </div>
                        <p className="mini-text font-500 mt-6 flex items-center gap-4" style={{ color: cat.accentColor }}>
                            Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                        </p>
                    </div>

                    <div className="card-image-right w-50 sm-w-40 relative overflow-hidden rounded-5 h-200">
                        <Image
                            src={resolveImagePath(cat.icon || cat.image)}
                            alt={cat.name || cat.title}
                            className="card-image-element w-full h-full object-cover flex"
                            loading="lazy"
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '60px',
                                height: '60px',
                                background: cat.accentColor,
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                opacity: 0.85,
                                zIndex: 2
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>

        {items && items.length > 6 && <ViewMoreButton />}
    </>
));

CategoryVersion3.displayName = 'CategoryVersion3';

const CategoryCard = memo(({ item, onClick }) => {
    const imgSrc = resolveImagePath(item.icon || item.image);

    return (
        <div
            className="feature-category-card overflow-hidden h-450 sm-h-350 rounded-10 relative cursor-pointer group select-none"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <Image
                src={imgSrc}
                alt={item.name || item.title}
                className="card-bg-img w-full h-full object-cover filter-b5 flex"
                loading="lazy"
            />

            <div className="absolute top-0 left-0 p-12 z-10">
                {(item.badgeNumber || item.subCategories?.length) ? (
                    <div className="bg-primary rounded-5 p-10">
                        <h5 className="head-text font-600 text-white">
                            {item.badgeNumber || `${item.subCategories.length}+`}
                        </h5>
                        <p className="font-500 text-white mini-text">
                            {item.badgeText || 'Varieties'}
                        </p>
                    </div>
                ) : null}
            </div>

            <div className="absolute bottom-0 left-0 z-10 w-full">
                <div className="p-16">
                    <h3 className="font-600 text-white title-text uppercase line-clamp1 bordh pt-16">
                        {item.name || item.title}
                    </h3>

                    <p className="small-text uppercase text-white font-500 flex items-center gap-6 mt-4 text-muted">
                        Explore Category
                        <Icon name="ArrowRight" width="16" height="16" stroke="currentColor" />
                    </p>
                </div>
            </div>
        </div>
    );
});

CategoryCard.displayName = 'CategoryCard';

const CategoryVersion4 = memo(({ items, onCategoryClick }) => {
    const navigate = useNavigate();
    const [swiper, setSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCategoryClick = useCallback(
        (cat) => {
            if (onCategoryClick) {
                onCategoryClick(cat);
                return;
            }
            navigateToCategory(navigate, cat);
        },
        [navigate, onCategoryClick]
    );

    const categoryItems = useMemo(() => {
        return (items && items.length > 0) ? items : categories;
    }, [items]);

    const canLoop = categoryItems.length > 3;

    return (
        <div className="w-full mt-30">
            <style>{`
                .feature-category-card .card-bg-img {
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .feature-category-card:hover .card-bg-img {
                    transform: scale(1.08);
                }
                .category-swiper-bullet {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background-color: var(--gray, #94a3b8);
                    opacity: 0.4;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: none;
                    padding: 0;
                }
                .category-swiper-bullet.active {
                    width: 28px;
                    border-radius: 4px;
                    background-color: var(--primary, #0284c7);
                    opacity: 1;
                }
            `}</style>

            <Swiper
                onSwiper={setSwiper}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                modules={[Autoplay]}
                slidesPerView={3}
                spaceBetween={20}
                loop={canLoop}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={650}
                breakpoints={{
                    320: {
                        slidesPerView: 1.15,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: Math.min(categoryItems.length, 3),
                        spaceBetween: 20,
                    },
                }}
                className="w-full pb-10"
            >
                {categoryItems.map((item, index) => (
                    <SwiperSlide key={item.id || index}>
                        <CategoryCard
                            item={item}
                            onClick={() => handleCategoryClick(item)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Dot Indicators */}
            {categoryItems.length > 1 && (
                <div className="flex items-center justify-center gap-8 mt-20">
                    {categoryItems.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            aria-label={`Slide ${idx + 1}`}
                            onClick={() => (canLoop ? swiper?.slideToLoop(idx) : swiper?.slideTo(idx))}
                            className={`category-swiper-bullet ${idx === (activeIndex % categoryItems.length) ? 'active' : ''}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

CategoryVersion4.displayName = 'CategoryVersion4';

const VERSION_COMPONENTS = {
    1: CategoryVersion1,
    2: CategoryVersion2,
    3: CategoryVersion3,
    4: CategoryVersion4
};

const CategorySection = memo(({ cms: passedCms }) => {
    const navigate = useNavigate();
    const categoryVersion = configData?.Category?.[0]?.CategoryVersion ?? 3;

    const cms = useMemo(() => getCmsData('CategorySection', passedCms), [passedCms]);
    const tag = cms.getText('Cat001', 'WHAT WE PROVIDE');
    const title = cms.getText('Cat002', 'Expert Innovative And Deliver Exceptional For NOT Solution Now.');

    const handleCategoryClick = useCallback((cat) => {
        navigateToCategory(navigate, cat);
    }, [navigate]);

    const ActiveVersionComponent = VERSION_COMPONENTS[categoryVersion] || CategoryVersion3;

    return (
        <div className="w-full py-50">
            <Heading
                version="v1"
                tag={tag}
                title={title}
            />
            <ActiveVersionComponent items={categories} onCategoryClick={handleCategoryClick} />
        </div>
    );
});

CategorySection.displayName = 'CategorySection';

export { CategoryVersion1, CategoryVersion2, CategoryVersion3, CategoryVersion4 };
export default CategorySection;
