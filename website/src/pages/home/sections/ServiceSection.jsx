import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';
import launchShieldImg from '../../../assets/launch-shield.jpg';
import launchGlobeImg from '../../../assets/launch-globe.jpg';
import launchCertificationsImg from '../../../assets/launch-certifications.jpg';
import { serviceCMS } from '../../../utils/apiData';

const renderPlatformCode = (code) => {
    if (!code) return null;
    const parts = code.split(/(\b(?:val|let|const|await|new|auto|import|from|export|default|function|return|interface|type)\b|\b(?:ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser|StudioApp|CreativeEngine|DigitalAgency|NextResponse)\b|\([^)]*\)|\[[^\]]*\]|\{[^}]*\})/g);
    return parts.map((part, i) => {
        if (/^(val|let|const|await|new|auto|import|from|export|default|function|return|interface|type)$/.test(part)) {
            return <span key={i} style={{ color: '#94a3b8' }}>{part} </span>;
        }
        if (/^(ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser|StudioApp|CreativeEngine|DigitalAgency|NextResponse)$/.test(part)) {
            return <span key={i} style={{ color: '#f43f5e', fontWeight: 500 }}>{part}</span>;
        }
        if ((part.startsWith('(') && part.endsWith(')')) || (part.startsWith('{') && part.endsWith('}')) || (part.startsWith('[') && part.endsWith(']'))) {
            return (
                <span key={i} style={{ color: '#f1f5f9' }}>
                    {part[0]}<span style={{ color: '#c084fc' }}>{part.slice(1, -1)}</span>{part[part.length - 1]}
                </span>
            );
        }
        return <span key={i} style={{ color: '#f1f5f9' }}>{part}</span>;
    });
};

const globeAvatars = [
    {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        alt: 'Client',
        style: { top: '40%', right: '20%' }
    },
    {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        alt: 'Client',
        style: { top: '32%', left: '20%' }
    },
    {
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        alt: 'Client',
        style: { bottom: '16%', right: '40%' }
    }
];

const ServiceProgressBar = React.memo(({ scrollPercent, trackMetrics }) => {
    const startY = trackMetrics.startY ?? 20;
    const middleY = trackMetrics.middleY ?? 600;
    const stage3Y = trackMetrics.stage3Y ?? 1400;
    const endY = trackMetrics.endY ?? 2400;
    const totalLength = Math.max(endY - startY, 1);
    const currentHeadY = Math.min(Math.max(startY + totalLength * scrollPercent, startY), endY);

    const stage2Percent = Math.min(Math.max(Math.round(((middleY - startY) / totalLength) * 100), 8), 50);
    const stage3Percent = Math.min(Math.max(Math.round(((stage3Y - startY) / totalLength) * 100), stage2Percent + 10), 85);
    const blueEnd = Math.max(stage2Percent - 6, 2);
    const greenEnd = Math.min(stage2Percent + 6, stage3Percent - 4);

    return (
        <svg
            className="sm-hidden"
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '40px',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'visible'
            }}
        >
            <defs>
                <linearGradient
                    id="serviceProgressGradient"
                    x1="0"
                    y1={startY}
                    x2="0"
                    y2={endY}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset={`${blueEnd}%`} stopColor="#3b82f6" />
                    <stop offset={`${stage2Percent}%`} stopColor="#22c55e" />
                    <stop offset={`${greenEnd}%`} stopColor="#22c55e" />
                    <stop offset={`${stage3Percent}%`} stopColor="#db5e1f" />
                    <stop offset="100%" stopColor="#db5e1f" />
                </linearGradient>

                <filter id="serviceGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Inactive Track Line spanning through the entire section */}
            <line
                x1="20"
                y1={startY}
                x2="20"
                y2={endY}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Active Glow Line */}
            {scrollPercent > 0.002 && (
                <line
                    x1="20"
                    y1={startY}
                    x2="20"
                    y2={currentHeadY}
                    stroke="url(#serviceProgressGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.4"
                    filter="url(#serviceGlowFilter)"
                />
            )}

            {/* Active Core Line */}
            {scrollPercent > 0.002 && (
                <line
                    x1="20"
                    y1={startY}
                    x2="20"
                    y2={currentHeadY}
                    stroke="url(#serviceProgressGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            )}
        </svg>
    );
});

