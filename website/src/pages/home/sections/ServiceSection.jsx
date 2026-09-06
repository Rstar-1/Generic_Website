import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Heading from '../../../components/layout/generic/Heading';
import Icon from '../../../components/common/Icon';

const badges = [
    'All Eco-Certified',
    'Make It Yours',
    'Unique Tailored'
];

const services = [
    {
        id: 1,
        title: 'Comfortable',
        description: 'Bow Chair is available in Natural or Black-stained Oak with full EU Ecolabel certification.',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        title: 'Price transparency',
        description: 'Fair pricing ensures you know exactly what you\'re paying for, with no hidden costs or markups.',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 3,
        title: 'All eco-certified',
        description: 'All products consider a more holistic environmental impact and are designed for a longer lifetime in a way.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 4,
        title: 'Sustainability',
        description: 'Committed to sustainable practices, ethical sourcing, and reducing environmental impact.',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80'
    }
];

const ServiceSection = () => {
    return (
        <Container>
            <div className='w-full py-50'>
                <Heading
                    version="v1"
                    tag='Our Specification'
                    title="This approach resulted in the beautiful structure"
                />

                <div className='flex items-center justify-center gap-10 flex-wrap mt-20 mb-40'>
                    {badges.map((badge, idx) => (
                        <p
                            key={idx} className='small-text text-white bg-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-white" />
                            {badge}
                        </p>
                    ))}
                </div>

                <div className='grid-cols-4 sm-grid-cols-2 w-85 sm-w-full mx-auto' style={{ gap: '16px' }}>
                    {services.map((item) => (
                        <div key={item.id} className='w-full'>
                            <Image
                                src={item.image}
                                alt={item.title}
                                className='w-full h-250 sm-h-200 object-cover flex rounded-10'
                            />
                            <h3 className='mid-text text-dark font-600 mt-12'>
                                {item.title}
                            </h3>
                            <p className='mini-text text-gray font-400 mt-2'>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ServiceSection;