import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Heading from '../../../components/layout/generic/Heading';

const AboutSection = () => {
    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className='w-full py-50'>
                <Heading
                    version="v1"
                    tag="ABOUT US"
                    title="Expert Innovative And Deliver Exceptional For NOT Solution Now."
                    align='left'
                />

                <div className='flex sm-grid-cols-1 items-start mt-70 sm-mt-14' style={{ gap: '20px' }}>
                    <div className='w-40 sm-w-full'>
                        <h4 className='largehead-text font-600 text-dark'>30+</h4>
                        <p
                            className='text-gray small-text font-400 mt-20 sm-mt-8'
                        >
                            We are a results-driven IT consulting team helping businesses unlock efficiency, scale operations, and improve customer experience.
                        </p>
                    </div>

                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                        alt="Team Collaboration"
                        className="w-30 sm-w-full h-200 object-cover rounded-10 flex"
                    />

                    <Image
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                        alt="Developer working on code"
                        className="w-40 sm-w-full h-350 object-cover rounded-10 flex"
                    />

                </div>
            </div>
        </Container>
    );
};

export default AboutSection;