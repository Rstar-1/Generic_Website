import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Heading from '../../../components/layout/generic/Heading';
import { feedCMS } from '../../../utils/apiData';

const FeedSection = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Container>
            <div className='w-full py-50'>
                <style>{`
                    .feed-swiper {
                        padding-bottom: 36px !important;
                    }
                    .feed-swiper .swiper-pagination {
                        bottom: 0px !important;
                    }
                    .feed-swiper .swiper-pagination-bullet {
                        background: var(--gray);
                        opacity: 0.35;
                        width: 8px;
                        height: 8px;
                        transition: all 0.3s ease;
                    }
                    .feed-swiper .swiper-pagination-bullet-active {
                        background: var(--primary);
                        opacity: 1;
                        width: 22px;
                        border-radius: 4px;
                    }
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
                    .feed-nav-btn {
                        width: 38px;
                        height: 38px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        border: 1px solid var(--border-color, #e2e8f0);
                        background: var(--white);
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    .feed-nav-btn:hover {
                        background: var(--primary);
                        color: #ffffff;
                        border-color: var(--primary);
                    }
                `}</style>

                <div className="flex items-end justify-between gap-12">
                    <div className="w-full">
                        <Heading
                            version="v2"
                            tag={feedCMS.heading.tag}
                            title={feedCMS.heading.title}
                        // actionText={feedCMS.heading.actionText}
                        />
                    </div>
                    <div className="flex items-center gap-8 sm-hidden mb-4">
                        <button
                            ref={prevRef}
                            aria-label="Previous Slide"
                            className="feed-nav-btn"
                        >
                            <Icon name="ChevronLeft" width="18" height="18" />
                        </button>
                        <button
                            ref={nextRef}
                            aria-label="Next Slide"
                            className="feed-nav-btn"
                        >
                            <Icon name="ChevronRight" width="18" height="18" />
                        </button>
                    </div>
                </div>

                <div className='mt-30'>
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1.2}
                        loop={feedCMS.feedItems && feedCMS.feedItems.length > 4}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        breakpoints={{
                            480: { slidesPerView: 1.8, spaceBetween: 16 },
                            640: { slidesPerView: 2.2, spaceBetween: 16 },
                            768: { slidesPerView: 3, spaceBetween: 16 },
                            1024: { slidesPerView: 4, spaceBetween: 16 },
                        }}
                        className="feed-swiper"
                    >
                        {feedCMS.feedItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className='feed-card relative rounded-10 overflow-hidden h-400 cursor-pointer'>
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
                                                    text={feedCMS.buttonText}
                                                    version="v3"
                                                    bg="white"
                                                    color="dark"
                                                    className='rounded-30'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Container>
    );
};

export default FeedSection;