const ServiceSection = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const stagesContainerRef = useRef(null);
    const firstIconRef = useRef(null);
    const middleIconRef = useRef(null);
    const lastIconRef = useRef(null);
    const [scrollPercent, setScrollPercent] = useState(0);
    const [trackMetrics, setTrackMetrics] = useState({
        startY: 20,
        middleY: 600,
        stage3Y: 1400,
        endY: 2400
    });
    const metricsRef = useRef({
        startY: 20,
        middleY: 600,
        stage3Y: 1400,
        endY: 2400
    });
    const [activePlatformTab, setActivePlatformTab] = useState(Object.keys(serviceCMS.platformCodeSnippets || {})[0] || 'Next.js');

    const activeCodeSnippet = useMemo(() => {
        return serviceCMS.platformCodeSnippets[activePlatformTab] || Object.values(serviceCMS.platformCodeSnippets || {})[0] || [];
    }, [activePlatformTab]);

    useEffect(() => {
        const updateMetrics = () => {
            if (!stagesContainerRef.current || !firstIconRef.current || !lastIconRef.current) return;
            const containerRect = stagesContainerRef.current.getBoundingClientRect();
            const firstRect = firstIconRef.current.getBoundingClientRect();
            const lastRect = lastIconRef.current.getBoundingClientRect();
            const middleRect = middleIconRef.current ? middleIconRef.current.getBoundingClientRect() : null;

            const startY = (firstRect.top - containerRect.top) + (firstRect.height / 2);
            const stage3Y = (lastRect.top - containerRect.top) + (lastRect.height / 2);
            const middleY = middleRect ? (middleRect.top - containerRect.top) + (middleRect.height / 2) : (startY + stage3Y) / 2;

            const containerHeight = stagesContainerRef.current.offsetHeight || containerRect.height;
            const endY = Math.max(containerHeight - 30, stage3Y + 60);

            if (stage3Y > startY && endY > stage3Y) {
                const next = { startY, middleY, stage3Y, endY };
                metricsRef.current = next;
                setTrackMetrics(next);
            }
        };

        const handleScroll = () => {
            if (!stagesContainerRef.current || !firstIconRef.current || !lastIconRef.current) {
                if (sectionRef.current) {
                    const rect = sectionRef.current.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const start = windowHeight * 0.45 - rect.top;
                    const total = rect.height - windowHeight * 0.25;
                    if (total > 0) setScrollPercent(Math.min(Math.max(start / total, 0), 1));
                }
                return;
            }

            const metrics = metricsRef.current;
            const containerRect = stagesContainerRef.current.getBoundingClientRect();
            const firstRect = firstIconRef.current.getBoundingClientRect();
            const middleRect = middleIconRef.current ? middleIconRef.current.getBoundingClientRect() : null;
            const lastRect = lastIconRef.current.getBoundingClientRect();

            // Focal reading area: slightly above vertical center of viewport
            const focalY = window.innerHeight * 0.45;
            const firstCenter = firstRect.top + firstRect.height / 2;
            const middleCenter = middleRect
                ? middleRect.top + middleRect.height / 2
                : firstCenter + (metrics.middleY - metrics.startY);
            const lastCenter = lastRect.top + lastRect.height / 2;
            const containerBottom = containerRect.bottom;

            let headY = metrics.startY;

            if (focalY <= firstCenter) {
                headY = metrics.startY;
            } else if (focalY <= middleCenter) {
                const span = Math.max(middleCenter - firstCenter, 1);
                const ratio = Math.min(Math.max((focalY - firstCenter) / span, 0), 1);
                headY = metrics.startY + (metrics.middleY - metrics.startY) * ratio;
            } else if (focalY <= lastCenter) {
                const span = Math.max(lastCenter - middleCenter, 1);
                const ratio = Math.min(Math.max((focalY - middleCenter) / span, 0), 1);
                headY = metrics.middleY + (metrics.stage3Y - metrics.middleY) * ratio;
            } else {
                // Moving through Stage 3 down to section completion
                const finishTarget = window.innerHeight * 0.85;
                const remainingScroll = containerBottom - finishTarget;
                const totalPastLast = Math.max((metrics.endY - metrics.stage3Y) + (focalY - finishTarget), 200);

                if (containerBottom <= finishTarget) {
                    headY = metrics.endY;
                } else {
                    const ratio = 1 - Math.min(Math.max(remainingScroll / totalPastLast, 0), 1);
                    headY = metrics.stage3Y + (metrics.endY - metrics.stage3Y) * ratio;
                }
            }

            const totalTrack = Math.max(metrics.endY - metrics.startY, 1);
            const clampedHeadY = Math.min(Math.max(headY, metrics.startY), metrics.endY);
            const progress = (clampedHeadY - metrics.startY) / totalTrack;
            setScrollPercent(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        window.addEventListener('resize', updateMetrics);

        updateMetrics();
        handleScroll();

        const t1 = setTimeout(() => { updateMetrics(); handleScroll(); }, 150);
        const t2 = setTimeout(() => { updateMetrics(); handleScroll(); }, 600);

        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined' && stagesContainerRef.current) {
            resizeObserver = new ResizeObserver(() => {
                updateMetrics();
                handleScroll();
            });
            resizeObserver.observe(stagesContainerRef.current);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            window.removeEventListener('resize', updateMetrics);
            clearTimeout(t1);
            clearTimeout(t2);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, []);

    const renderBusinessMetricsCard = () => (
        <div
            className="rounded-5"
            style={{
                backgroundColor: '#0c101c',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            <div className='p-20'>
                <h3 className="text-white head-text font-600 capitalize">
                    {serviceCMS.businessMetricsCard.title}
                </h3>

                <div className='relative grid-cols-2 gap-12 mt-15'>
                    {serviceCMS.businessMetricsCard.metrics.map((bm, mIdx) => (
                        <div key={mIdx}>
                            <p className="text-white midpara-text font-500">{bm.value}</p>
                            <p className="mini-text text-white font-300">{bm.label}</p>
                        </div>
                    ))}
                </div>
                <Button
                    text={serviceCMS.businessMetricsCard.ctaText}
                    version="v2"
                    variant="outline"
                    color="white"
                    icon="ChevronRight"
                    iconPosition="right"
                    iconWidth="13"
                    iconHeight="13"
                    onClick={() => navigate('/services')}
                    className='mt-16'
                />
            </div>
        </div>
    );

    return (
        <Container style={{ backgroundColor: 'var(--dark)' }}>
            <div ref={sectionRef} className="py-60 sm-py-40 relative w-full">
                <div ref={stagesContainerRef} className="relative w-full">
                    <ServiceProgressBar
                        scrollPercent={scrollPercent}
                        trackMetrics={trackMetrics}
                    />

                    {serviceCMS.stages.map((item, index) => {
                        const iconRef =
                            index === 0
                                ? firstIconRef
                                : index === 1
                                    ? middleIconRef
                                    : index === serviceCMS.stages.length - 1
                                        ? lastIconRef
                                        : null;

                        const totalLen = Math.max((trackMetrics.endY ?? 2400) - (trackMetrics.startY ?? 20), 1);
                        const currentHeadY = (trackMetrics.startY ?? 20) + totalLen * scrollPercent;
                        const iconY =
                            index === 0
                                ? trackMetrics.startY ?? 20
                                : index === 1
                                    ? trackMetrics.middleY ?? 600
                                    : trackMetrics.stage3Y ?? 1400;

                        const isReached =
                            index === 0
                                ? scrollPercent >= 0.002 || currentHeadY >= iconY
                                : currentHeadY >= iconY - 15;

                        return (
                            <div
                                key={item.id}
                                className="flex items-start w-full relative z-10"
                                style={{
                                    gap: '20px',
                                    marginBottom: index === serviceCMS.stages.length - 1 ? '0' : '90px'
                                }}
                            >
                                <div
                                    className="sm-hidden flex items-center justify-center flex-shrink-0"
                                    style={{ width: '40px', minWidth: '40px', height: '40px', zIndex: 2 }}
                                >
                                    <div
                                        ref={iconRef}
                                        className="rounded-full icon-lg bg-dark flex items-center justify-center flex-shrink-0"
                                        style={{
                                            border: `1px solid ${isReached ? item.color : 'rgba(255, 255, 255, 0.15)'}`,
                                            background: isReached
                                                ? `radial-gradient(circle, ${item.glowColor} 0%, rgba(10, 15, 26, 0.9) 75%)`
                                                : 'var(--dark)',
                                            boxShadow: isReached ? `0 0 16px ${item.glowColor}` : 'none',
                                            transition: 'all 0.4s ease'
                                        }}
                                    >
                                        <Icon
                                            name={item.icon}
                                            width="22"
                                            height="22"
                                            stroke={isReached ? 'var(--white)' : 'var(--gray)'}
                                            strokeWidth="2"
                                        />
                                    </div>
                                </div>

                                <div className="w-full" style={{ flex: 1, minWidth: 0 }}>
                                    <p className="text-white font-500 small-text">{item.tag}</p>

                                    <h2 className="text-white font-600 head-text mt-10 sm-mt-4">
                                        {item.id === 'development' ? (
                                            <>
                                                <span style={{ color: item.color }}>{item.headingHighlight}</span>{' '}
                                                {item.headingMain}
                                            </>
                                        ) : item.id === 'launch' ? (
                                            <>
                                                {item.headingMain}{' '}
                                                <span style={{ color: item.color }}>{item.headingHighlight}</span>
                                            </>
                                        ) : (
                                            <>
                                                {item.headingMain}
                                                <br />
                                                <span style={{ color: item.color }}>{item.headingHighlight}</span>
                                            </>
                                        )}
                                    </h2>

                                    <p className="mt-12 sm-mt-10 font-300 small-text text-white">
                                        {item.description}
                                    </p>

                                    {item.hasTopCta && item.ctaText && (
                                        <Button
                                            text={item.ctaText}
                                            version="v2"
                                            variant="outline"
                                            color="white"
                                            icon="ChevronRight"
                                            iconPosition="right"
                                            iconWidth="14"
                                            iconHeight="14"
                                            className='mt-20 sm-mt-14'
                                            onClick={() => navigate(item.ctaLink)}
                                        />
                                    )}

                                    {item.id === 'product-design' && (
                                        <div className="mt-20 w-full">
                                            <div
                                                className="w-full rounded-10 relative overflow-hidden"
                                                style={{
                                                    background: 'radial-gradient(ellipse at 80% 30%, rgba(30, 58, 138, 0.25) 0%, #090e1a 70%)',
                                                    border: '1px solid rgba(59, 130, 246, 0.25)'
                                                }}
                                            >
                                                <div className="flex sm-grid-cols-1 items-center justify-between gap-12 p-30  sm-p-20">
                                                    <div className="w-80 sm-w-full">
                                                        <p className="text-white font-500 para-text">
                                                            {item.collaboration.title.split(item.collaboration.titleHighlight)[0]}
                                                            <span className="text-primary">{item.collaboration.titleHighlight}</span>
                                                            {item.collaboration.title.split(item.collaboration.titleHighlight)[1]}
                                                        </p>
                                                        <div className="grid-cols-2 sm-grid-cols-1 gap-10 mt-12 w-60">
                                                            {item.collaboration.items.map((cItem, cIdx) => (
                                                                <div key={cIdx} className="flex items-center gap-8">
                                                                    <span className="text-primary">✓</span>
                                                                    <p className="mini-text text-white">{cItem}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="w-20 sm-w-full grid-cols-1 gap-10">
                                                        <Button
                                                            text={item.collaboration.buttonText}
                                                            version="v2"
                                                            bg="white"
                                                            color="dark"
                                                            className="font-600 rounded-5 w-full"
                                                            onClick={() => navigate('/connect')}
                                                        />
                                                        <Button
                                                            text={`${item.collaboration.linkText} >`}
                                                            version="v2"
                                                            variant="outline"
                                                            className="mini-text text-center cursor-pointer text-decoration-none mt-8 border-0 p-0 text-muted w-full"
                                                            style={{ color: '#94a3b8', fontSize: '12px' }}
                                                            onClick={() => navigate('/services')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {item.id === 'development' && (
                                        <div
                                            className="w-full rounded-10 relative overflow-hidden mt-14"
                                            style={{
                                                backgroundColor: '#070a12',
                                                border: '1px solid rgba(34, 197, 94, 0.45)'
                                            }}
                                        >
                                            <div className="p-16">
                                                <p className="font-300 text-white small-text">
                                                    {item.codeIntro ? (
                                                        item.codeIntro.includes('few lines of code:_') ? (
                                                            <>
                                                                {item.codeIntro.split('few lines of code:_')[0]}
                                                                <span style={{ color: '#22c55e', fontWeight: 600 }}>few lines of code:_</span>
                                                            </>
                                                        ) : (
                                                            item.codeIntro
                                                        )
                                                    ) : (
                                                        <>
                                                            Architect and deploy high-performance web applications with a{' '}
                                                            <span style={{ color: '#22c55e', fontWeight: 600 }}>few lines of code:_</span>
                                                        </>
                                                    )}
                                                </p>

                                                <div
                                                    className="rounded-5 p-16 mt-10"
                                                    style={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between gap-16 mb-14 bordb pb-12" style={{ overflowX: 'auto' }}>
                                                        <div className="flex items-center gap-6 flex-shrink-0">
                                                            <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#ef4444' }} />
                                                            <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b' }} />
                                                            <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#10b981' }} />
                                                        </div>
                                                        <div className="flex items-center gap-6 flex-wrap">
                                                            {Object.keys(serviceCMS.platformCodeSnippets || {}).slice(0, 5).map((plat) => {
                                                                const isActive = activePlatformTab === plat;
                                                                return (
                                                                    <span
                                                                        key={plat}
                                                                        onClick={() => setActivePlatformTab(plat)}
                                                                        className="cursor-pointer mini-text font-400 px-8 py-2 rounded-4"
                                                                        style={{
                                                                            color: isActive ? '#ffffff' : 'var(--gray)',
                                                                            backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                                                                            fontSize: '11px',
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        {plat}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {activeCodeSnippet.map((line) => (
                                                        <div key={line.num} className="flex items-center gap-10 mb-5">
                                                            <p className="mini-text text-gray font-500">{line.num}</p>
                                                            <p className="mini-text text-white font-300">{renderPlatformCode(line.code)}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid-cols-4 sm-grid-cols-1 gap-12 mt-24">
                                                    {item.tools.map((tool, tIdx) => (
                                                        <div
                                                            key={tIdx}
                                                            className="flex items-center justify-between p-8 rounded-5 cursor-pointer"
                                                            style={{
                                                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                                                border: '1px solid rgba(255, 255, 255, 0.08)'
                                                            }}
                                                            onClick={() => navigate(tool.href)}
                                                        >
                                                            <div className="flex items-center gap-12">
                                                                <div
                                                                    className="rounded-full icon-lg"
                                                                    style={{
                                                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                                                    }}
                                                                >
                                                                    <Icon name={tool.icon} width="20" height="20" stroke="var(--white)" />
                                                                </div>
                                                                <p className="text-white mini-text font-300">
                                                                    {tool.label}
                                                                </p>
                                                            </div>
                                                            <Icon name="ChevronRight" width="22" height="22" stroke="var(--white)" strokeWidth="2" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {item.id === 'launch' && (
                                        <div className="mt-20 w-full">
                                            <div className="grid-cols-3 sm-grid-cols-1 gap-12 mb-12">
                                                <div
                                                    className="rounded-5"
                                                    style={{
                                                        backgroundColor: '#0c101c',
                                                        border: '1px solid rgba(255, 255, 255, 0.08)'
                                                    }}
                                                >
                                                    <Image
                                                        src={launchCertificationsImg}
                                                        alt="Security Certifications: DNV ISO 27001, ISO 27018, ISO 27701, GDPR"
                                                        className="w-full flex object-cover h-400"
                                                    />
                                                    <div className="p-20">
                                                        <h4 className="text-white title-text font-600">
                                                            {serviceCMS.securityCard.title}
                                                        </h4>
                                                        <p className="mt-3 text-white font-300 mini-text">
                                                            {serviceCMS.securityCard.description}
                                                        </p>
                                                        <Button
                                                            text={serviceCMS.securityCard.ctaText}
                                                            version="v2"
                                                            variant="outline"
                                                            color="white"
                                                            icon="ChevronRight"
                                                            iconPosition="right"
                                                            iconWidth="13"
                                                            iconHeight="13"
                                                            onClick={() => navigate('/services')}
                                                            className='mt-16'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid-cols-1 gap-12">
                                                    <Image
                                                        src={launchShieldImg}
                                                        alt="Data Security Shield"
                                                        className="w-full h-300 object-cover rounded-5 flex"
                                                    />
                                                    {renderBusinessMetricsCard()}
                                                </div>

                                                <div className="grid-cols-1 gap-12">
                                                    {renderBusinessMetricsCard()}
                                                    <div className='relative z-10'>
                                                        <Image
                                                            src={launchGlobeImg}
                                                            alt="Global network globe"
                                                            className="w-full h-300 object-cover flex"
                                                        />

                                                        {globeAvatars.map((avatar, aIdx) => (
                                                            <div
                                                                key={aIdx}
                                                                className="absolute rounded-full"
                                                                style={{
                                                                    ...avatar.style,
                                                                    zIndex: 20
                                                                }}
                                                            >
                                                                <Image
                                                                    src={avatar.src}
                                                                    alt={avatar.alt}
                                                                    width='35px'
                                                                    height='35px'
                                                                    className="flex rounded-full object-cover"
                                                                    style={{ border: '1.5px solid #ffffff' }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid-cols-4 sm-grid-cols-1 gap-12">
                                                {serviceCMS.bottomStatCapsules.map((stat, sIdx) => (
                                                    <div
                                                        key={sIdx}
                                                        className="px-18 py-12 rounded-5 flex items-center gap-12"
                                                        style={{
                                                            backgroundColor: '#0c101c',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)'
                                                        }}
                                                    >
                                                        <h5 className="text-white title-text font-600">
                                                            {stat.value}<span style={{ color: '#db5e1f', fontSize: stat.plus === 'ms' ? '22px' : '28px' }}>{stat.plus}</span>
                                                        </h5>
                                                        <div
                                                            className="flex items-center rounded-20 gap-6 px-12 py-4"
                                                            style={{
                                                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                                            }}
                                                        >
                                                            <Icon name={stat.icon} width="16" height="16" stroke="#db5e1f" fill={stat.icon === 'Zap' ? '#db5e1f' : 'none'} />
                                                            <p className="mini-text font-300 text-white">
                                                                {stat.label}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default ServiceSection;