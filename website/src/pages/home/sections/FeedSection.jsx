import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';

const feedItems = [
    {
        id: 1,
        image: 'https://concept-theme-tech.myshopify.com/cdn/shop/files/headphone-speaker-insta.webp?v=1739932634&width=720',
        products: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=100&q=80'
        ]
    },
    {
        id: 2,
        image: 'https://concept-theme-tech.myshopify.com/cdn/shop/files/earphones-insta.webp?v=1739932644&width=720',
        products: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=100&q=80'
        ]
    },
    {
        id: 3,
        image: 'https://concept-theme-tech.myshopify.com/cdn/shop/files/headphones-insta.webp?v=1739932687&width=720',
        products: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=100&q=80'
        ]
    },
    {
        id: 4,
        image: 'https://concept-theme-tech.myshopify.com/cdn/shop/files/speaker2-insta.webp?v=1739932683&width=720',
        products: [
            'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=100&q=80'
        ]
    }
];

const FeedSection = () => {
    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className='w-full py-50'>
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
                    .feed-card img {
                        transition: transform 0.5s ease;
                    }
                    .feed-card:hover img {
                        transform: scale(1.04);
                    }
                `}</style>

                <Heading
                    version="v2"
                    tag="Product Protection"
                    title="Delivering Innovative IT"
                    subtitle="Empowering enterprises with tailored financial insights and measurable growth strategies."
                    actionText='Show All'
                />

                <div className='grid-cols-4 gap-12 mt-30'>
                    {feedItems.map((item) => (
                        <div
                            key={item.id}
                            className='feed-card relative rounded-10 overflow-hidden h-400 cursor-pointer'
                        >
                            {/* Main Background Image */}
                            <Image
                                src={item.image}
                                alt="Instagram Feed Post"
                                className="feed-img w-full h-full object-cover flex"
                            />

                            <div className='absolute top-0 right-0'>
                                <div className='bg-white rounded-full icon-lg m-15'>
                                    <Icon name="Instagram" width="18" height="18" className="text-danger" />
                                </div>
                            </div>

                            <div className='absolute bottom-0 left-0 w-full'>
                                <div className='p-15'>
                                    <div className='flex items-center gap-12'>
                                        {item.products.map((prodImg, idx) => (
                                            <div key={idx} className='bg-white p-2 rounded-5 shadow-sm'>
                                                <Image
                                                    src={prodImg}
                                                    alt="Tagged Product"
                                                    width='50px'
                                                    height='50px'
                                                    className="flex object-cover rounded-5"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='shop-look-btn-wrapper w-full'>
                                        <Button
                                            text="Shop the Look"
                                            version="v3"
                                            bg="white"
                                            color="dark"
                                            className='rounded-30'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default FeedSection;
