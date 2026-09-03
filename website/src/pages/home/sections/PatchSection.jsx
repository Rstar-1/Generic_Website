import React from 'react';
import counterBg from '../../../assets/counter-bg.jpg';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const PatchSection = () => {
    return (
        <Container version="v2" className="relative z-10"
            style={{
                background: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${counterBg}) center/cover no-repeat`,

            }}>
            <div className='w-full py-100'>
                <div className="flex items-center">
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 18px',
                            borderRadius: '30px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(4px)',
                            fontSize: '12px',
                            fontWeight: '600',
                            letterSpacing: '0.6px',
                            textTransform: 'uppercase',
                            color: '#FFFFFF'
                        }}
                    >
                        <span style={{ color: 'var(--primary)', display: 'flex' }}>
                            <Icon name="Settings" width="14" height="14" stroke="var(--primary)" />
                        </span>
                        NO.1 SOFTWARE COMPANY COMPANY
                    </div>
                </div>

                {/* Main Headline & Paragraph */}
                <div style={{ maxWidth: '680px' }} className="mt-30">
                    <h2
                        className="text-white font-600"
                        style={{
                            fontSize: '48px',
                            lineHeight: '1.2',
                            margin: 0,
                            letterSpacing: '-0.5px'
                        }}
                    >
                        Delivering Innovative IT solutions Empower In Businesses.
                    </h2>

                    <p
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.6',
                            color: 'rgba(255, 255, 255, 0.75)',
                            marginTop: '20px',
                            maxWidth: '520px'
                        }}
                    >
                        Empowering enterprises with tailored financial insights and measurable growth strategies.
                    </p>
                </div>

                {/* Divider Line & Stats Row */}
                <div
                    style={{
                        marginTop: '80px',
                        paddingTop: '40px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '30px',
                        alignItems: 'center'
                    }}
                >
                    {/* Stat 1 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                            style={{
                                fontSize: '68px',
                                fontWeight: '700',
                                color: '#FFFFFF',
                                lineHeight: '1',
                                letterSpacing: '-2px'
                            }}
                        >
                            30<sup style={{ fontSize: '42px', fontWeight: '500', top: '-0.3em' }}>+</sup>
                        </div>
                        <p
                            style={{
                                fontSize: '14px',
                                lineHeight: '1.4',
                                color: 'rgba(255, 255, 255, 0.8)',
                                margin: 0,
                                maxWidth: '160px',
                                fontWeight: '500'
                            }}
                        >
                            Personalization At Seems Ultimate Scale.
                        </p>
                    </div>

                    {/* Stat 2 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                            style={{
                                fontSize: '68px',
                                fontWeight: '700',
                                color: '#FFFFFF',
                                lineHeight: '1',
                                letterSpacing: '-2px'
                            }}
                        >
                            8k<sup style={{ fontSize: '42px', fontWeight: '500', top: '-0.3em' }}>+</sup>
                        </div>
                        <p
                            style={{
                                fontSize: '14px',
                                lineHeight: '1.4',
                                color: 'rgba(255, 255, 255, 0.8)',
                                margin: 0,
                                maxWidth: '160px',
                                fontWeight: '500'
                            }}
                        >
                            Personalization At Seems Ultimate Scale.
                        </p>
                    </div>

                    {/* Stat 3 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                            style={{
                                fontSize: '68px',
                                fontWeight: '700',
                                color: '#FFFFFF',
                                lineHeight: '1',
                                letterSpacing: '-2px'
                            }}
                        >
                            20<sup style={{ fontSize: '42px', fontWeight: '500', top: '-0.3em', textTransform: 'uppercase' }}>X</sup>
                        </div>
                        <p
                            style={{
                                fontSize: '14px',
                                lineHeight: '1.4',
                                color: 'rgba(255, 255, 255, 0.8)',
                                margin: 0,
                                maxWidth: '160px',
                                fontWeight: '500'
                            }}
                        >
                            Personalization At Seems Ultimate Scale.
                        </p>
                    </div>
                </div>
            </div>
        </Container>

    );
};

export default PatchSection;
