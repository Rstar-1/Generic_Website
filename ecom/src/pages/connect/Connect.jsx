import React, { lazy, Suspense, memo, useMemo } from 'react';
import LazySection from '../../components/common/LazySection';
import Container from '../../components/common/Container';
import Banner from '../../components/layout/generic/Banner';
import SEO from '../../seo';
import { SectionFallback, getCmsData, resolveImagePath } from '../../utils/utils';
import { cmsMap } from '../../utils/apiData';

import Enquiry from './sections/Enquiry';
const PatchSection = lazy(() => import('../home/sections/PatchSection'));

const patchBannerBg = resolveImagePath('Patch1.jpg');

const getSectionCms = (section) =>
    getCmsData(section, cmsMap?.[section]);

const {
    Conn001: bannerTitle,
    Conn002: bannerDesc,
    Conn003: bannerBgImage,
    Conn004: enquiryTag,
    Conn005: enquirySubtitle,
} = getSectionCms("ConnectSection");

const {
    Patch001: patchBadge,
    Patch002: patchTitle,
    Patch003: patchDescription,
} = getSectionCms("PatchSection");

const patchBackground = {
    backgroundImage: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${patchBannerBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
};

const bannerBg = resolveImagePath(bannerBgImage?.url || 'Banner.jpg');

const connectSections = [
    {
        id: 'enquiry',
        Component: Enquiry,
        minHeight: '500px',
        isContainer: true,
        isEager: true,
        props: {
            tag: enquiryTag,
            subtitle: enquirySubtitle,
        },
    },
    {
        id: 'patch',
        Component: PatchSection,
        minHeight: '300px',
        isContainer: true,
        containerClass: 'relative z-10',
        containerStyle: patchBackground,
        props: {
            badge: patchBadge,
            title: patchTitle,
            description: patchDescription,
        },
    },
];

const BREADCRUMBS = [
    { label: 'Home', path: '/' },
    { label: 'Connect Us', path: '/connect' }
];

const Connect = () => {
    return (
        <>
            <SEO page="connect" breadcrumbs={BREADCRUMBS} />
            <Banner
                title={bannerTitle || 'Connect Us'}
                desc={bannerDesc || 'Get In Touch With Us'}
                breadcrumbs={BREADCRUMBS}
                bgImage={bannerBg}
            />
            {connectSections.map(({ id, Component, props = {}, isEager, minHeight, isContainer, containerClass, containerStyle }) => {
                const SectionContent = (
                    <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
                        <Component {...props} />
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