import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Tab from '../../../components/common/Tab';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';
import launchShieldImg from '../../../assets/launch-shield.jpg';
import launchGlobeImg from '../../../assets/launch-globe.jpg';
import launchCertificationsImg from '../../../assets/launch-certifications.jpg';
import { serviceCMS } from '../../../utils/apiData';

const renderPlatformCode = (code) => {
    if (!code) return null;
    const parts = code.split(/(\b(?:val|let|const|await|new|auto)\b|\b(?:ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser)\b|\([^)]*\)|\[[^\]]*\]|\{[^}]*\})/g);
    return parts.map((part, i) => {
        if (/^(val|let|const|await|new|auto)$/.test(part)) {
            return <span key={i} style={{ color: '#94a3b8' }}>{part} </span>;
        }
        if (/^(ZegoExpressEngine|ZegoEngineProfile|ZegoCanvas|ZegoUser)$/.test(part)) {
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

const ServiceSection = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [scrollPercent, setScrollPercent] = useState(0);
    const [activeIndustryTab, setActiveIndustryTab] = useState('Manufacturer');
    const [activePlatformTab, setActivePlatformTab] = useState('Android');

    const activeIndustryCard = useMemo(() => {
        return serviceCMS.industryTabsData[activeIndustryTab] || serviceCMS.industryTabsData['Company'] || serviceCMS.industryTabsData['Social'];
    }, [activeIndustryTab]);

    const activeCodeSnippet = useMemo(() => {
        return serviceCMS.platformCodeSnippets[activePlatformTab] || serviceCMS.platformCodeSnippets['Android'] || [];
    }, [activePlatformTab]);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight * 0.45 - rect.top;
            const total = rect.height - windowHeight * 0.25;

            if (total <= 0) return;
            const progress = Math.min(Math.max(start / total, 0), 1);
            setScrollPercent(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderBusinessMetricsCard = () => (
        <div
            className="rounded-5"
            style={{
                backgroundColor: '#0c101c',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            <div className='p-22'>
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
                <div className="relative w-full">
                    <div
                        style={{
                            position: 'absolute',
                            left: '22px',
                            top: '24px',
                            bottom: '40px',
                            width: '2px',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '2px',
                            zIndex: 1
                        }} className='sm-hidden'
                    >
                        <div
                            style={{
                                width: '100%',
                                height: `${scrollPercent * 100}%`,
                                background: 'linear-gradient(180deg, #3b82f6 0%, #22c55e 50%, #db5e1f 100%)',
                                borderRadius: '2px',
                                transition: 'height 0.12s linear',
                                boxShadow: '0 0 12px rgba(59, 130, 246, 0.6)'
                            }}
                        />
                    </div>

                    {serviceCMS.stages.map((item, index) => {
                        const stageThreshold = index === 0 ? 0.05 : index === 1 ? 0.35 : 0.7;
                        const isReached = scrollPercent >= stageThreshold;

                        return (
                            <div
                                key={item.id}
                                className="flex items-start w-full relative z-10"
                                style={{
                                    gap: '20px',
                                    marginBottom: index === serviceCMS.stages.length - 1 ? '0' : '90px'
                                }}
                            >
                                <div className="w-5 sm-hidden">
                                    <div
                                        className="rounded-full icon-lg bg-dark"
                                        style={{
                                            border: `1px solid ${isReached ? item.color : 'rgba(255, 255, 255, 0.15)'}`,
                                            background: isReached
                                                ? `radial-gradient(circle, ${item.glowColor} 0%, rgba(10, 15, 26, 0.9) 75%)`
                                                : 'var(--dark)',
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

                                <div className="w-95 sm-w-full">
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
                                        <div className="mt-30 w-full">
                                            <div className="mb-24 overflow-auto">
                                                <Tab
                                                    version="3"
                                                    tabs={item.tabs}
                                                    activeTab={activeIndustryTab}
                                                    onChange={setActiveIndustryTab}
                                                />
                                            </div>

                                            <div
                                                className="w-full rounded-10 relative overflow-hidden"
                                                style={{
                                                    background: 'radial-gradient(ellipse at 80% 30%, rgba(30, 58, 138, 0.25) 0%, #090e1a 70%)',
                                                    border: '1px solid rgba(59, 130, 246, 0.25)'
                                                }}
                                            >
                                                <div className="grid-cols-2 sm-grid-cols-1 p-30 sm-p-20 items-center" style={{ gap: '20px' }}>
                                                    <div>
                                                        <h3 className="text-white font-600 title-text capitalize">
                                                            {activeIndustryCard.title}{' '}
                                                            <span className="text-primary">{activeIndustryCard.keyword}</span>{' '}
                                                            {activeIndustryCard.titleEnd}
                                                        </h3>
                                                        <p className="mini-text text-white text-muted mt-12">
                                                            {activeIndustryCard.description}
                                                        </p>

                                                        <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-15">
                                                            {activeIndustryCard.bullets.map((b, bIdx) => (
                                                                <div key={bIdx} className="flex items-center gap-8">
                                                                    <div className="bg-primary dot rounded-full" />
                                                                    <p className="mini-text text-white font-400">{b}</p>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <Button
                                                            text={activeIndustryCard.cta}
                                                            version="v2"
                                                            bg="primary"
                                                            color="white"
                                                            icon="ChevronRight"
                                                            iconPosition="right"
                                                            className="mt-24 font-600 rounded-5"
                                                            onClick={() => navigate('/services')}
                                                        />
                                                    </div>

                                                    <div className="relative">
                                                        <Image
                                                            src={activeIndustryCard.image}
                                                            alt={activeIndustryCard.badge}
                                                            className="w-full h-300 rounded-10 object-cover flex"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="w-full rounded-10 relative overflow-hidden mt-20"
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
                                                    Embed real-time voice and video with a{' '}
                                                    <span style={{ color: '#22c55e', fontWeight: 600 }}>few lines of code:_</span>
                                                </p>

                                                <div
                                                    className="rounded-5 p-16 mt-10"
                                                    style={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                                    }}
                                                >
                                                    <div className="flex items-center gap-16 mb-14 bordb pb-12" style={{ overflowX: 'auto' }}>
                                                        <div className="flex items-center gap-6 flex-shrink-0">
                                                            <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#ef4444' }} />
                                                            <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b' }} />
                                                            <div className="rounded-full" style={{ width: '10px', height: '10px', backgroundColor: '#10b981' }} />
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