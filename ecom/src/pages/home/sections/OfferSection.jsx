import React from 'react';

import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';

const trendingProducts = [
    {
        id: 1,
        title: 'Select Table Lamps',
        subtitle: 'Get up to $100 Off',
        image: import.meta.env.VITE_IMAGE + "Product3.jpg",
    },
    {
        id: 2,
        title: 'Select Lounge Chairs',
        subtitle: 'From $200',
        image: import.meta.env.VITE_IMAGE + "Product4.jpg",
    },
    {
        id: 3,
        title: 'Select Side tables',
        subtitle: 'Get up to $1.000',
        image: import.meta.env.VITE_IMAGE + "Product5.jpg",
    },
    {
        id: 4,
        title: 'Select Home Decors',
        subtitle: 'Buy One Get One',
        image: import.meta.env.VITE_IMAGE + "Product7.jpg",
    }
];

const OfferSection = () => {
    return (
        <div className='w-full py-50'>
            <div className='grid-cols-2 sm-grid-cols-1 gap-12'>
                <div className='overflow-hidden bg-forth rounded-10 relative sm-h-400' style={{ height: '612px' }}
                >    <Image
                        src={import.meta.env.VITE_IMAGE + "Banner.jpg"}
                        alt="Dining & Kitchen"
                        className='h-full w-full object-cover flex filter-b5'
                    />
                    <div className='absolute bottom-0 left-0 p-20'>
                        <h4 className='large-text text-white uppercase font-600'>
                            Difference in the Details
                        </h4>
                        <p className='para-text text-white  tex-muted font-400 w-90 mt-2'>
                            Highlighting the unique touches that set every piece apart, crafted to elevate your style effortlessly.
                        </p>

                        <Button
                            text="Shop Now"
                            version="v2"
                            bg="white"
                            color="dark"
                            className='mt-14 rounded-20'
                        />
                    </div>
                </div>

                <div className='grid-cols-2 gap-12'>
                    {trendingProducts.map((item) => (
                        <div className='h-300 sm-h-250 overflow-hidden bg-forth rounded-5 relative'
                            key={item.id}
                        >    <Image
                                src={item.image}
                                alt={item.title}
                                className='h-full w-full object-contain flex'
                                style={{ objectPosition: '50% -50%' }}
                            />
                            <div className='absolute bottom-0 left-0 w-full text-center'>
                                <div className='p-14 sm-p-5'>
                                    <h4 className='mid-text text-dark font-600 '>
                                        {item.title}
                                    </h4>
                                    <p className='mini-text text-gray font-400 mt-2'>
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(OfferSection);
