import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';

const HeroSections = () => {
    return (
        <Container style={{ background: 'var(--dark)' }} className='relative h-700 sm-h-full'>
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="sm-py-100 sm-relative z-50">
                    <h3 className='text-white large-text font-600'>
                        Delivering Innovative IT solutions Empower In Businesses.
                    </h3>

                    <p className='text-white para-text text-muted font-400 mt-18 sm-mt-6'>
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
                        className="rounded-20 mt-25 sm-mt-12"
                    />
                </div>
            </div>
            <div className="w-50 h-full sm-w-full absolute bottom-0 right-0">
                <Image
                    src="https://infitech.ex-coders.com/wp-content/uploads/2026/08/hero.jpg"
                    alt="Software Developer Working on Laptop"
                    className="w-full h-full object-cover flex sm-filter-b4"
                />
            </div>
        </Container>
    );
};

export default HeroSections;
