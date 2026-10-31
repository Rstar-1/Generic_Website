import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import {
  categoriesData,
  resolveImagePath,
  navigateToCategory
} from '../../../utils';

const CatSection = React.memo(({ items = categoriesData }) => {
    const navigate = useNavigate();

    const handleCategoryClick = React.useCallback((cat) => {
        navigateToCategory(navigate, cat);
    }, [navigate]);

    return (
        <div className="w-full py-60 sm-py-40">
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
            <div className="grid-cols-3 sm-grid-cols-1" style={{ gap: '20px' }}>
                {items?.map((cat, idx) => (
                    <div
                        key={`${cat.id}-${idx}`}
                        className="category-card bg-forth rounded-5 overflow-hidden flex cursor-pointer relative"
                        onClick={() => handleCategoryClick(cat)}
                    >
                        <div className="w-50 sm-w-60 p-20">
                            <div>
                                <div
                                    className="icon-lg rounded-5"
                                    style={{ backgroundColor: cat.bgColor || '#EFF6FF', color: cat.accentColor || '#2563EB' }}
                                >
                                    <Icon name={cat.iconName || 'Layers'} width="22" height="22" stroke={cat.accentColor || '#2563EB'} />
                                </div>
                                <h3 className="mid-text text-dark font-600 pt-8">{cat.name}</h3>
                                <p className="text-gray mini-text line-clamp3 mt-4">
                                    {cat.description}
                                </p>
                            </div>
                            <p className="mini-text font-500 mt-6 flex items-center gap-4" style={{ color: cat.accentColor || '#2563EB' }}>
                                Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                            </p>
                        </div>

                        <div className="card-image-right w-50 sm-w-40 relative overflow-hidden rounded-5 h-200">
                            <Image
                                src={resolveImagePath(cat.image)}
                                alt={cat.name}
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
                                    background: cat.accentColor || '#2563EB',
                                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                    opacity: 0.85,
                                    zIndex: 2
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

CatSection.displayName = 'CatSection';

export default CatSection;
