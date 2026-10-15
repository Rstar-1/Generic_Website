import React from 'react';

import Image from '../../common/Image';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Icon from '../../common/Icon';
import Fields from '../../forms/Fields';

import { resolveImagePath } from '../../../utils/imageResolver';
import { useCart } from '../../../feature/slice/cartSlice';

export const FeatureCard = React.memo(({
    item,
    onClick,
    onSelect,
    minWidth = '280px',
    maxWidth = '280px',
    isFluid = false
}) => {
    const { addToCart } = useCart();
    const handleCardClick = onClick || onSelect;

    if (!item) return null;

    const tag = item.tag || item.subCategory || item.category || 'Featured';
    const title = item.title || item.name;
    const productName = item.productName || item.name || title;
    const priceDisplay = typeof item.price === 'number'
        ? `$${item.price.toFixed(2)}`
        : (item.priceFormatted || `$${item.price || 0}`);

    const handleShop = (e) => {
        e.stopPropagation();
        addToCart({
            id: item.id,
            name: productName?.replace('...', ''),
            price: item.price,
            image: item.thumb || item.image
        });
        handleCardClick?.(item);
    };

    return (
        <div
            onClick={() => handleCardClick?.(item)}
            className={`h-350 sm-h-350 rounded-10 relative overflow-hidden cursor-pointer feature-card ${!isFluid ? 'flex-shrink-0' : 'w-full'}`}
            style={!isFluid ? { minWidth, maxWidth } : undefined}
        >
            <style>{`
                .feature-card .feature-info {
                    transform: translateY(73px);
                    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                }
                .feature-card:hover .feature-info {
                    transform: translateY(0);
                }
                .feature-card:hover .feature-data {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .feature-card:hover .feature-div {
                    opacity: 1;
                }
                .feature-card:hover > img {
                    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                    transform: scale(1.06);
                }
            `}</style>
            <Image
                src={resolveImagePath(item.image)}
                alt={title}
                className="w-full h-full object-cover flex filter-b5"
            />

            <div className="absolute bottom-0 left-0 w-full feature-info">
                <div className="px-12 mb-20 feature-data">
                    <p className="small-text font-400 text-white">
                        {tag}
                    </p>
                    <h3 className="title-text font-600 text-white mt-3 uppercase line-clamp1">
                        {title}
                    </h3>
                </div>
                <div className="rounded-5 p-14 flex items-center justify-between bg-gray feature-div">
                    <div className="flex items-center gap-8 w-60">
                        <Image
                            src={resolveImagePath(item.thumb || item.image)}
                            alt={productName}
                            height="45px"
                            className="flex object-cover rounded-5 w-30"
                        />
                        <div className="w-70">
                            <p className="small-text font-400 text-white line-clamp1">
                                {productName}
                            </p>
                            <p className="mini-text font-500 text-white">
                                {priceDisplay}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleShop}
                        text="Shop Now"
                        version="v2"
                        bg="white"
                        color="dark"
                        className="rounded-20"
                    />
                </div>
            </div>
        </div>
    );
});

FeatureCard.displayName = 'FeatureCard';

export const FeatureCard2 = React.memo(({
    item,
    onClick,
    onSelect,
    className = '',
    imageHeight = 'h-250 sm-h-200'
}) => {
    const handleCardClick = onClick || onSelect;

    if (!item) return null;

    const title = item.title || item.name;
    const description = item.description || item.subtitle;

    return (
        <div
            onClick={() => handleCardClick?.(item)}
            className={`w-full ${handleCardClick ? 'cursor-pointer' : ''} ${className}`.trim()}
        >
            <Image
                src={resolveImagePath(item.image)}
                alt={title || 'feature'}
                className={`w-full ${imageHeight} object-cover flex rounded-10`}
            />
            <h3 className="mid-text text-dark text-center font-600 uppercase mt-16">
                {title}
            </h3>
            {description && (
                <p className="small-text text-gray text-muted font-400 mt-4 text-center">
                    {description}
                </p>
            )}
        </div>
    );
});

FeatureCard2.displayName = 'FeatureCard2';

