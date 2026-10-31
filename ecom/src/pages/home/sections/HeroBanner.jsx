import React from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';

import {
    configData,
    resolveImagePath
} from '../../../utils';

const HEIGHT_MAP = {
    sticky: { 1: 'h-800 sm-h-550', 2: 'h-700 sm-h-550' },
    normal: { 1: 'h-700 sm-h-550', 2: 'h-550' }
};

const HeroBackground = React.memo(({ bgImage }) => (
    <div className='absolute top-0 left-0 w-full h-full z-10'>
        <Image
            src={bgImage?.url}
            alt={bgImage?.alt}
            poster={resolveImagePath('Banner.jpg')}
            className='w-full h-full flex object-cover'
            loading='eager'
            fetchPriority='high'
            decoding='sync'
            width={1920}
            height={700}
        />
        <div
            className='absolute w-full h-full top-0 left-0'
            style={{
                background: 'radial-gradient(ellipse 85% 75% at 70% 0%, rgba(255, 175, 40, 0.28) 0%, rgba(0, 0, 0, 0.5) 90%, rgba(10, 10, 10, 0.95) 100%), linear-gradient(180deg, rgba(10, 10, 10, 0.6) 90%, rgba(10, 10, 10, 0.9) 100%)',
            }}
        />
    </div>
));
HeroBackground.displayName = 'HeroBackground';

const HeroContent = React.memo(({ subtitle, title, description, btnText, onAction, isHeaderSticky, heroVersion }) => (
    <div className={`w-full ${isHeaderSticky ? 'pb-100' : [1, 2].includes(heroVersion) ? 'pb-100 sm-pb-30' : 'pb-60'} relative z-20`}>
        <h1 className='largemid-text text-white font-600 uppercase'>
            <span className='text-primary'>{subtitle}</span><br /> {title}
        </h1>
        <p className='text-white headpara-text text-muted font-300 sm-mt-6 mt-12 max-w-2xl'>
            {description}
        </p>
        <Button
            text={btnText}
            icon="ArrowUpRight"
            iconPosition="right"
            iconWidth="16"
            iconHeight="16"
            version="v1"
            className="rounded-20 mt-18"
            onClick={onAction}
        />
    </div>
));
HeroContent.displayName = 'HeroContent';

const BreadcrumbTab = React.memo(({ heroVersion }) => {
    if (heroVersion !== 2) return null;
    const mask = `url(${resolveImagePath('Mask3.png')})`;
    return (
        <div
            className="hero-breadcrumb-tab"
            style={{ WebkitMaskImage: mask, maskImage: mask }}
        />
    );
});
BreadcrumbTab.displayName = 'BreadcrumbTab';

const HeroBanner = React.memo(({
    title,
    subtitle,
    description,
    bgImage,
    btnText,
    btnLink
}) => {
    const navigate = useNavigate();

    const heroVersion = configData?.HeroBanner?.[0]?.HeroBannerType ?? 1;
    const isHeaderSticky = Boolean(
        configData?.HeaderSticky ??
        configData?.Header?.HeaderSticky ??
        configData?.Header?.[0]?.HeaderSticky
    );

    const handleAction = React.useCallback(() => {
        navigate(btnLink || '/products');
    }, [navigate, btnLink]);

    const heightClass = HEIGHT_MAP[isHeaderSticky ? 'sticky' : 'normal']?.[heroVersion] || (isHeaderSticky ? 'h-650 sm-h-550' : 'h-550');

    const containerStyle = React.useMemo(() => {
        if (heroVersion === 1) {
            const mask = `url(${resolveImagePath('Mask1.png')})`;
            return { WebkitMaskImage: mask, maskImage: mask };
        }
        return { position: 'relative', overflow: 'hidden', borderRadius: '0 0 25px 25px', minHeight: '550px' };
    }, [heroVersion]);

    return (
        <Container
            className={`${heightClass} ${heroVersion === 1 ? 'hero-banner-mask-v1' : ''} ${heroVersion === 1 ? 'flex items-center' : 'flex items-end'}`}
            style={containerStyle}
        >
            <HeroBackground bgImage={bgImage} />
            <HeroContent
                title={title}
                subtitle={subtitle}
                description={description}
                btnText={btnText}
                onAction={handleAction}
                isHeaderSticky={isHeaderSticky}
                heroVersion={heroVersion}
            />
            <BreadcrumbTab heroVersion={heroVersion} />
        </Container>
    );
});
HeroBanner.displayName = 'HeroBanner';

export default HeroBanner;
