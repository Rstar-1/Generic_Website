import React from 'react';
import agencyVideo from '../../../assets/agency.mp4';
import heroMask from '../../../assets/hero-bg1-mask.png';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';


const HeroBanner = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const update = () => setIsMobile(window.innerWidth <= 768);

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    }, []);

    const maskSize = isMobile ? '260% 100%' : '100% 100%';

    const maskStyles = {
        WebkitMaskImage: `url(${heroMask})`,
        WebkitMaskSize: maskSize,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',

        maskImage: `url(${heroMask})`,
        maskSize,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
    };

    return (
        <Container version='v0' className='h-750 sm-h-550 relative w-full flex items-center' style={maskStyles}>
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-10'>
                <Image
                    src={agencyVideo}
                    alt="Agency Hero Background Video"
                    className='w-full h-full'
                    style={{
                        objectFit: 'cover',
                        opacity: 0.55,
                        filter: 'brightness(0.75) contrast(1.1)'
                    }}
                />
                <div className='absolute w-full h-full top-0 left-0'
                    style={{
                        background: 'radial-gradient(ellipse 95% 95% at 60% 0%, rgba(73, 186, 166, 0.28) 0%, rgba(0, 0, 0, 0.5) 90%, rgba(10, 10, 10, 0.95) 100%), linear-gradient(180deg, rgba(10, 10, 10, 0.4) 90%, rgba(10, 10, 10, 0.3) 100%)',
                    }}
                />
            </div>
            <Container className='relative z-10'>
                <div className='w-full pb-40 sm-pb-30'>
                    <h1 className='largehead-text text-white font-600'>
                        A ERA IN
                        <br />
                        <span className='text-primary'>COMMUNICATION</span>
                    </h1>
                    <p className='text-white headpara-text font-400 sm-mt-6 mt-12'>Are You Struggling To Turn Your <br />Ideas Into Something Users Love? Pixelr Designs Digital Products.</p>
                    <Button
                        text="Get In Touch"
                        icon="ArrowUpRight"
                        iconPosition="right"
                        iconWidth="16"
                        iconHeight="16"
                        version="v2"
                        className="rounded-20 mt-18"
                    />
                </div>
            </Container>
        </Container>
    );
};

export default HeroBanner;
