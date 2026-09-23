import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Container from '../../../../components/common/Container';
import Icon from '../../../../components/common/Icon';

const scaleItems = [
    {
        id: 1,
        title: 'Customer Service',
        subtitle: 'Mon-Sat, 9am-6pm EST.',
        icon: 'Users'
    },
    {
        id: 2,
        title: 'Call Us',
        subtitle: '+91 7015163045',
        icon: 'Phone',
        link: 'tel:+917015163045'
    },
    {
        id: 3,
        title: 'Get in Touch',
        subtitle: 'kohad0681@gmail.com',
        icon: 'Send',
        link: 'mailto:kohad0681@gmail.com'
    },
    {
        id: 4,
        title: 'Address',
        subtitle: 'Apollo Bandar, Colaba, Mumbai',
        icon: 'MapPin'
    }
];

const ScaleSection = () => {
    return (
        <Container style={{ backgroundColor: 'var(--primary)' }}>
            <div className="w-full py-24 sm-py-16">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1.15}
                    spaceBetween={16}
                    grabCursor={true}
                    rewind={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        480: { slidesPerView: 1.6, spaceBetween: 16 },
                        640: { slidesPerView: 2.2, spaceBetween: 20 },
                        768: { slidesPerView: 2.8, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                >
                    {scaleItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="flex items-center gap-12">
                                <div className="icon-lg bg-white rounded-full flex-shrink-0">
                                    <Icon
                                        name={item.icon}
                                        width="18"
                                        height="18"
                                        stroke="var(--primary)"
                                        strokeWidth="2"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="headmini-text font-500 text-white line-clamp1">
                                        {item.title}
                                    </h4>
                                    {item.link ? (
                                        <a href={item.link}>
                                            <p className="small-text text-white text-muted font-200 line-clamp1">
                                                {item.subtitle}
                                            </p>
                                        </a>
                                    ) : (
                                        <p className="small-text text-white text-muted font-200 line-clamp1">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
};

export default memo(ScaleSection);
