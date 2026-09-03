import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';

const offerBanners = [
    {
        id: 1,
        title: 'Turn Chairs',
        description: 'Elevate your space with 40% off our timeless designs!',
        buttonText: 'Shop Now',
        discountLabel: 'Save',
        discountPercent: '40%',
        bgColor: '#F9EAE9',
        badgeBg: '#74b9f5ff',
        badgeColor: '#000000',
        image: 'https://hyper-theme-demo.myshopify.com/cdn/shop/files/collection-slider-3.jpg?v=1750909889&width=600'
    },
    {
        id: 2,
        title: 'Cross Chairs',
        description: "Get 30% off elegant, timeless seating—don't miss out!",
        buttonText: 'Shop Now',
        discountLabel: 'Save',
        discountPercent: '30%',
        bgColor: '#E3EFE6',
        badgeBg: '#C8281E',
        badgeColor: '#FFFFFF',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80'
    }
];

const categoryPills = [
    {
        id: 1,
        name: 'Living Room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 2,
        name: 'Planters',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 3,
        name: 'Gravel Rug',
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 4,
        name: 'Table Mirror',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 5,
        name: 'Table Wears',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 6,
        name: 'Dining Decor',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 7,
        name: 'Ray Table Lamp',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 8,
        name: 'Chairs',
        image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=120&q=80'
    },
    {
        id: 9,
        name: 'Living Room',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=120&q=80'
    }
];

const OfferSection = () => {
    return (
        <Container version="v2" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="w-full py-50">
                {/* 2 Banner Cards Row */}
                <div className="grid-cols-2 md-grid-1 gap-12">
                    {offerBanners.map((banner) => (
                        <div
                            key={banner.id}
                            style={{
                                backgroundColor: banner.bgColor,
                            }}
                            className='flex items-center gap-12 p-30 rounded-20'
                        >
                            <div className='w-50'>
                                <h2 className='text-dark head-text font-600'>
                                    {banner.title}
                                </h2>
                                <p className='small-text mt-2 text-gray'>
                                    {banner.description}
                                </p>
                                <button
                                    style={{
                                        backgroundColor: '#000000',
                                        color: '#FFFFFF',
                                        borderRadius: '30px',
                                        padding: '12px 30px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease'
                                    }}
                                    className='mt-20'
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                >
                                    {banner.buttonText}
                                </button>
                            </div>
                            <div className='relative w-50 flex items-center justify-center'>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        width: '76px',
                                        height: '76px',
                                        borderRadius: '50%',
                                        backgroundColor: banner.badgeBg,
                                        color: banner.badgeColor,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 3
                                    }}
                                >
                                    <p className='mini-text mt-2 text-white'>
                                        {banner.discountLabel}
                                    </p>
                                    <p className='small-text mt-2 text-white'>
                                        {banner.discountPercent}
                                    </p>
                                </div>

                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    className='w-full h-250 object-cover flex rounded-10'
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Category Quick Pills Bar */}
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        overflowX: 'auto',
                        marginTop: '40px',
                        paddingBottom: '10px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {categoryPills.map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            style={{
                                border: '1px solid #EAEAEA',
                                borderRadius: '40px',
                                padding: '6px 20px 6px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                backgroundColor: '#FFFFFF',
                                flexShrink: 0,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#141414';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#EAEAEA';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    backgroundColor: '#F5F5F5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#141414', whiteSpace: 'nowrap' }}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default OfferSection;