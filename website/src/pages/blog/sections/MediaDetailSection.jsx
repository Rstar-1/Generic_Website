import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Image from '../../../components/common/Image';
import Icon from '../../../components/common/Icon';

const categories = [
    { name: 'Branding', count: '06' },
    { name: 'Business', count: '03' },
    { name: 'Consulting', count: '08' },
    { name: 'Innovations', count: '04' },
    { name: 'Management', count: '02' },
    { name: 'SEO Marketing', count: '09' }
];

const recentPosts = [
    {
        id: 1,
        title: 'How To Stay Ahead Of The Business Curve',
        date: 'March 20, 2025',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 2,
        title: 'How Digital Tools Shaping The Workforce',
        date: 'March 20, 2025',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 3,
        title: 'How To Sustainability Into Your Strategy',
        date: 'March 20, 2025',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80'
    }
];

const tags = ['Growth', 'Business', 'Insurance', 'Local', 'Impact', 'Finance', 'Tech', 'Optimize'];

const commentsList = [
    {
        id: 1,
        name: 'Sohail Tanvir',
        date: 'March 22, 2024 at 2:27 pm',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'Natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
        id: 2,
        name: 'Alex Planos',
        date: 'March 22, 2024 at 2:27 pm',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    }
];

const MediaDetailSection = () => {
    const [commentForm, setCommentForm] = useState({ name: '', email: '', message: '' });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your comment!');
        setCommentForm({ name: '', email: '', message: '' });
    };

    return (
        <section style={{ backgroundColor: '#F5F3EF', padding: '60px 0 100px 0' }}>
            <Container version="v2">
                <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Left Main Article Column */}
                    <div style={{ flex: '1 1 65%', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {/* Main Featured Image */}
                        <div style={{ borderRadius: '20px', overflow: 'hidden', width: '100%', maxHeight: '440px' }}>
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                                alt="Main Article"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Article Meta Header */}
                        <div>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#666666', marginBottom: '12px' }}>
                                <span>👤 By Admin</span>
                                <span>📅 18 Dec, 2025</span>
                                <span>📁 Corporate</span>
                            </div>

                            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#141414', lineHeight: '1.3', marginBottom: '20px' }}>
                                Unlocking Business Growth with Innovative Solutions
                            </h1>

                            <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.7', marginBottom: '16px' }}>
                                Nunc lacinia et nisi non eleifend. Sed et erat eleifend lacus scelerisque molestie nec id libero. Suspendisse potenti. Vivamus vitae
                                justo nunc. Aliquam erat volutpat. Ut sit amet justo nisl. Nunc hendrerit eros vitae justo hendrerit rhoncus.
                            </p>

                            <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.7' }}>
                                This is a demonstration article discussing modern business strategies. All images, text, and contents belong exclusively to our portal
                                and are designed for rich user engagement across mobile and desktop interfaces.
                            </p>
                        </div>

                        {/* Blockquote Card */}
                        <div
                            style={{
                                borderLeft: '4px solid #EA580C',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '14px',
                                padding: '28px 32px',
                                position: 'relative',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                            }}
                        >
                            <p style={{ fontSize: '15px', fontWeight: '600', color: '#141414', lineHeight: '1.7', margin: 0, italic: 'true' }}>
                                "Pellentesque Sollicitudin Congue Dolor Iner Aliquam. Morbi Volutpat, Nisi Vel Molestie Ulnas Condimentum, Dapibus Aliquam Lacerat Tortor, Quis Egestas Nisl Ipsum Eu Risus. Praesent Eleifend Erat Et Amet Car Vehicula."
                            </p>
                            <span style={{ position: 'absolute', bottom: '16px', right: '24px', fontSize: '36px', color: '#EA580C', fontWeight: '900', lineHeight: 1 }}>
                                ”
                            </span>
                        </div>

                        <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.7' }}>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit ut id nisl hendrerit orci. Pellentesque et erat sapien fringilla, mattis ligula consectetuer. Morbi orci mauris, maximus vitae ligula cursus, rhoncus eleifend augue. Morbi vel auctor mi ut hendrerit risus.
                        </p>

                        {/* 2-Image Showcase Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <div style={{ borderRadius: '14px', overflow: 'hidden', height: '220px' }}>
                                <Image
                                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
                                    alt="Office Discussion"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ borderRadius: '14px', overflow: 'hidden', height: '220px' }}>
                                <Image
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                                    alt="Partnership Handshake"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        <p style={{ fontSize: '14px', color: '#444444', lineHeight: '1.7' }}>
                            Nunc lacinia et nisi non eleifend. Sed et erat eleifend lacus scelerisque molestie nec id libero. Suspendisse potenti. Vivamus vitae justo nunc. Aliquam erat volutpat. Ut sit amet justo nisl.
                        </p>

                        {/* Article Tags & Share Footer */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderTop: '1px solid #E5E7EB',
                                borderBottom: '1px solid #E5E7EB',
                                padding: '16px 0',
                                flexWrap: 'wrap',
                                gap: '16px'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                {['News', 'Business', 'Marketing'].map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '20px',
                                            padding: '6px 16px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: '#141414',
                                            border: '1px solid #E5E7EB'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: '700', color: '#141414' }}>
                                <span>Share:</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {['Facebook', 'Twitter', 'Share2'].map((iconName, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E5E7EB',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Icon name={iconName} width="14" height="14" stroke="#141414" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Comments Section Card */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '20px',
                                padding: '36px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                            }}
                        >
                            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#141414', marginBottom: '28px' }}>
                                02 Comments
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                {commentsList.map((c) => (
                                    <div key={c.id} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                                            <Image src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                <div>
                                                    <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#141414', margin: 0 }}>
                                                        {c.name}
                                                    </h5>
                                                    <span style={{ fontSize: '12px', color: '#888888' }}>{c.date}</span>
                                                </div>

                                                <span style={{ color: '#EA580C', fontSize: '14px' }}>★★★★★</span>
                                            </div>

                                            <p style={{ fontSize: '13px', color: '#555555', lineHeight: '1.6', margin: '8px 0 10px 0' }}>
                                                {c.text}
                                            </p>

                                            <button
                                                style={{
                                                    color: '#EA580C',
                                                    fontSize: '13px',
                                                    fontWeight: '700',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0
                                                }}
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leave A Comments Form Card */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '20px',
                                padding: '36px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                            }}
                        >
                            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#141414', marginBottom: '24px' }}>
                                Leave A Comments
                            </h3>

                            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                        value={commentForm.name}
                                        onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                        style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            backgroundColor: '#EDEDED',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '14px 20px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        required
                                        value={commentForm.email}
                                        onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                        style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            backgroundColor: '#EDEDED',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '14px 20px',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <textarea
                                    rows={5}
                                    placeholder="Write Message"
                                    required
                                    value={commentForm.message}
                                    onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#EDEDED',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />

                                <div>
                                    <button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#EA580C',
                                            color: '#FFFFFF',
                                            borderRadius: '30px',
                                            padding: '14px 36px',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <span>Post Comment</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Sidebar Column */}
                    <div style={{ flex: '1 1 28%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Search Widget */}
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#141414', marginBottom: '16px' }}>
                                Search
                            </h4>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    placeholder="Search Here"
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#EDEDED',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        fontSize: '13px',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    style={{
                                        backgroundColor: '#EA580C',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Icon name="Search" width="16" height="16" stroke="#FFFFFF" />
                                </button>
                            </div>
                        </div>

                        {/* All Categories Widget */}
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#141414', marginBottom: '16px' }}>
                                All Categories
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {categories.map((c) => (
                                    <div
                                        key={c.name}
                                        style={{
                                            backgroundColor: '#EDEDED',
                                            borderRadius: '8px',
                                            padding: '10px 16px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            color: '#141414',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span>{c.name}</span>
                                        <span style={{ color: '#666666', fontSize: '12px' }}>({c.count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Post Widget */}
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#141414', marginBottom: '16px' }}>
                                Recent Post
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {recentPosts.map((post) => (
                                    <div key={post.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                                            <Image src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#141414', margin: '0 0 4px 0', lineHeight: '1.4' }}>
                                                {post.title}
                                            </h5>
                                            <span style={{ fontSize: '11px', color: '#888888' }}>{post.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags Widget */}
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#141414', marginBottom: '16px' }}>
                                Popular Tags
                            </h4>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {tags.map((t) => (
                                    <span
                                        key={t}
                                        style={{
                                            backgroundColor: '#EDEDED',
                                            borderRadius: '6px',
                                            padding: '6px 14px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: '#141414',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {t}
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

export default MediaDetailSection;
