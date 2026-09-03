import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import slider1 from '../../../assets/collection-slider-1.jpg';
import slider2 from '../../../assets/collection-slider-2.jpg';
import slider3 from '../../../assets/collection-slider-3.jpg';
import Heading from '../../../components/layout/generic/Heading';

const categories = [
    {
        id: 1,
        title: "Sale Items",
        image: slider3
    },
    {
        id: 2,
        title: "Press Tables",
        image: slider1
    },
    {
        id: 3,
        title: "Lighting",
        image: slider2
    },
    {
        id: 4,
        title: "Spoke Sofa",
        image: slider3
    },
    {
        id: 5,
        title: "Storage",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        title: "Turn Chairs",
        image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        title: "Longe Chairs",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 8,
        title: "Curve Coat",
        image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 9,
        title: "Cross Tables",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 10,
        title: "Bend Chairs",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 11,
        title: "Bar Chairs",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 12,
        title: "Accessories",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=300&q=80"
    }
];

const CategorySection = () => {
    return (
        <Container>
            <div className='w-full py-50'>
                <Heading
                    version="v1"
                    tag="WHAT WE PROVIDE"
                    title="Expert Innovative And Deliver Exceptional For NOT Solution Now."
                />

                <div
                    className='grid-cols-6 mt-30 border-ec'
                >
                    {categories.map((item, index) => {
                        const isLastInRow = (index + 1) % 6 === 0;
                        const isTopRow = index < 6;

                        return (
                            <div
                                key={item.id}
                                style={{
                                    borderRight: isLastInRow ? 'none' : '1px solid #EBEBEB',
                                    borderBottom: isTopRow ? '1px solid #EBEBEB' : 'none'
                                }}
                                className='p-25 grid-cols-1'
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width='90px'
                                    height='90px'
                                    className="rounded-full object-cover flex mx-auto"
                                />
                                <p
                                    className='small-text text-center text-dark font-500 mt-16'
                                >
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default CategorySection;
