import React, { lazy, Suspense, memo, useMemo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { SectionFallback, getCmsData, resolveImagePath } from '../../utils/utils';
import { cmsMap } from '../../utils/apiData';

const Enquiry = lazy(() => import('./sections/Enquiry'));
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBannerBg = resolveImagePath('Patch1.jpg');

const connectSections = [
    {
        id: 'enquiry',
        cmsKey: 'ConnectSection',
        Component: Enquiry,
        minHeight: '500px',
        isContainer: true
    },
    {
        id: 'patch',
        cmsKey: 'PatchSection',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: {
            backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/home' },
    { label: 'Connect Us', path: '/connect' }
];

const Connect = () => {
    const cms = useMemo(() => getCmsData('ConnectSection', cmsMap?.ConnectSection), []);

    const title = cms.getText('Conn001', 'Connect Us');
    const desc = cms.getText('Conn002', 'Get In Touch With Us');
    const bgImage = cms.getImage('Conn003');
    const bannerBg = resolveImagePath(bgImage?.url || 'Banner.jpg');

    return (
        <>
            <SEO page="connect" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={title}
                desc={desc}
                breadcrumbs={BREADCRUMBS}
                bgImage={bannerBg}
            />
            {connectSections.map(({ id, cmsKey, Component, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component {...getCmsData(cmsKey, cmsMap?.[cmsKey])} cms={getCmsData(cmsKey, cmsMap?.[cmsKey])} />
                    </Suspense>
                );

                const Content = isContainer ? (
                    <Container className={containerClass} style={containerStyle}>
                        {SectionContent}
                    </Container>
                ) : (
                    SectionContent
                );

                return isEager ? (
                    <React.Fragment key={id}>
                        {Content}
                    </React.Fragment>
                ) : (
                    <LazySection
                        key={id}
                        placeholderHeight={minHeight}
                        placeholder={<SectionFallback minHeight={minHeight} />}
                    >
                        {Content}
                    </LazySection>
                );
            })}
        </>
    );
};

export default memo(Connect);