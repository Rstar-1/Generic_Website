import React from 'react';
import agencyVideo from '../../../../assets/agencys.mp4';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import { heroCMS } from '../../../../utils/apiData';

const HeroSections = () => {
    return (
        <Container style={{ background: 'var(--dark)' }}>
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full pt-100 pb-60">
                <div className="">
                    <h1 className='largemid-text font-500 text-white'>
                        {heroCMS.titleLine1}
                        <br />
                        {heroCMS.titleLine2}
                        <br />
                        <span className='text-primary'>{heroCMS.titleHighlight}</span>
                    </h1>
                    <p className='midpara-text text-white mt-16 font-300 w-90'>
                        {heroCMS.leftText}
                    </p>

                </div>
                <div className="h-400">
                    <Image
                        src={agencyVideo}
                        alt="Agency Hero Background Video"
                        className='w-full h-full flex object-contain'
                        preload="auto"
                    />
                </div>
            </div>
        </Container >
    );
};

export default HeroSections;