import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';

const collections = [
    {
        id: 'heritage',
        title: 'Heritage Living',
        description: 'With a shape inspired by the bollards used to secure vessels to a jetty',
        mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        thumbnails: [
            'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=200&q=80'
        ]
    },
    {
        id: 'haven',
        title: 'The Haven Collection',
        description: 'Crafted for peaceful sanctuaries with plush tactile fabrics and organic shapes',
        mainImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
        thumbnails: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=200&q=80'
        ]
    },
    {
        id: 'solace',
        title: 'Solace Series',
        description: 'Timeless architectural silhouettes engineered for modern living room spaces',
        mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        thumbnails: [
            'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=200&q=80',
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80'
        ]
    }
];

const DetailSection = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const [selectedThumbIdx, setSelectedThumbIdx] = useState(0);

    const activeCollection = collections[activeTabIdx];

    return (
        <section style={{ backgroundColor: '#FFFFFF', padding: '80px 0' }}>
            <Container version="v2">
                <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Left Column - Titles, Thumbnails & CTA */}
                    <div style={{ flex: '1 1 42%', minWidth: '320px' }}>
                        {/* Section Label */}
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#141414',
                                display: 'block',
                                marginBottom: '24px',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Featured Collections
                        </span>

                        {/* Interactive Titles Stack */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                            {collections.map((item, idx) => {
                                const isActive = activeTabIdx === idx;
                                return (
                                    <div key={item.id} style={{ display: 'inline-block' }}>
                                        <h2
                                            onClick={() => {
                                                setActiveTabIdx(idx);
                                                setSelectedThumbIdx(0);
                                            }}
                                            style={{
                                                fontSize: isActive ? '36px' : '32px',
                                                fontWeight: isActive ? '800' : '700',
                                                color: isActive ? '#141414' : '#D0D0D0',
                                                cursor: 'pointer',
                                                margin: 0,
                                                display: 'inline-block',
                                                borderBottom: isActive ? '3px solid #141414' : 'none',
                                                paddingBottom: isActive ? '4px' : '0',
                                                transition: 'all 0.25s ease'
                                            }}
                                        >
                                            {item.title}
                                        </h2>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Thumbnails Row */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                            {activeCollection.thumbnails.map((thumb, tIdx) => {
                                const isThumbSelected = selectedThumbIdx === tIdx;
                                return (
                                    <div
                                        key={tIdx}
                                        onClick={() => setSelectedThumbIdx(tIdx)}
                                        style={{
                                            width: '72px',
                                            height: '72px',
                                            borderRadius: '12px',
                                            backgroundColor: '#F7F7F7',
                                            padding: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            border: isThumbSelected ? '2px solid #141414' : '2px solid transparent',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <Image
                                            src={thumb}
                                            alt={`Thumbnail ${tIdx + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Description */}
                        <p
                            style={{
                                fontSize: '13px',
                                color: '#666666',
                                lineHeight: '1.55',
                                marginBottom: '28px',
                                maxWidth: '300px'
                            }}
                        >
                            {activeCollection.description}
                        </p>

                        {/* Shop Collection CTA */}
                        <button
                            style={{
                                backgroundColor: '#141414',
                                color: '#FFFFFF',
                                borderRadius: '30px',
                                padding: '14px 34px',
                                fontSize: '14px',
                                fontWeight: '700',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, backgroundColor 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.backgroundColor = '#333333';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.backgroundColor = '#141414';
                            }}
                        >
                            Shop Collection
                        </button>
                    </div>

                    {/* Right Column - Large Lifestyle Interior Image */}
                    <div style={{ flex: '1 1 50%', minWidth: '340px' }}>
                        <div
                            style={{
                                width: '100%',
                                height: '520px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.06)'
                            }}
                        >
                            <Image
                                src={activeCollection.mainImage}
                                alt={activeCollection.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'all 0.4s ease'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default DetailSection;