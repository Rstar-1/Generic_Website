import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../../../components/common/Container';
import Badge from '../../../../components/common/Badge';
import Image from '../../../../components/common/Image';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: 1,
        serviceName: 'AI + Human Collaboration',
        description:
            'AI as a guide that empowers humans and improves digital workflows.',
        image: '/images/services/ai-human-collaboration.jpg',
        serviceLists: [
            { label: 'AI Workflow Automation', url: '/services' },
            { label: 'Human-in-the-Loop AI', url: '/services' },
            { label: 'Prompt Engineering', url: '/services' },
            { label: 'Intelligent Assistants', url: '/services' },
            { label: 'Augmented Productivity', url: '/services' }
        ]
    },
    {
        id: 2,
        serviceName: 'Digital Business Intelligence',
        description:
            'Use data intelligence, predictive systems, automation, and scalable technology.',
        image: '/images/services/digital-business-intelligence.jpg',
        serviceLists: [
            { label: 'Predictive Analytics', url: '/services' },
            { label: 'Data Intelligence', url: '/services' },
            { label: 'Automated Reporting', url: '/services' },
            { label: 'Business Automation', url: '/services' },
            { label: 'Scalable Tech Infrastructure', url: '/services' }
        ]
    },
    {
        id: 3,
        serviceName: 'SEO & Organic Reach',
        description:
            'Improve organic visibility, audience engagement, and sustainable website growth.',
        image: '/images/services/seo-organic-reach.jpg',
        serviceLists: [
            { label: 'Technical SEO', url: '/services' },
            { label: 'Organic Visibility', url: '/services' },
            { label: 'Audience Engagement', url: '/services' },
            { label: 'Content Strategy', url: '/services' },
            { label: 'Sustainable Traffic Growth', url: '/services' }
        ]
    },
    {
        id: 4,
        serviceName: 'Smart Promotion Tools',
        description:
            'Combine algorithmic intelligence with digital campaigns for reach, visibility, and engagement.',
        image: '/images/services/smart-promotion-tools.jpg',
        serviceLists: [
            { label: 'Algorithmic Campaigns', url: '/services' },
            { label: 'Multi-Channel Marketing', url: '/services' },
            { label: 'Performance Marketing', url: '/services' },
            { label: 'Targeted Reach', url: '/services' },
            { label: 'Conversion Optimization', url: '/services' }
        ]
    },
    {
        id: 5,
        serviceName: 'Privacy & Secure Digital Systems',
        description:
            'Respect privacy while using publicly visible data and secure backend systems.',
        image: '/images/services/privacy-secure-systems.jpg',
        serviceLists: [
            { label: 'Data Privacy Compliance', url: '/services' },
            { label: 'Secure Backend Systems', url: '/services' },
            { label: 'Access Control & Encryption', url: '/services' },
            { label: 'Public Data Intelligence', url: '/services' },
            { label: 'Cloud Security', url: '/services' }
        ]
    },
    {
        id: 6,
        serviceName: 'Business Growth & Automation',
        description:
            'Build smarter, scalable digital solutions focused on trust, engagement, innovation, and measurable business value.',
        image: '/images/services/business-growth-automation.jpg',
        serviceLists: [
            { label: 'Scalable Digital Solutions', url: '/services' },
            { label: 'Workflow Automation', url: '/services' },
            { label: 'Enterprise Innovation', url: '/services' },
            { label: 'Measurable ROI', url: '/services' },
            { label: 'Customer Engagement', url: '/services' }
        ]
    }
];

const ServiceSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
    );

    const reversedServices = useMemo(() => [...services].reverse(), []);

    useEffect(() => {
        const media = window.matchMedia('(min-width: 1024px)');
        const updateMedia = (e) => setIsDesktop(e.matches);
        setIsDesktop(media.matches);
        media.addEventListener('change', updateMedia);
        return () => media.removeEventListener('change', updateMedia);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const sectionEl = sectionRef.current;
        const textEl = textRef.current;
        const imageEl = imageRef.current;
        if (!sectionEl || !textEl || !imageEl) return;

        const totalSteps = services.length - 1;
        let currentStep = 0;

        const ctx = gsap.context(() => {
            const animateText = gsap.quickTo(textEl, 'yPercent', {
                duration: 0.6,
                ease: 'power3.inOut'
            });

            const animateImage = gsap.quickTo(imageEl, 'yPercent', {
                duration: 0.6,
                ease: 'power3.inOut'
            });

            ScrollTrigger.create({
                trigger: sectionEl,
                start: 'top top',
                end: () => `+=${totalSteps * 550}`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                    if (self.spacer) {
                        self.spacer.style.backgroundColor = 'var(--dark)';
                    }
                },
                onUpdate: (self) => {
                    const step = Math.round(self.progress * totalSteps);
                    const clamped = Math.max(0, Math.min(totalSteps, step));
                    if (clamped !== currentStep) {
                        currentStep = clamped;
                        animateText(100 * clamped);
                        animateImage(-100 * clamped);
                    }
                }
            });
        }, sectionRef);

        const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
        const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
        const t3 = setTimeout(() => ScrollTrigger.refresh(), 1000);

        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            window.removeEventListener('load', handleLoad);
            ctx.revert();
        };
    }, [isDesktop]);

    return (
        <Container
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ background: 'var(--dark)' }}
        >
            {isDesktop ? (
                <div className="w-full h-100 overflow-hidden z-10 relative">
                    <div
                        ref={textRef}
                        className="absolute h-full w-50 will-change-transform"
                        style={{ top: `-${(services.length - 1) * 100}%`, zIndex: 1 }}
                    >
                        {reversedServices.map((service) => (
                            <div
                                key={`desktop-text-${service.id}`}
                                className="w-90 h-100 flex items-center"
                            >
                                <div className="w-full">
                                    <h2 className="large-text font-500 text-white uppercase">
                                        {service.serviceName}
                                    </h2>
                                    <p className="headpara-text font-300 mt-10 mb-30 text-white" style={{ opacity: 0.85 }}>
                                        {service.description}
                                    </p>

                                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }} />

                                    <div className="flex flex-wrap gap-12 mt-40">
                                        {service.serviceLists.map((item, idx) => (
                                            <a key={idx} href={item.url} className="decoration-none inline-flex">
                                                <Badge
                                                    text={item.label}
                                                    shape="pill"
                                                    variant="outline"
                                                    icon="ArrowUpRight"
                                                    iconPosition="right"
                                                    iconSize={13}
                                                    capitalize={false}
                                                    bg=""
                                                    textColor="white"
                                                    borderColor="rgba(255, 255, 255, 0.2)"
                                                    size='lg'
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        ref={imageRef}
                        className="absolute right-0 w-50 h-full will-change-transform"
                        style={{ top: '0%' }}
                    >
                        {services.map((service) => (
                            <div
                                key={`desktop-media-${service.id}`}
                                className="w-full h-100 relative flex items-center justify-center overflow-hidden"
                            >
                                <Image
                                    src={service.image}
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full grid-cols-1 gap-12">
                    {services.map((service) => (
                        <div key={`mobile-${service.id}`} className="w-full overflow-hidden rounded-10 flex flex-column">
                            <div
                                className="relative w-full overflow-hidden rounded-10 mb-20"
                                style={{ aspectRatio: '16 / 10' }}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="px-5 flex flex-column">
                                <h2 className="font-400 text-white m-0" style={{ fontSize: '24px', lineHeight: 1.2 }}>
                                    {service.serviceName}
                                </h2>
                                <p className="font-300 mt-10 mb-18 text-white" style={{ opacity: 0.8, fontSize: '14px', lineHeight: 1.65 }}>
                                    {service.description}
                                </p>

                                <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.16)', marginBottom: '18px' }} />

                                <div className="flex flex-wrap gap-8">
                                    {service.serviceLists.map((item, idx) => (
                                        <a key={idx} href={item.url} className="decoration-none inline-flex">
                                            <Badge
                                                text={item.label}
                                                shape="pill"
                                                variant="outline"
                                                icon="ArrowUpRight"
                                                iconPosition="right"
                                                iconSize={12}
                                                capitalize={false}
                                                bg="rgba(255, 255, 255, 0.08)"
                                                textColor="#ffffff"
                                                borderColor="rgba(255, 255, 255, 0.18)"
                                                className="service-pill cursor-pointer"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div
                className="absolute pointer-events-none rounded-full"
                style={{
                    left: '-10%',
                    top: '-10%',
                    width: '25vw',
                    height: '25vw',
                    filter: 'blur(80px)',
                    background: 'radial-gradient(circle, var(--primary) 1.0%, var(--primary) 0.8%, transparent 75%)',
                    zIndex: 0
                }}
            />

            <style>{`
                .service-pill {
                    padding: 8px 18px !important;
                    font-size: 13px !important;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: all 0.25s ease !important;
                }
                .service-pill:hover {
                    background-color: rgba(255, 255, 255, 0.2) !important;
                    border-color: rgba(255, 255, 255, 0.35) !important;
                    transform: translateY(-2px);
                }
            `}</style>
        </Container>
    );
};

export default React.memo(ServiceSection);