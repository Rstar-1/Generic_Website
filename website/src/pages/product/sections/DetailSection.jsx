import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const productImages = [
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80'
];

const crossSellProducts = [
    {
        id: 1,
        name: 'Arc Chair',
        price: '$699.00',
        oldPrice: '$730.00',
        image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        name: 'Abella Jug',
        price: '$115.00',
        image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        name: 'Beam Table',
        price: '$215.00',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'
    }
];

const ProductDetailContent = () => {
    const [selectedImgIdx, setSelectedImgIdx] = useState(0);
    const [selectedColor, setSelectedColor] = useState('Black');
    const [selectedMaterial, setSelectedMaterial] = useState('Oak');
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (name) => {
        setOpenAccordion(openAccordion === name ? null : name);
    };

    return (
        <Container version="v2">
            <div className='py-50 w-full'>
                {/* Top Section: Gallery & Purchase controls */}
                <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '80px' }}>
                    {/* Left Column - Gallery */}
                    <div style={{ flex: '1 1 50%', minWidth: '320px', display: 'flex', gap: '20px' }}>
                        {/* Thumbnail Strip */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {productImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImgIdx(idx)}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: selectedImgIdx === idx ? '2px solid #141414' : '1px solid #E5E7EB',
                                        padding: '4px',
                                        backgroundColor: '#F8F8F8'
                                    }}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image Box */}
                        <div
                            style={{
                                flex: 1,
                                backgroundColor: '#F8F8F8',
                                borderRadius: '20px',
                                padding: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '440px'
                            }}
                        >
                            <Image
                                src={productImages[selectedImgIdx]}
                                alt="Main Product"
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Right Column - Product Meta & Purchase */}
                    <div style={{ flex: '1 1 42%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#141414', marginBottom: '8px' }}>
                                Arc Chair Limited
                            </h1>
                            <p style={{ fontSize: '13px', color: '#666666', margin: 0 }}>
                                Vendor: <span style={{ color: '#2563EB', fontWeight: '600' }}>FoxEcom</span> | Type: <span style={{ color: '#2563EB', fontWeight: '600' }}>Chairs</span>
                            </p>
                        </div>

                        <div style={{ fontSize: '26px', fontWeight: '800', color: '#141414' }}>
                            $699.00
                        </div>

                        {/* Features Badges */}
                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#141414', fontWeight: '600' }}>
                            <span>✓ Modern</span>
                            <span>✓ Eco-certified</span>
                            <span>✓ Warranty</span>
                        </div>

                        {/* Stock Alert */}
                        <div>
                            <p style={{ fontSize: '12px', color: '#059669', fontWeight: '600', marginBottom: '6px' }}>
                                Hurry up, only 8 items left in stock.
                            </p>
                            <div style={{ width: '100%', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '35%', height: '100%', backgroundColor: '#10B981' }} />
                            </div>
                        </div>

                        <p style={{ fontSize: '12px', color: '#888888', lineHeight: '1.5' }}>
                            This is a demonstration store by FoxEcom. All images, videos, and other content belong exclusively to FoxEcom and are not authorized for reuse on any other stores.
                        </p>

                        {/* Color Selector */}
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#141414', display: 'block', marginBottom: '8px' }}>
                                Color: <span style={{ fontWeight: '400', color: '#666666' }}>{selectedColor}</span>
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div
                                    onClick={() => setSelectedColor('Black')}
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '6px',
                                        backgroundColor: '#141414',
                                        cursor: 'pointer',
                                        outline: selectedColor === 'Black' ? '2px solid #141414' : 'none',
                                        outlineOffset: '2px'
                                    }}
                                />
                                <div
                                    onClick={() => setSelectedColor('Wood')}
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '6px',
                                        backgroundColor: '#A0522D',
                                        cursor: 'pointer',
                                        outline: selectedColor === 'Wood' ? '2px solid #141414' : 'none',
                                        outlineOffset: '2px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Material Selector */}
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#141414', display: 'block', marginBottom: '8px' }}>
                                Material: <span style={{ fontWeight: '400', color: '#666666' }}>{selectedMaterial}</span>
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {['Oak', 'Pine'].map((mat) => (
                                    <button
                                        key={mat}
                                        onClick={() => setSelectedMaterial(mat)}
                                        style={{
                                            padding: '6px 20px',
                                            borderRadius: '20px',
                                            fontSize: '13px',
                                            fontWeight: '700',
                                            border: selectedMaterial === mat ? 'none' : '1px solid #141414',
                                            backgroundColor: selectedMaterial === mat ? '#141414' : 'transparent',
                                            color: selectedMaterial === mat ? '#FFFFFF' : '#141414',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {mat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart Controls */}
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '10px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '24px',
                                    padding: '6px 16px',
                                    gap: '16px'
                                }}
                            >
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: '700' }}
                                >
                                    -
                                </button>
                                <span style={{ fontSize: '14px', fontWeight: '700' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: '700' }}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                style={{
                                    flex: 1,
                                    backgroundColor: '#EDEDED',
                                    color: '#141414',
                                    borderRadius: '24px',
                                    padding: '14px',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Add To Cart
                            </button>
                        </div>

                        <button
                            style={{
                                width: '100%',
                                backgroundColor: '#141414',
                                color: '#FFFFFF',
                                borderRadius: '24px',
                                padding: '14px',
                                fontWeight: '700',
                                fontSize: '14px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Buy It Now
                        </button>

                        {/* Shipping & Returns perks */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#444444', marginTop: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icon name="Truck" width="16" height="16" stroke="#444444" />
                                <span>Free International Shipping over $500</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icon name="RotateCcw" width="16" height="16" stroke="#444444" />
                                <span>Free Returns Within 30 days</span>
                            </div>
                        </div>

                        {/* Store Pickup Banner */}
                        <div
                            style={{
                                border: '1px solid #E5E7EB',
                                borderRadius: '12px',
                                padding: '14px 18px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '8px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Icon name="ShoppingBag" width="20" height="20" stroke="#141414" />
                                <div>
                                    <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#141414', margin: 0 }}>
                                        Pickup available at California Store
                                    </h5>
                                    <span style={{ fontSize: '11px', color: '#888888' }}>Usually ready in 24 hours</span>
                                </div>
                            </div>
                            <Icon name="ChevronRight" width="16" height="16" stroke="#141414" />
                        </div>

                        {/* Limited Time Offer */}
                        <div
                            style={{
                                backgroundColor: '#E6F4EA',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                color: '#047857'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icon name="Zap" width="16" height="16" stroke="#047857" />
                                <span>
                                    <strong>Limited time offer:</strong> Get $20 off when you spend $1,000 or more!{' '}
                                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Learn more</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Split Accordions & Perfect Match */}
                <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Bottom Left: Accordions & Security */}
                    <div style={{ flex: '1 1 50%', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            {['Specifications', 'Product Details', 'Materials & Care'].map((accTitle) => (
                                <div
                                    key={accTitle}
                                    style={{ borderBottom: '1px solid #E5E7EB', padding: '16px 0' }}
                                >
                                    <div
                                        onClick={() => toggleAccordion(accTitle)}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#141414', margin: 0 }}>
                                            {accTitle}
                                        </h4>
                                        <span style={{ fontSize: '20px', fontWeight: '400', color: '#141414' }}>
                                            {openAccordion === accTitle ? '-' : '+'}
                                        </span>
                                    </div>
                                    {openAccordion === accTitle && (
                                        <p style={{ fontSize: '13px', color: '#666666', lineHeight: '1.6', marginTop: '12px' }}>
                                            Crafted with premium oak wood and ergonomic curvature. Built for durability, warmth, and modern interior aesthetics.
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Payment & Security Card */}
                        <div
                            style={{
                                backgroundColor: '#EEF2FF',
                                borderRadius: '16px',
                                padding: '24px'
                            }}
                        >
                            <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#141414', marginBottom: '12px' }}>
                                Payment & Security
                            </h5>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                {['VISA', 'MC', 'AMEX', 'PayPal', 'Discover'].map((card) => (
                                    <span
                                        key={card}
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '4px',
                                            padding: '4px 10px',
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            color: '#1E40AF',
                                            border: '1px solid #CBD5E1'
                                        }}
                                    >
                                        {card}
                                    </span>
                                ))}
                            </div>
                            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                                Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Right: Perfect Match With Cross-sell */}
                    <div style={{ flex: '1 1 42%', minWidth: '300px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#141414', marginBottom: '20px' }}>
                            Perfect Match With
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                            {crossSellProducts.map((p) => (
                                <div key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div
                                        style={{
                                            backgroundColor: '#F8F8F8',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            height: '140px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '8px'
                                        }}
                                    >
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            style={{ maxHeight: '110px', maxWidth: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#141414' }}>
                                        {p.name}
                                    </span>
                                    <div style={{ display: 'flex', gap: '6px', fontSize: '12px', alignItems: 'center', marginTop: '2px', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '700', color: p.oldPrice ? '#DC2626' : '#141414' }}>
                                            {p.price}
                                        </span>
                                        {p.oldPrice && (
                                            <span style={{ color: '#94A3B8', textDecoration: 'line-through' }}>
                                                {p.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        style={{
                                            backgroundColor: '#141414',
                                            color: '#FFFFFF',
                                            borderRadius: '20px',
                                            padding: '6px 14px',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Share Links */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: '700', color: '#141414' }}>
                            <span>Share:</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['Facebook', 'Twitter', 'Share2'].map((iconName, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: '1px solid #E5E7EB',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Icon name={iconName} width="14" height="14" stroke="#141414" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetailContent;