export const FeatureCard3 = React.memo(({
    item,
    onClick,
    onShopLook,
    minWidth,
    maxWidth,
    className = ''
}) => {
    const { addToCart } = useCart();
    const handleCardClick = onClick;
    if (!item) return null;

    const productImages = item.products || item.images?.slice(0, 2) || (item.image ? [item.image] : []);
    const [activeImage, setActiveImage] = React.useState(item.image);

    React.useEffect(() => {
        setActiveImage(item.image);
    }, [item.image]);

    const handleShopLookClick = (e) => {
        e.stopPropagation();
        if (onShopLook) {
            onShopLook(item);
        } else {
            addToCart(item);
        }
    };

    const style = (minWidth || maxWidth) ? { minWidth, maxWidth } : undefined;

    return (
        <div
            style={style}
            className={`feed-card relative rounded-10 overflow-hidden h-400 cursor-pointer w-full ${minWidth || maxWidth ? 'flex-shrink-0' : ''} ${className}`.trim()}
        >
            <style>{`
                .feed-card .shop-look-btn-wrapper {
                    max-height: 0;
                    opacity: 0;
                    visibility: hidden;
                    margin-top: 0;
                    overflow: hidden;
                    transform: translateY(12px);
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                }
                .feed-card:hover .shop-look-btn-wrapper {
                    max-height: 55px;
                    opacity: 1;
                    visibility: visible;
                    margin-top: 10px;
                    transform: translateY(0);
                }
                .feed-card .feed-img {
                    transition: transform 0.5s ease;
                }
                .feed-card:hover .feed-img {
                    transform: scale(1.04);
                }
            `}</style>
            <Image
                src={resolveImagePath(activeImage || item.image)}
                alt={item.title || item.name || "Instagram Feed Post"}
                className="feed-img w-full h-full object-cover flex"
                onClick={() => handleCardClick?.(item)}
            />

            <div className="absolute top-0 right-0">
                <div className="bg-white rounded-full icon-lg m-15 flex items-center justify-center">
                    <Icon name="Instagram" width="18" height="18" className="text-danger" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full">
                <div className="p-15">
                    {productImages.length > 0 && (
                        <div className="flex items-center gap-12">
                            {productImages.map((prodImg, idx) => (
                                <div
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveImage(prodImg);
                                    }}
                                    className={`bg-white p-2 rounded-5 shadow-sm cursor-pointer transition-all ${activeImage === prodImg ? 'border-primary' : 'border-transparent'
                                        }`}
                                >
                                    <Image
                                        src={resolveImagePath(prodImg)}
                                        alt="Tagged Product"
                                        width="50px"
                                        height="50px"
                                        className="flex object-cover rounded-5"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="shop-look-btn-wrapper w-full">
                        <Button
                            onClick={handleShopLookClick}
                            text={item.buttonText || "Shop the Look"}
                            version="v3"
                            bg="white"
                            color="dark"
                            className="rounded-30 w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

FeatureCard3.displayName = 'FeatureCard3';

export const ProductCard = React.memo(({
    item,
    onClick,
    onProductClick,
    onCategoryClick,
    minWidth = '270px',
    maxWidth = '270px',
    isFluid = false
}) => {
    const { addToCart } = useCart();
    const handleCardClick = onClick || onProductClick;

    if (!item) return null;

    if (item.isBanner) {
        return (
            <div
                className="overflow-hidden rounded-5 relative cursor-pointer sm-h-350"
                style={{
                    ...(!isFluid ? { minWidth, maxWidth } : {}),
                    height: '386px',
                }}
            >
                <Image
                    src={resolveImagePath(item.image)}
                    alt={item.title}
                    className="h-full w-full object-cover flex filter-b5"
                />
                <div className="absolute bottom-0 left-0 px-16 py-20">
                    <p className="text-primary font-500 para-text">{item.subtitle}</p>
                    <h3 className="text-white font-600 title-text mt-4">{item.title}</h3>
                </div>
            </div>
        );
    }

    const badge = item.badge || item.badges?.[0];
    const price = typeof item.price === 'number'
        ? `₹${item.price.toFixed(2)}`
        : (item.priceFormatted || `₹${item.price || 0}`);
    const originalPrice = item.originalPrice
        ? (typeof item.originalPrice === 'number'
            ? `₹${item.originalPrice.toFixed(2)}`
            : (item.originalPriceFormatted || `₹${item.originalPrice}`))
        : null;

    return (
        <div
            onClick={() => handleCardClick?.(item)}
            className={`cursor-pointer ${!isFluid ? 'flex-shrink-0' : 'w-full'}`}
            style={!isFluid ? { minWidth, maxWidth } : undefined}
        >
            <style>{`
                .product-card .product-btn {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(12px);
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                }
                .product-card:hover .product-btn {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .product-card img {
                    transition: transform 0.5s ease;
                }
                .product-card:hover img {
                    transform: scale(1.04);
                }
            `}</style>
            <div className="h-300 sm-h-250 w-full overflow-hidden rounded-10 relative product-card">
                {badge && (
                    <div className="top-0 left-0 absolute z-2">
                        <Badge
                            text={typeof badge === 'object' ? (badge.text || badge.label || badge.name) : badge}
                            bg={typeof badge === 'object' ? (badge.color || badge.bg || '#C8281E') : '#C8281E'}
                            textColor="#ffffff"
                            shape="pill"
                            size="xs"
                            className="m-12"
                        />
                    </div>
                )}
                <Image
                    src={resolveImagePath(item.image)}
                    alt={item.name}
                    className="flex w-full h-full object-cover"
                />
                <div className="product-btn w-full absolute bottom-0 left-0 z-2">
                    <div className="p-18">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                            }}
                            text="Add to Cart"
                            icon="Cart"
                            iconWidth="18"
                            iconHeight="18"
                            iconStrokeWidth="2"
                            iconPosition="left"
                            version="v3"
                            bg="primary"
                            color="white"
                            className="rounded-30 w-full"
                        />
                    </div>
                </div>
            </div>

            <p
                onClick={(e) => {
                    if (onCategoryClick) {
                        e.stopPropagation();
                        onCategoryClick(item.category || item.categoryId);
                    }
                }}
                className="text-gray font-500 uppercase mini-text mt-5 hover:text-primary transition-colors"
            >
                {item.category}
            </p>

            <h3 className="headmini-text text-dark uppercase font-600 mt-2 line-clamp1">
                {item.name}
            </h3>

            <div className="flex items-center gap-6 mt-2">
                <p className="mini-text text-danger font-600">
                    {price}
                </p>
                {originalPrice && (
                    <p className="mini-text text-gray font-400 line-through">
                        {originalPrice}
                    </p>
                )}
            </div>

            {/* {item.colors && item.colors.length > 0 && (
                <div className="flex items-center gap-8 mt-6">
                    {item.colors.map((color, cIdx) => (
                        <span
                            key={cIdx}
                            style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '3px',
                                backgroundColor: color,
                                border: '1px solid rgba(0,0,0,0.15)'
                            }}
                        />
                    ))}
                </div>
            )} */}
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

export const ProductCard2 = React.memo(({
    item,
    onClick,
    onProductClick,
    minWidth = '270px',
    maxWidth = '270px',
    isFluid = false
}) => {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = React.useState(0);
    const handleCardClick = onClick || onProductClick;

    if (!item) return null;

    const activeImage = item.variants?.[selectedVariant] || item.image;
    const price = typeof item.price === 'number'
        ? `$${item.price.toFixed(2)}`
        : (item.priceFormatted || item.price || '$0.00');
    const oldPrice = item.oldPrice || item.originalPrice
        ? (typeof (item.oldPrice || item.originalPrice) === 'number'
            ? `$${(item.oldPrice || item.originalPrice).toFixed(2)}`
            : (item.oldPriceFormatted || item.originalPriceFormatted || item.oldPrice || item.originalPrice))
        : null;

    return (
        <div
            onClick={() => handleCardClick?.(item)}
            className={`cursor-pointer ${!isFluid ? 'flex-shrink-0' : 'w-full'}`}
            style={!isFluid ? { minWidth, maxWidth } : undefined}
        >
            <style>{`
                .product-card .product-btn {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                }
                .product-card:hover .product-btn {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .product-card img {
                    transition: transform 0.5s ease;
                }
                .product-card:hover img {
                    transform: scale(1.04);
                }
            `}</style>
            <div className="w-full h-300 rounded-5 relative overflow-hidden product-card">
                <div className="absolute top-0 right-0 m-10 z-2">
                    <Badge
                        text="In stock"
                        color="success"
                        size="xs"
                        shape="rounded"
                        className="font-400"
                    />
                </div>

                <Image
                    src={resolveImagePath(activeImage)}
                    alt={item.name}
                    className="h-full w-full object-cover flex"
                />

                <div className="product-btn w-full absolute bottom-0 left-0 z-2">
                    <div className="p-18">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                            }}
                            text="Add to Cart"
                            icon="Cart"
                            iconWidth="18"
                            iconHeight="18"
                            iconStrokeWidth="2"
                            iconPosition="left"
                            version="v3"
                            bg="primary"
                            color="white"
                            className="rounded-30 w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-10">
                <p className="mini-text text-gray font-500 uppercase">
                    {item.vendor || item.category}
                </p>

                <h3
                    className="headmini-text text-dark font-600 line-clamp1"
                    title={item.name}
                >
                    {item.name}
                </h3>

                <Fields
                    type="rating"
                    value={item.rating || 0}
                    size={13}
                    activeColor="#f59e0b"
                    inactiveColor="#d1d5db"
                    disabled
                    className="mt-5"
                />

                <div className="flex items-center gap-6 mt-4 flex-wrap">
                    <p
                        className={`small-text font-600 ${oldPrice
                            ? 'text-danger'
                            : 'text-dark'
                            }`}
                    >
                        {price}
                    </p>

                    {oldPrice && (
                        <p className="mini-text text-gray line-through font-400">
                            {oldPrice}
                        </p>
                    )}

                    {item.discount && (
                        <Badge
                            text={item.discount}
                            color="danger"
                            size="xs"
                            shape="rounded"
                            className="font-500"
                        />
                    )}
                </div>

                {item.images?.length > 0 && (
                    <div className="flex items-center gap-6 mt-8">
                        {item.images.map((vUrl, vIdx) => (
                            <div
                                key={vIdx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVariant(vIdx);
                                }}
                                className={`rounded-full cursor-pointer ${selectedVariant === vIdx
                                    ? 'border-primary'
                                    : 'border-gray'
                                    }`}
                            >
                                <Image
                                    width="25px"
                                    height="25px"
                                    src={resolveImagePath(vUrl)}
                                    alt="click"
                                    className="flex object-cover rounded-full p-3"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

export const BlogCard = React.memo(({
    item,
    post,
    data,
    onClick,
    onSelect,
    className = '',
    imageHeight = 'h-450 sm-h-250',
    ...props
}) => {
    const blog = item || post || data;
    const handleClick = onClick || onSelect;

    if (!blog) return null;

    return (
        <article className={`mb-30 pb-30 bordb ${className}`} {...props}>
            <div
                onClick={() => handleClick?.(blog)}
                className={`w-full ${imageHeight} rounded-10 overflow-hidden mb-20 sm-mb-12 cursor-pointer`}
            >
                <Image
                    src={resolveImagePath(blog.image)}
                    alt={blog.title}
                    className="flex object-cover h-full w-full"
                />
            </div>

            <div className="flex items-center gap-12">
                <div className="flex items-center gap-6">
                    <Icon name="Customers" width="14" height="14" stroke="var(--gray)" />
                    <p className="small-text text-gray font-500">{blog.date}</p>
                </div>
                <div className="flex items-center gap-6 ml-10">
                    <Icon name="WhatsApp" width="14" height="14" stroke="var(--gray)" />
                    <p className="small-text text-gray font-500">{blog.comments || '12 Comments'}</p>
                </div>
            </div>

            <h2
                onClick={() => handleClick?.(blog)}
                className="text-dark font-600 head-text uppercase mt-12 sm-mt-6 cursor-pointer line-clamp2 hover:text-primary transition-colors"
            >
                {blog.title}
            </h2>

            <p className="text-gray font-400 para-text line-clamp3 mt-6">
                {blog.excerpt || blog.description}
            </p>

            <Button
                text="Read More"
                version="v2"
                bg="primary"
                color="white"
                icon="ArrowUpRight"
                iconPosition="right"
                className="rounded-30 mt-16"
                onClick={() => handleClick?.(blog)}
            />
        </article>
    );
});

BlogCard.displayName = 'BlogCard';

const CardLayout = React.memo(({ version = 'product', ...props }) => {
    if (version === 'blog') {
        return <BlogCard {...props} />;
    }
    if (version === 'feature') {
        return <FeatureCard {...props} />;
    }
    if (version === 'feature2') {
        return <FeatureCard2 {...props} />;
    }
    if (version === 'feature3') {
        return <FeatureCard3 {...props} />;
    }
    if (version === 'product2') {
        return <ProductCard2 {...props} />;
    }
    return <ProductCard {...props} />;
});

CardLayout.displayName = 'CardLayout';

export default CardLayout;
