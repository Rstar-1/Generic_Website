import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Accordion from '../../../components/common/Accordion';
import Fields from '../../../components/forms/Fields';
import Badge from '../../../components/common/Badge';
import Magnify from '../../../components/common/Magnify';
import Modal from '../../../components/common/Modal';

import EnquiryModal from '../../../components/layout/generic/Enquiy';

import { useCart } from '../../../feature/cartSlice';
import { resolveImagePath } from '../../../utils/imageResolver';
import { productsData, categoriesData } from '../../../utils/apiData';
import { getItemSlug, matchBySlugOrId, shareContent, formatPrice } from '../../../utils/utils';

const isMagnifyEnabled = import.meta.env.VITE_MAGNIFY === 'true' || import.meta.env.VITE_MAGNIFY === true;
const isPrice = String(import.meta.env.VITE_PRICE).toLowerCase() === 'true';

const defaultImages = ['Product1.jpg'];

const accordionItems = [
    {
        id: 1,
        title: 'Specifications',
        content: 'Crafted with premium materials and ergonomic curvature. Built for durability, warmth, and modern interior aesthetics.'
    },
    {
        id: 2,
        title: 'Product Details',
        content: 'Engineered for exceptional performance with high resistance to wear, moisture, and daily use.'
    },
    {
        id: 3,
        title: 'Materials & Care',
        content: 'Wipe clean with a soft dry cloth. Avoid harsh chemical cleaners to maintain long-lasting surface finish.'
    }
];

