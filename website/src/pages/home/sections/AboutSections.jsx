import React from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import aboutThumb from '../../../assets/about-thumb1-1.1.jpg';
import aboutMask from '../../../assets/about-thumb-mask1-1.1.png';

const features = [
    'Skilled personnel',
    'Best Veterinarians',
    'Nutrition and Diet',
    'Quality Foods',
    'Grooming Tips',
    'Emergency Care'
];

const maskStyles = {
    WebkitMaskImage: `url("${aboutMask}")`,
    maskImage: `url("${aboutMask}")`,
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center'
};

const AboutSections = () => {
    return (
        <Container>
            <div className='w-full py-50'>
                <div className='grid-cols-2 gap-12 items-center'>
                    <div className='pr-10 sm-pr-0'>
                        <p className='mini-text text-primary border-primary w-max px-14 py-4 rounded-20 flex items-center gap-8 font-500 uppercase mb-8'>
                            <Icon name='Box' width="14" height="14" className="text-primary" />
                            Modern
                        </p>

                        <h2 className='large-text text-dark font-700 mt-12 uppercase'>
                            We are a fully committed to your pet's well-being
                        </h2>

                        <p className='para-text text-gray font-400 mt-16'>
                            For over 12 years, we've been dedicated to making pets look fabulous and feel loved. Because to us, your pet isn't just a client - they're family.
                        </p>
                        <div className='grid-cols-2 gap-12 mt-25'>
                            {features.map((item, idx) => (
                                <div key={idx} className='flex items-center gap-8'>
                                    <div
                                        className='icon flex items-center justify-center border-primary rounded-full'
                                    >
                                        <Icon name="Checkmark" width="12" height="12" className="text-primary" />
                                    </div>
                                    <p className='small-text text-dark font-500'>
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className='flex items-center gap-12 mt-34'>
                            <Button
                                text="Learn More"
                                icon="ArrowUpRight"
                                iconPosition="right"
                                iconWidth="16"
                                iconHeight="16"
                                version="v2"
                                className='rounded-20'
                            />

                            <div className='flex items-center gap-8 ml-8'>
                                <div className='icon-lg rounded-full border-primary flex items-center justify-center'>
                                    <Icon name="Phone" width="20" height="20" className="text-dark" />
                                </div>
                                <div>
                                    <p className='mini-text text-gray font-400'>
                                        Call us:
                                    </p>
                                    <p className='mini-text text-dark font-600'>
                                        +00-(120) 3456 789
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pl-10 sm-pl-0'>
                        <div
                            className='bg-mask w-full h-600 relative overflow-hidden flex'
                            style={maskStyles}
                        >
                            <Image
                                src='https://infitech.ex-coders.com/wp-content/uploads/2026/08/heroBg1_1.jpg'
                                alt="About Pet Grooming"
                                className="w-full h-full object-cover flex"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AboutSections;
