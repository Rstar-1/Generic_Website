import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const blogPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
        date: '11 March 2025',
        comments: '18 Comments',
        title: 'Leading Through Change: Proven Lessons for Effective Change Management in Business',
        excerpt: 'Relive every thrilling moment from the recent activities — from the opening kickoff to the final whistle, with expert commentary, key plays, and unforgettable highlights.'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
        date: '08 March 2025',
        comments: '12 Comments',
        title: 'Harnessing Digital Transformation: A Roadmap to Future-Proof Your Business',
        excerpt: 'Follow our journey through the topic, and view all the action, capturing every victory, key scale, and defining moments as the squad claimed the ultimate championship glory.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
        date: '03 March 2025',
        comments: '15 Comments',
        title: 'Unlocking Business Potential: Innovative Solutions for Unmatched Success',
        excerpt: 'Our Youth Academy is dedicated to developing future football stars, providing top-tier coaching, essential skills, and a path to reach professional football success.'
    }
];

const categories = [
    { name: 'Branding', count: '08' },
    { name: 'Consulting', count: '12' },
    { name: 'Innovations', count: '15' },
    { name: 'Management', count: '10' },
    { name: 'SEO Marketing', count: '07' }
];

const recentPosts = [
    {
        id: 1,
        title: 'How To Stay Ahead Of The Business World',
        date: 'March 05, 2025',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 2,
        title: 'How Digital Twin Shaping The Workplace',
        date: 'March 03, 2025',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 3,
        title: 'How To Sustainability Into Your Strategy',
        date: 'March 01, 2025',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=200&q=80'
    }
];

const popularTags = [
    'Growth', 'Business', 'Products', 'Lead', 'Impact', 'Focus', 'Tech', 'Optimise'
];

const MediaSection = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <section style={{ backgroundColor: '#F3EFEE', paddingTop: '60px', paddingBottom: '80px' }}>
            <Container version="v2">
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Left Column - Main Blog Posts */}
                    <div style={{ flex: '1 1 65%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        {blogPosts.map((post) => (
                            <article
                                key={post.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {/* Featured Image */}
                                <div
                                    onClick={() => navigate('/blog-detail')}
                                    style={{
                                        width: '100%',
                                        height: '380px',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    />
                                </div>

                                {/* Post Meta */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666666', fontWeight: '500' }}>
                                        <Icon name="Calendar" width="14" height="14" stroke="#666666" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666666', fontWeight: '500' }}>
                                        <Icon name="MessageSquare" width="14" height="14" stroke="#666666" />
                                        <span>{post.comments}</span>
                                    </div>
                                </div>

                                {/* Post Title */}
                                <h2
                                    onClick={() => navigate('/blog-detail')}
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        color: '#141414',
                                        lineHeight: '1.35',
                                        marginBottom: '12px',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4D00')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#141414')}
                                >
                                    {post.title}
                                </h2>

                                {/* Post Excerpt */}
                                <p
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: '1.65',
                                        color: '#666666',
                                        marginBottom: '24px'
                                    }}
                                >
                                    {post.excerpt}
                                </p>

                                {/* Read More Button */}
                                <div>
                                    <button
                                        onClick={() => navigate('/blog-detail')}
                                        style={{
                                            backgroundColor: '#FF4D00',
                                            color: '#FFFFFF',
                                            borderRadius: '30px',
                                            padding: '12px 28px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            transition: 'transform 0.2s ease, backgroundColor 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.backgroundColor = '#E04400';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.backgroundColor = '#FF4D00';
                                        }}
                                    >
                                        <span>Read More</span>
                                        <Icon name="ArrowUpRight" width="14" height="14" stroke="#FFFFFF" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Right Column - Sidebar Widgets */}
                    <div style={{ flex: '1 1 30%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Widget 1: Search */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                padding: '24px'
                            }}
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#141414', marginBottom: '16px' }}>
                                Search
                            </h4>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#F3EFEE',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        color: '#141414',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '8px',
                                        backgroundColor: '#FF4D00',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        flexShrink: 0
                                    }}
                                >
                                    <Icon name="Search" width="18" height="18" stroke="#FFFFFF" />
                                </button>
                            </div>
                        </div>

                        {/* Widget 2: All Categories */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                padding: '24px'
                            }}
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#141414', marginBottom: '16px' }}>
                                All Categories
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {categories.map((cat, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            backgroundColor: '#F3EFEE',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#141414',
                                            cursor: 'pointer',
                                            transition: 'backgroundColor 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EAE4E2')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F3EFEE')}
                                    >
                                        <span>{cat.name}</span>
                                        <span style={{ fontSize: '13px', color: '#666666', fontWeight: '500' }}>({cat.count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Widget 3: Recent Posts */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                padding: '24px'
                            }}
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#141414', marginBottom: '16px' }}>
                                Recent Post
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {recentPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        onClick={() => navigate('/blog-detail')}
                                        style={{
                                            display: 'flex',
                                            gap: '14px',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '8px',
                                                objectFit: 'cover',
                                                flexShrink: 0
                                            }}
                                        />
                                        <div>
                                            <h5
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    color: '#141414',
                                                    lineHeight: '1.3',
                                                    marginBottom: '4px',
                                                    transition: 'color 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4D00')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = '#141414')}
                                            >
                                                {post.title}
                                            </h5>
                                            <span style={{ fontSize: '12px', color: '#888888' }}>
                                                {post.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Widget 4: Popular Tags */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                padding: '24px'
                            }}
                        >
                            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#141414', marginBottom: '16px' }}>
                                Popular Tags
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {popularTags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            backgroundColor: '#F3EFEE',
                                            borderRadius: '6px',
                                            padding: '6px 14px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            color: '#141414',
                                            cursor: 'pointer',
                                            transition: 'backgroundColor 0.2s ease, color 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#FF4D00';
                                            e.currentTarget.style.color = '#FFFFFF';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#F3EFEE';
                                            e.currentTarget.style.color = '#141414';
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default MediaSection;