const ProductDetailContent = ({ currentProduct, category }) => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [selectedImgIdx, setSelectedImgIdx] = React.useState(0);
    const [selectedColor, setSelectedColor] = React.useState('Default');
    const [quantity, setQuantity] = React.useState(1);
    const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false);
    const [isPackagingModalOpen, setIsPackagingModalOpen] = React.useState(false);

    const handleOpenEnquiry = React.useCallback(() => setIsEnquiryOpen(true), []);
    const handleCloseEnquiry = React.useCallback(() => setIsEnquiryOpen(false), []);
    const handleEnquiryQuantityChange = React.useCallback((_, val) => setQuantity(Math.max(1, Number(val) || 1)), []);

    const product = React.useMemo(() => {
        let baseProduct = currentProduct || location.state?.product;
        if (baseProduct && baseProduct.id) {
            const fresh = (productsData || []).find((x) => String(x.id) === String(baseProduct.id));
            if (fresh) {
                return { ...fresh, ...baseProduct, specifications: fresh.specifications || baseProduct.specifications };
            }
            return baseProduct;
        }
        if (id) {
            const found = (productsData || []).find((x) => matchBySlugOrId(x, id));
            if (found) return found;
        }
        return (productsData || []).find((p) => !p.isBanner) || productsData?.[0];
    }, [currentProduct, id, location.state]);

    const productSlug = React.useMemo(() => getItemSlug(product), [product]);

    // Automatically rewrite numeric ID URLs (e.g. /product/67) to slugified URLs (e.g. /product/magnetic-strip-curtain-roll)
    React.useEffect(() => {
        if (productSlug && id && id !== productSlug) {
            navigate(`/product/${productSlug}`, { replace: true, state: location.state });
        }
    }, [id, productSlug, navigate, location.state]);

    const activeCategory = React.useMemo(() => {
        if (category) return category;
        if (!product) return null;
        if (product.categoryId) {
            return (categoriesData || []).find((c) => c.id === product.categoryId) || null;
        }
        return (categoriesData || []).find((c) => c.name.toLowerCase() === product.category?.toLowerCase()) || null;
    }, [category, product]);

    const isPvcStripCurtains = React.useMemo(() => {
        const slug = activeCategory?.slug || '';
        const catName = (product?.category || activeCategory?.name || '').toLowerCase();
        return (
            slug === 'pvc-strip-curtain-rolls' ||
            slug === 'standard-clear-pvc' ||
            product?.categoryId === 1 ||
            activeCategory?.id === 1 ||
            catName.includes('pvc strip curtain roll')
        );
    }, [activeCategory, product]);

    const productImages = React.useMemo(() => {
        if (!product) return defaultImages;
        if (product.images && product.images.length) return product.images;
        if (product.image) return [product.image];
        return defaultImages;
    }, [product]);

    React.useEffect(() => {
        setSelectedImgIdx(0);
        if (product?.colors && product.colors.length) {
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product.id || Date.now(),
            name: product.name || product.title || 'Product',
            price: product.price || 0,
            priceFormatted: product.priceFormatted || (product.price ? `$${product.price}` : '$0.00'),
            image: productImages[selectedImgIdx] || product.image,
            category: product.category || activeCategory?.name || '',
            categoryId: product.categoryId || activeCategory?.id || null,
            color: selectedColor,
            quantity
        });
    };

    const trendingProducts = React.useMemo(() => {
        return (productsData || [])
            .filter((p) => !p.isBanner && p.id !== product?.id)
            .slice(0, 3);
    }, [product?.id]);

    const enquiryItems = React.useMemo(() => {
        if (!product) return [];
        return [
            {
                id: product.id || 1,
                name: product.name || product.title || 'Product',
                category: activeCategory?.name || product.category || product.type || 'Product',
                price: Number(product.price) || 0,
                quantity: quantity,
                image: productImages[selectedImgIdx] || product.image,
            }
        ];
    }, [product, activeCategory, quantity, productImages, selectedImgIdx]);

    const handleShare = React.useCallback((platform) => {
        shareContent({
            platform,
            url: `${window.location.origin}/product/${productSlug}`,
            title: product?.name || product?.title || 'Check out this product'
        });
    }, [product, productSlug]);

    const price = formatPrice(product?.priceFormatted || product?.price);
    const originalPrice = product?.originalPrice ? formatPrice(product.originalPriceFormatted || product.originalPrice) : null;

    return (
        <Container>
            <div className='py-50 w-full grid-cols-2 sm-grid-cols-1 gap-12'>
                <div className='pr-10 sm-pr-1'>
                    <div className='flex items-start gap-12'>
                        <div className='w-15 sm-w-25 grid-cols-1 gap-12'>
                            {productImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImgIdx(idx)}
                                    className={`cursor-pointer rounded-10 overflow-hidden ${selectedImgIdx === idx ? 'border-primary' : 'border-ec opacity-70'}`}
                                >
                                    <Image
                                        src={resolveImagePath(img)}
                                        alt={`Thumbnail ${idx}`}
                                        className='flex object-cover w-full h-100px rounded-10'
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='w-85 sm-w-75'>
                            {isMagnifyEnabled ? (
                                <Magnify
                                    src={resolveImagePath(productImages[selectedImgIdx])}
                                    alt={product?.name || "Main Product"}
                                    width="100%"
                                    height="500px"
                                    borderRadius="10px"
                                    zoomPosition="inside"
                                    zoomScale={2}
                                    className="w-full h-500 sm-h-350 rounded-10 overflow-hidden"
                                    imgClassName="w-full h-full object-cover rounded-10"
                                />
                            ) : (
                                <Image
                                    src={resolveImagePath(productImages[selectedImgIdx])}
                                    alt={product?.name || "Main Product"}
                                    className='w-full h-500 sm-h-350 object-cover flex rounded-10'
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className='pl-10 sm-pl-1 w-90 sm-w-full sm-mt-20'>
                    {activeCategory && (
                        <div className="mb-8">
                            <Badge
                                text={activeCategory.name}
                                color="primary"
                                size="md"
                                shape="pill"
                                className="uppercase font-600 cursor-pointer"
                                onClick={() => navigate(`/product?category=${encodeURIComponent(activeCategory.name)}`)}
                            />
                        </div>
                    )}

                    <h2 className='head-text text-dark font-600 uppercase my-10 sm-my-6'>
                        {product?.name || product?.title || 'Product'}
                    </h2>
                    <p className='text-gray mini-text font-400'>
                        Vendor: <span className='text-primary font-600'>{import.meta.env.VITE_SITE_NAME}</span> | Brand: <span className='text-primary font-600'>{product?.brand || 'Others'}</span>
                    </p>
                    {isPrice && (
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
                    )}

                    <div className='mt-16 flex items-center gap-12'>
                        <p className='mini-text text-primary border-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-primary" />
                            Modern
                        </p>
                        <p className='mini-text text-gray border-ec w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-gray" />
                            Eco-certified
                        </p>
                        <p className='mini-text text-gray border-ec w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-gray" />
                            Warranty
                        </p>
                    </div>

                    <div className='mt-4'>
                        <p className='mini-text text-primary font-500'>
                            {product?.stockCount ? `Hurry up, only ${product.stockCount} items left in stock.` : 'In stock'}
                        </p>
                        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--forth)', borderRadius: '4px', overflow: 'hidden' }} className='mt-8'>
                            <div style={{ width: `${Math.min(100, Math.max(0, Math.round((product?.stockCount || 10) / 100 * 100)))}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                        </div>
                    </div>

                    <p className='small-text text-gray font-400 mt-10'>
                        {product?.description || "High quality product crafted to provide top-tier durability, exceptional performance, and timeless aesthetics."}
                    </p>

                    {product?.colors && product.colors.length > 0 && (
                        <div className='mt-12'>
                            <p className='mini-text text-dark font-500 uppercase'>
                                Color: <span className='text-gray font-400 ml-2'>{selectedColor}</span>
                            </p>
                            <div className='flex items-center gap-8 mt-6'>
                                {product.colors.map((c, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedColor(c)}
                                        title={c}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '6px',
                                            backgroundColor: c,
                                            cursor: 'pointer',
                                            outline: selectedColor === c ? '2px solid #141414' : 'none',
                                            outlineOffset: '2px'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='mt-12 w-80 sm-w-90'>
                        <p className='mini-text text-dark font-500 uppercase mb-4'>Quantity</p>
                        <Fields
                            type="quantity"
                            value={quantity}
                            onChange={(val) => setQuantity(Math.max(1, Number(val) || 1))}
                            min={1}
                        />
                    </div>

                    <div className='grid-cols-2 gap-12 w-80 mt-12'>
                        <Button
                            onClick={handleAddToCart}
                            text="Add To Cart"
                            version="v3"
                            bg="tertiary"
                            color="dark"
                        />
                        <Button
                            onClick={handleOpenEnquiry}
                            text="Buy It Now"
                            version="v3"
                            bg="primary"
                            color="white"
                        />
                    </div>

                    <div className="flex gap-10 items-center mt-16">
                        <p className="small-text text-gray font-500">Share:</p>
                        <div className="flex gap-10 items-center">
                            {['Facebook', 'WhatsApp', 'Instagram'].map((iconName, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleShare(iconName)}
                                    className="cursor-pointer hover:opacity-80 flex items-center justify-center p-6 bg-forth rounded-full transition-all"
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
                </div>

                <div className='pr-10 sm-pr-1 mt-20'>
                    {product?.specifications && product.specifications.length > 0 && (
                        <div className='grid-cols-2 gap-12 mb-20'>
                            {product.specifications.map((item, idx) => (
                                <div className='bordb p-10' key={idx}>
                                    <h6 className='headmini-text text-dark font-500'>{item.name}</h6>
                                    <p className='text-gray mini-text font-400'>{item.spec}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <Accordion items={accordionItems} />

                    <div className='bg-tertiary p-20 rounded-10 mt-20'>
                        <h3 className='mid-text text-dark font-600 uppercase'>Payment & Security</h3>
                        <p className='text-gray mini-text font-400 mt-4'>
                            Your payment information is processed securely with 256-bit encryption. We do not store card details.
                        </p>
                    </div>
                </div>

                <div className='pl-10 sm-pl-1 w-90 sm-w-full mt-20'>
                    <div>
                        <h3 className='title-text text-muted text-dark font-600 uppercase'>Trending Products</h3>
                        <div className='grid-cols-3 sm-grid-cols-2 gap-12 mt-12'>
                            {trendingProducts.map((p) => (
                                <div key={p.id} className="cursor-pointer" onClick={() => navigate(`/product/${getItemSlug(p)}`, { state: { product: p } })}>
                                    <div className="rounded-10 overflow-hidden h-200">
                                        <Image
                                            src={resolveImagePath(p.image)}
                                            alt={p.name}
                                            className='w-full h-full object-cover flex'
                                        />
                                    </div>
                                    <h4 className='headmini-text text-dark font-600 mt-8 line-clamp1'>{p.name}</h4>
                                    <p className='mini-text text-gray font-600 mt-2'>{p.priceFormatted || `$${p.price}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {isPvcStripCurtains && (
                        <div className='mt-30'>
                            <div className='flex items-center justify-between'>
                                <h3 className='title-text text-dark font-600 uppercase'>Packaging Products</h3>
                                <div
                                    className="icon-lg cursor-pointer bg-primary rounded-full"
                                    onClick={() => setIsPackagingModalOpen(true)}
                                    title="Watch Packaging Video"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setIsPackagingModalOpen(true)}
                                >
                                    <Icon name="Play" width="14" height="14" fill="var(--white)" />
                                </div>
                            </div>
                            <div className='grid-cols-3 sm-grid-cols-2 gap-12 mt-8'>
                                {['Package1.jpeg', 'Package2.jpeg'].map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-10 overflow-hidden h-200"
                                        title="Click to view packaging video"
                                    >
                                        <Image
                                            src={resolveImagePath(img)}
                                            alt={`Packaging ${idx + 1}`}
                                            className='w-full h-full object-cover flex'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={handleCloseEnquiry}
                items={enquiryItems}
                onSetQuantity={handleEnquiryQuantityChange}
            />

            <Modal
                isOpen={isPackagingModalOpen}
                onClose={() => setIsPackagingModalOpen(false)}
                title="Packaging Demonstration"
                size="lg"
            >
                <div className="rounded-10 overflow-hidden bg-dark">
                    <Image
                        src="Packaging.mp4"
                        controls
                        autoPlay
                        className="w-full h-400 sm-h-250 object-contain"
                    />
                </div>
            </Modal>
        </Container>
    );
};

export default React.memo(ProductDetailContent);
