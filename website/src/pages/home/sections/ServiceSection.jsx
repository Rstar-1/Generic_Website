import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Tab from '../../../components/common/Tab';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';
import launchShieldImg from '../../../assets/launch-shield.jpg';
import launchGlobeImg from '../../../assets/launch-globe.jpg';
import launchWaveImg from '../../../assets/launch-wave.jpg';
import launchCertificationsImg from '../../../assets/launch-certifications.jpg';

// --- STAGE 1: INDUSTRY TABS DATA ---
const industryTabsData = {
    'Manufacturer': {
        title: 'Empower modern',
        keyword: 'manufacturing',
        titleEnd: 'with smart tracking & supply intelligence',
        description: 'Streamline raw material procurement, real-time production line monitoring, and factory-to-depot logistics workflows.',
        bullets: [
            'Automated inventory sync',
            'Factory floor IoT telemetry',
            'Raw material tracking',
            'Batch dispatch verification'
        ],
        cta: 'Explore manufacturing solutions',
        badge: 'Smart Factory',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
    },
    'Company': {
        title: 'Centralize enterprise',
        keyword: 'operations',
        titleEnd: 'with end-to-end multi-tier visibility',
        description: 'Bridge enterprise planning with distributed nodes, providing executive dashboards, financial auditing, and unified pipeline controls.',
        bullets: [
            'Executive overview suite',
            'Enterprise ERP sync',
            'Multi-tier node governance',
            'Automated compliance reporting'
        ],
        cta: 'Explore enterprise solutions',
        badge: 'Enterprise Hub',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    'Sector': {
        title: 'Optimize industry-wide',
        keyword: 'sectors',
        titleEnd: 'with unified ecosystem coordination',
        description: 'Connect market verticals with standardized data protocols, regulatory compliance, and cross-sector trade facilitation.',
        bullets: [
            'Cross-sector analytics',
            'Regulatory compliance audits',
            'Trade corridor integration',
            'Market index benchmarking'
        ],
        cta: 'Explore sector solutions',
        badge: 'Sector Grid',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    },
    'Distributor': {
        title: 'Accelerate regional',
        keyword: 'distribution',
        titleEnd: 'with smart routing & dispatch speed',
        description: 'Coordinate high-volume fulfillment centers with automated consignment dispatch, dynamic routing, and instant invoice clearance.',
        bullets: [
            'Dynamic fleet dispatch',
            'Cold-chain telemetry',
            'Multi-depot balancing',
            'Automated billing reconciliations'
        ],
        cta: 'Explore distributor tools',
        badge: 'Distribution Hub',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    },
    'Stockist': {
        title: 'Maintain optimal',
        keyword: 'stocking',
        titleEnd: 'with automated replenishment intelligence',
        description: 'Eliminate stockouts and excess buffer with AI-driven inventory forecasting, tiered storage allocations, and batch expiration alerts.',
        bullets: [
            'Predictive reorder triggers',
            'SKU turnover optimization',
            'FIFO batch management',
            'Consignment escrow locks'
        ],
        cta: 'Explore stockist tools',
        badge: 'Stock Depot',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80'
    },
    'Trader': {
        title: 'Maximize trade',
        keyword: 'liquidity',
        titleEnd: 'with low-latency settlement engines',
        description: 'Execute high-frequency purchase bids, commodity trading, and arbitrage with instant multi-currency margin clearing.',
        bullets: [
            'Real-time bid-ask matching',
            'Automated margin alerts',
            'Cross-border currency clearing',
            'Trade dispute mitigation'
        ],
        cta: 'Explore trading platform',
        badge: 'Trade Exchange',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80'
    },
    'Retailer': {
        title: 'Elevate local',
        keyword: 'retailers',
        titleEnd: 'with omnichannel sync & POS agility',
        description: 'Empower brick-and-mortar and digital store owners with real-time catalog feeds, one-click reordering, and direct consumer loyalty rewards.',
        bullets: [
            'Omnichannel inventory sync',
            'Next-day restocking requests',
            'POS system integration',
            'Dynamic store pricing'
        ],
        cta: 'Explore retail playbooks',
        badge: 'Retail Store',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'
    },
    'End User': {
        title: 'Deliver frictionless',
        keyword: 'consumer',
        titleEnd: 'fulfillment & transparent tracking',
        description: 'Provide consumers with transparent product provenance, instant delivery milestones, and seamless digital warranty activation.',
        bullets: [
            'Direct provenance verification',
            'Live courier tracking',
            'Digital warranty cards',
            'Direct consumer feedback loop'
        ],
        cta: 'Explore consumer solutions',
        badge: 'Consumer Touchpoint',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    },
    'Social': {
        title: 'Build engaging',
        keyword: 'social',
        titleEnd: 'apps where users love to stay and connect',
        description: 'Fuel your growth with high-quality real-time voice and video services and social app best practices.',
        bullets: [
            'Social live streaming',
            'Live audio room',
            '1-on-1 paid video call',
            'Mini-game center'
        ],
        cta: 'Learn more',
        badge: 'Social Live',
        badgeCoins: '🪙 116',
        hostName: 'Sarah Jenkins',
        hostStats: '12.4k viewers',
        image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    },
    'Gaming': {
        title: 'Power immersive',
        keyword: 'gaming',
        titleEnd: 'experiences with crystal-clear voice chat',
        description: 'Deliver ultra-low latency game voice chat, spatial audio, and seamless stream gameplay for esports and casual games.',
        bullets: [
            'In-game voice chat',
            'Spatial 3D audio',
            'Game live streaming',
            'Squad comms & AI denoise'
        ],
        cta: 'Explore gaming SDKs',
        badge: 'Game Arena',
        badgeCoins: '🎮 2.4k',
        hostName: 'Alex Rivers',
        hostStats: '28.1k viewers',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    },
    'Education': {
        title: 'Transform digital',
        keyword: 'classrooms',
        titleEnd: 'with real-time interactive learning',
        description: 'Empower virtual classes with multi-party HD video, interactive whiteboards, screen sharing, and breakout rooms.',
        bullets: [
            'Interactive whiteboard',
            'Large-scale webinars',
            '1-on-1 online tutoring',
            'Screen share & recording'
        ],
        cta: 'Discover education tools',
        badge: 'Live Class',
        badgeCoins: '📚 Grade A',
        hostName: 'Dr. Emily Chen',
        hostStats: '1,420 students',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'
    },
    'Live commerce': {
        title: 'Drive instant',
        keyword: 'sales',
        titleEnd: 'with interactive live shopping shows',
        description: 'Boost conversion rates with real-time live auction bidding, co-host PK battles, and synchronous product drop cards.',
        bullets: [
            'Flash sale countdowns',
            'Co-hosting & PK battles',
            'Ultra-low latency bidding',
            'Product carousel showcase'
        ],
        cta: 'See live shopping playbooks',
        badge: 'Flash Shop',
        badgeCoins: '🔥 Hot Sale',
        hostName: 'Chloe Bennett',
        hostStats: '45.8k buyers',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    'Telehealth': {
        title: 'Deliver secure',
        keyword: 'telehealth',
        titleEnd: 'consultations and remote care',
        description: 'HIPAA-compliant, high-definition video consultations with secure EHR integration, patient queues, and chat attachments.',
        bullets: [
            'HIPAA-compliant video',
            'EHR & triage integration',
            'Virtual waiting rooms',
            'Encrypted diagnostics share'
        ],
        cta: 'Explore telehealth solutions',
        badge: 'TeleClinic',
        badgeCoins: '🔒 Encrypted',
        hostName: 'Dr. Marcus Vance',
        hostStats: 'Verified Specialist',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80'
    },
    'Virtual collaboration': {
        title: 'Elevate remote',
        keyword: 'collaboration',
        titleEnd: 'and persistent team workspaces',
        description: 'Host fluid hybrid team syncs, dynamic breakout rooms, and virtual office spaces powered by AI noise reduction.',
        bullets: [
            'Dynamic breakout rooms',
            'AI voice & echo cancellation',
            'Multi-stream screen sharing',
            'Instant meeting summaries'
        ],
        cta: 'Learn more about workspaces',
        badge: 'Team Room',
        badgeCoins: '⚡ 34 Online',
        hostName: 'David & Lisa',
        hostStats: 'Design Review Sync',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    },
    'Astrology': {
        title: 'Create mystical',
        keyword: 'astrology',
        titleEnd: 'readings and 1-on-1 consultations',
        description: 'Connect seekers with astrologers and tarot readers through private video calls, animated virtual gifts, and live queueing.',
        bullets: [
            '1-on-1 private reading rooms',
            'Live tarot & zodiac broadcasts',
            'Virtual tipping & animated gifts',
            'Automated queue & token billing'
        ],
        cta: 'Discover astrology solutions',
        badge: 'Astro Live',
        badgeCoins: '✨ Star Level 5',
        hostName: 'Celeste Moon',
        hostStats: '8.9k seekers',
        image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=600&q=80',
        hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'
    }
};

const platformCodeSnippets = {
    Android: [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>val </span><span style={{ color: '#f1f5f9' }}>engine = </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngine(</span><span style={{ color: '#c084fc' }}>yourAppID, yourAppSign</span><span style={{ color: '#f1f5f9' }}>)</span></> },
        { num: 2, elements: <><span style={{ color: '#f1f5f9' }}>engine.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, user</span><span style={{ color: '#f1f5f9' }}>)</span></> },
        { num: 3, elements: <><span style={{ color: '#f1f5f9' }}>engine.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>)</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>engine.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID, </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoCanvas</span><span style={{ color: '#f1f5f9' }}>(</span><span style={{ color: '#c084fc' }}>play_view</span><span style={{ color: '#f1f5f9' }}>))</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>engine.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>)</span></> }
    ],
    iOS: [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>let </span><span style={{ color: '#f1f5f9' }}>profile = </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoEngineProfile</span><span style={{ color: '#f1f5f9' }}>(); profile.appID = </span><span style={{ color: '#c084fc' }}>yourAppID</span></> },
        { num: 2, elements: <><span style={{ color: '#94a3b8' }}>let </span><span style={{ color: '#f1f5f9' }}>engine = </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngine(</span><span style={{ color: '#c084fc' }}>with: profile</span><span style={{ color: '#f1f5f9' }}>, eventHandler: self)</span></> },
        { num: 3, elements: <><span style={{ color: '#f1f5f9' }}>engine.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>, user: </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoUser</span><span style={{ color: '#f1f5f9' }}>(userID: </span><span style={{ color: '#c084fc' }}>userID</span><span style={{ color: '#f1f5f9' }}>))</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>engine.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>)</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>engine.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>, canvas: canvas)</span></> }
    ],
    Web: [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>const </span><span style={{ color: '#f1f5f9' }}>zg = </span><span style={{ color: '#94a3b8' }}>new </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>(</span><span style={{ color: '#c084fc' }}>appID, server</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 2, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f1f5f9' }}>zg.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, token, &#123; userID &#125;</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 3, elements: <><span style={{ color: '#94a3b8' }}>const </span><span style={{ color: '#f1f5f9' }}>stream = </span><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f1f5f9' }}>zg.createStream();</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>zg.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>, stream);</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>zg.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> }
    ],
    Flutter: [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngineWithProfile(</span><span style={{ color: '#c084fc' }}>profile</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 2, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.instance.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, user</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 3, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.instance.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 4, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.instance.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 5, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.instance.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>);</span></> }
    ],
    'React Native': [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>const </span><span style={{ color: '#f1f5f9' }}>engine = </span><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>.createEngine(</span><span style={{ color: '#c084fc' }}>appID, appSign, true, 0</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 2, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f1f5f9' }}>engine.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, &#123; userID, userName &#125;</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 3, elements: <><span style={{ color: '#94a3b8' }}>await </span><span style={{ color: '#f1f5f9' }}>engine.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>await </span><span style={{ color: '#f1f5f9' }}>engine.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>await </span><span style={{ color: '#f1f5f9' }}>engine.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>);</span></> }
    ],
    Windows: [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>auto </span><span style={{ color: '#f1f5f9' }}>engine = </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>::createEngine(</span><span style={{ color: '#c084fc' }}>profile, nullptr</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 2, elements: <><span style={{ color: '#f1f5f9' }}>engine-&gt;loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, user</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 3, elements: <><span style={{ color: '#f1f5f9' }}>engine-&gt;startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>engine-&gt;startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID, canvas</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>engine-&gt;logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>);</span></> }
    ],
    macOS: [
        { num: 1, elements: <><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoEngineProfile</span><span style={{ color: '#f1f5f9' }}> *profile = [[</span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoEngineProfile</span><span style={{ color: '#f1f5f9' }}> alloc] init];</span></> },
        { num: 2, elements: <><span style={{ color: '#f1f5f9' }}>profile.appID = </span><span style={{ color: '#c084fc' }}>yourAppID</span><span style={{ color: '#f1f5f9' }}>; profile.appSign = </span><span style={{ color: '#c084fc' }}>yourAppSign</span><span style={{ color: '#f1f5f9' }}>;</span></> },
        { num: 3, elements: <><span style={{ color: '#f1f5f9' }}>engine = [</span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}> createEngineWithProfile:profile eventHandler:self];</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>[engine loginRoom:</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}> user:user];</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>[engine startPublishingStream:</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>];</span></> }
    ],
    Electron: [
        { num: 1, elements: <><span style={{ color: '#94a3b8' }}>const </span><span style={{ color: '#f1f5f9' }}>zg = </span><span style={{ color: '#94a3b8' }}>new </span><span style={{ color: '#f43f5e', fontWeight: 500 }}>ZegoExpressEngine</span><span style={{ color: '#f1f5f9' }}>(</span><span style={{ color: '#c084fc' }}>appID, appSign</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 2, elements: <><span style={{ color: '#f1f5f9' }}>zg.loginRoom(</span><span style={{ color: '#c084fc' }}>roomID, user</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 3, elements: <><span style={{ color: '#f1f5f9' }}>zg.startPublishingStream(</span><span style={{ color: '#c084fc' }}>streamID</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 4, elements: <><span style={{ color: '#f1f5f9' }}>zg.startPlayingStream(</span><span style={{ color: '#c084fc' }}>streamID, view</span><span style={{ color: '#f1f5f9' }}>);</span></> },
        { num: 5, elements: <><span style={{ color: '#f1f5f9' }}>zg.logoutRoom(</span><span style={{ color: '#c084fc' }}>roomID</span><span style={{ color: '#f1f5f9' }}>);</span></> }
    ]
};

const businessMetrics = [
    { value: '500+ Million', label: 'End users annually' },
    { value: '3+ Billion', label: 'Daily call minutes' },
    { value: '212+', label: 'countries and regions' }
];

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

const bottomStatCapsules = [
    { value: '500', plus: '+', label: 'Global nodes', icon: 'Globe' },
    { value: '99.99', plus: '%', label: 'Service uptime', icon: 'Clock' },
    { value: '79', plus: 'ms', label: 'The lowest latency', icon: 'Zap' },
    { value: '99.99', plus: '%', label: 'Service uptime', icon: 'Clock' }
];

const ServiceSection = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [scrollPercent, setScrollPercent] = useState(0);
    const [activeIndustryTab, setActiveIndustryTab] = useState('Company');
    const [activePlatformTab, setActivePlatformTab] = useState('Android');

    const activeIndustryCard = useMemo(() => {
        return industryTabsData[activeIndustryTab] || industryTabsData['Company'] || industryTabsData['Social'];
    }, [activeIndustryTab]);

    const activeCodeSnippet = useMemo(() => {
        return platformCodeSnippets[activePlatformTab] || platformCodeSnippets['Android'];
    }, [activePlatformTab]);

    const servicesData = useMemo(() => [
        {
            id: 'product-design',
            step: 1,
            tag: 'Product Design',
            color: '#3b82f6',
            glowColor: 'rgba(59, 130, 246, 0.48)',
            icon: 'Feather',
            heading: (
                <>
                    Industry-Specific Playbooks Unlocking
                    <br />
                    <span style={{ color: '#3b82f6' }}>Transformative Growth</span>
                </>
            ),
            description: "Tailored multi-tier solutions driving operational efficiency, transparent pipeline tracking, and rapid scaling across enterprise nodes.",
            ctaText: 'Case studies',
            ctaLink: '/services',
            hasTopCta: true,
            tabs: [
                { label: 'Manufacturer', value: 'Manufacturer' },
                { label: 'Company', value: 'Company' },
                { label: 'Sector', value: 'Sector' },
                { label: 'Distributor', value: 'Distributor' },
                { label: 'Stockist', value: 'Stockist' },
                { label: 'Trader', value: 'Trader' },
                { label: 'Retailer', value: 'Retailer' },
                { label: 'End User', value: 'End User' }
            ],
            collaboration: {
                title: 'Collaborate with our experts to turn requirements into solutions, bridging gaps with industry knowledge and hands-on experience, advancing towards achievement.',
                items: [
                    'Industry research',
                    'Solution proposals',
                    'Pain point analysis',
                    '1-on-1 communication'
                ],
                buttonText: 'Schedule a call',
                linkText: 'Learn more about support plans'
            }
        },
        {
            id: 'development',
            step: 2,
            tag: 'Development',
            color: '#22c55e',
            glowColor: 'rgba(34, 197, 94, 0.48)',
            icon: 'Code',
            heading: (
                <>
                    <span style={{ color: '#22c55e' }}>Developer-Friendly</span> SDKs, APIs, Resources,
                    <br />
                    and Supportive Tech Guidance
                </>
            ),
            description: (
                <>
                    Venture into the developer hub to unleash the full potential of real-time capabilities. Expedite your projects using{' '}
                    <strong style={{ color: '#ffffff', fontWeight: 600 }}>custom-tailored learning resources</strong> and{' '}
                    <strong style={{ color: '#ffffff', fontWeight: 600 }}>one-on-one expert mentorship</strong>.
                </>
            ),
            ctaText: 'Go to developer hub',
            ctaLink: '/services',
            hasTopCta: true,
            tools: [
                { label: 'Learning Tube', icon: 'YouTube', href: '/services' },
                { label: 'Documentation', icon: 'Clipboard', href: '/services' },
                { label: 'Demo Apps', icon: 'Box', href: '/services' },
                { label: 'Tech Support', icon: 'Headphones', href: '/services' }
            ]
        },
        {
            id: 'launch',
            step: 3,
            tag: 'Launch',
            color: '#db5e1f',
            glowColor: 'rgba(219, 94, 31, 0.48)',
            icon: 'PaperPlane',
            heading: (
                <>
                    Robust Platform Fortifying Business Expansion,
                    <br />
                    Backed by <span style={{ color: '#db5e1f' }}>Proven Security</span>
                </>
            ),
            description: 'Scale with the ZEGOCLOUD Independent Hosting RTC Services. Our infrastructure comprises a robust global multi-cloud communication network, ensuring superior audiovisual communication experiences and service stability for all devices, across any network, worldwide.',
            ctaText: '',
            ctaLink: '',
            hasTopCta: false
        }
    ], []);

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

    return (
        <Container style={{ backgroundColor: 'var(--dark)' }}>
            <div ref={sectionRef} className="py-60 relative w-full">
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
                        }}
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

                    {servicesData.map((item, index) => {
                        const stageThreshold = index === 0 ? 0.05 : index === 1 ? 0.35 : 0.7;
                        const isReached = scrollPercent >= stageThreshold;

                        return (
                            <div
                                key={item.id}
                                className="flex items-start w-full relative z-10"
                                style={{
                                    gap: '20px',
                                    marginBottom: index === servicesData.length - 1 ? '0' : '90px'
                                }}
                            >
                                <div className="w-5">
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

                                <div className="w-95">
                                    <p className="text-white font-500 mini-text">{item.tag}</p>

                                    <h2 className="text-white font-600 head-text mt-10 sm-mt-8">
                                        {item.heading}
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
                                            <div className="mb-24">
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
                                                <div className="grid-cols-2 sm-grid-cols-1 p-30 items-center" style={{ gap: '20px' }}>
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
                                                <div className="flex sm-grid-cols-1 items-center justify-between gap-12 p-30">
                                                    <div className="w-80">
                                                        <p className="text-white font-500 para-text">
                                                            Collaborate with our experts <span className="text-primary">to turn requirements into solutions</span>,
                                                            bridging gaps with industry knowledge and hands-on experience, advancing towards achievement.
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

                                                    <div className="w-20 grid-cols-1 gap-10">
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

                                                <div className="rounded-5 p-16 mt-10"
                                                    style={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                                    }}>
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
                                                            <p className="mini-text text-white font-300">{line.elements}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid-cols-4 sm-grid-cols-2 gap-12 mt-24">
                                                    {item.tools.map((tool, tIdx) => (
                                                        <div
                                                            key={tIdx}
                                                            className="flex items-center justify-between p-8 rounded-5"
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
                                                            Data Security and User Privacy
                                                        </h4>
                                                        <p className="mt-3 text-white font-300 mini-text">
                                                            We've implemented industry-standard security measures and obtained recognized certifications, ensuring your data remains secure and compliant
                                                        </p>
                                                        <Button
                                                            text="More about security"
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
                                                    <div
                                                        className="rounded-5"
                                                        style={{
                                                            backgroundColor: '#0c101c',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)'
                                                        }}
                                                    >
                                                        <div className='p-22'>
                                                            <h3 className="text-white head-text font-600 capitalize">
                                                                Trusted by 4,000 businesses
                                                            </h3>

                                                            <div className='relative grid-cols-2 gap-12 mt-15'>
                                                                {businessMetrics.map((bm, mIdx) => (
                                                                    <div key={mIdx}>
                                                                        <p className="text-white midpara-text font-500">
                                                                            {bm.value}
                                                                        </p>
                                                                        <p className="mini-text text-white font-300">
                                                                            {bm.label}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <Button
                                                                text="More about security"
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
                                                </div>

                                                <div
                                                    className="rounded-5"
                                                    style={{
                                                        backgroundColor: '#0c101c',
                                                        border: '1px solid rgba(255, 255, 255, 0.08)'
                                                    }}
                                                >
                                                    <div className='p-22'>
                                                        <h3 className="text-white head-text font-600 capitalize">
                                                            Trusted by 4,000 businesses
                                                        </h3>

                                                        <div className='relative grid-cols-2 gap-12 mt-15'>
                                                            {businessMetrics.map((bm, mIdx) => (
                                                                <div key={mIdx}>
                                                                    <p className="text-white midpara-text font-500">
                                                                        {bm.value}
                                                                    </p>
                                                                    <p className="mini-text text-white font-300">
                                                                        {bm.label}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <Button
                                                            text="More about security"
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

                                                    <div
                                                        className='relative z-10 mx-auto mt-14'
                                                    >
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
                                                {bottomStatCapsules.map((stat, sIdx) => (
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