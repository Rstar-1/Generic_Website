import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';

const HeroSections = () => {
    return (
        <Container style={{ background: 'var(--dark)' }} className='relative h-700'>
            <div className="grid-cols-2 items-center gap-12">
                <div className="">
                    <h3 className='text-white large-text font-600'>
                        Delivering Innovative IT solutions Empower In Businesses.
                    </h3>

                    <p className='text-white para-text text-muted font-400 mt-18'>
                        Empowering enterprises with tailored financial insights and measurable growth strategies.
                    </p>
                    <Button
                        text="Get In Touch"
                        onClick={() => navigate("/connect")}
                        icon="ArrowUpRight"
                        iconPosition="right"
                        iconWidth="16"
                        iconHeight="16"
                        version="v2"
                        className="rounded-20 mt-25"
                    />
                </div>
            </div>
            <div className="w-50 h-full absolute top-0 right-0">
                <Image
                    src="https://infitech.ex-coders.com/wp-content/uploads/2026/08/hero.jpg"
                    alt="Software Developer Working on Laptop"
                    className="w-full h-full object-cover flex"
                />
            </div>
        </Container>
    );
};

export default HeroSections;
