const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://inraclick.com').replace(/\/$/, '');
const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'inraClick';
const DEFAULT_IMAGE = '/sobo_logo.webp';

export const siteGeo = {
    region: 'IN-MH',
    placename: 'Mumbai',
    position: '18.9220;72.8347',
    icbm: '18.9220, 72.8347',
    streetAddress: 'Apollo Bandar, Colaba',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400001',
    addressCountry: 'IN',
    telephone: import.meta.env.VITE_PHONE || '+91 7015163045',
    email: import.meta.env.VITE_EMAIL || 'kohad0681@gmail.com'
};

export const sitelinks = [
    {
        name: 'About',
        description: "Learn about inraClick's human-led AI mission, team, and digital transformation story.",
        url: `${SITE_URL}/about`
    },
    {
        name: 'Services',
        description: 'AI + Human Collaboration, Digital Business Intelligence, SEO & Organic Reach, and Automation.',
        url: `${SITE_URL}/service`
    },
    {
        name: 'Contact Us',
        description: 'Connect with our Mumbai office at Apollo Bandar, Colaba for project inquiries.',
        url: `${SITE_URL}/connect`
    },
    {
        name: 'Book a Demo',
        description: 'Schedule a personalized live demo of our business automation tools and solutions.',
        url: `${SITE_URL}/bookdemo`
    },
    {
        name: 'News & Blog',
        description: 'Latest insights on AI workflows, SEO, AEO, GEO, and scalable business ecosystems.',
        url: `${SITE_URL}/blog`
    },
    {
        name: 'Products',
        description: 'Explore our suite of intelligent digital business solutions and products.',
        url: `${SITE_URL}/products`
    }
];

export const aeoFAQs = [
    {
        question: 'What is inraClick?',
        answer: 'inraClick is a leading AI Business Automation and Digital Growth agency based in Mumbai, India. We combine human-led AI workflows, custom website development, SEO, AEO, GEO, and performance marketing to scale modern businesses.'
    },
    {
        question: 'What services does inraClick provide?',
        answer: 'inraClick provides AI + Human Collaboration workflows, Digital Business Intelligence, SEO & Organic Reach, Smart Promotion Tools, Privacy & Secure Digital Systems, and Enterprise Growth Automation.'
    },
    {
        question: 'How does inraClick approach Human-Led AI Collaboration?',
        answer: 'inraClick integrates AI as an intelligent guide and multiplier for human teams, empowering workers with automated data intelligence and streamlined digital workflows while retaining human creativity and oversight.'
    },
    {
        question: 'Where is inraClick located?',
        answer: 'inraClick is located at Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India.'
    },
    {
        question: 'How does inraClick optimize for AEO and GEO?',
        answer: 'inraClick implements Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) through structured JSON-LD schemas, factual knowledge graph entity markup, and verified local business coordinates.'
    }
];

export const pageSeoData = {
    home: {
        title: `${SITE_NAME} — AI Business Automation & Digital Growth Agency Mumbai`,
        description:
            'inraClick is a premier AI Business Automation and Digital Marketing company in Mumbai. We build scalable digital workflows, SEO, AEO, GEO, and smart promotion tools to grow your business.',
        keywords:
            'inraClick, AI business automation, digital marketing Mumbai, human-led AI, SEO agency, AEO, GEO, web development Mumbai, business growth solutions',
        path: '/home'
    },
    about: {
        title: `About Us | ${SITE_NAME} — Our Story & Mission`,
        description:
            "Discover inraClick's story and mission. We empower humans with artificial intelligence, delivering scalable business intelligence, secure systems, and measurable ROI.",
        keywords: 'about inraClick, inraClick story, AI mission, digital agency team, business automation Mumbai',
        path: '/about'
    },
    service: {
        title: `Our Services | ${SITE_NAME} — AI & Digital Solutions`,
        description:
            'Explore our end-to-end digital services: AI + Human Collaboration, Business Intelligence, Technical SEO, Smart Promotion Tools, Privacy Systems, and Growth Automation.',
        keywords: 'inraClick services, AI workflow automation, digital business intelligence, technical SEO, marketing automation',
        path: '/service'
    },
    blog: {
        title: `News & Insights | ${SITE_NAME} Tech & AI Articles`,
        description:
            'Read the latest articles on artificial intelligence, algorithmic marketing campaigns, SEO scaling, AEO strategies, and digital business trends.',
        keywords: 'inraClick blog, AI articles, SEO news, digital marketing insights, business automation blog',
        path: '/blog'
    },
    bookdemo: {
        title: `Book a Live Demo | ${SITE_NAME} AI Business Automation`,
        description:
            'Schedule a one-on-one live demonstration of inraClick automation tools and learn how AI workflows can elevate your digital operations.',
        keywords: 'book a demo inraClick, schedule AI demo, business automation demo, digital growth consultation',
        path: '/bookdemo'
    },
    connect: {
        title: `Connect With Us | ${SITE_NAME} Mumbai Office`,
        description:
            'Get in touch with inraClick. Contact our team in Apollo Bandar, Colaba, Mumbai for business inquiries, partnerships, and custom digital solutions.',
        keywords: 'contact inraClick, inraClick address Mumbai, connect with inraClick, digital agency contact',
        path: '/connect'
    },
    product: {
        title: `Products Collection | ${SITE_NAME} Digital Solutions`,
        description:
            'Explore our collection of intelligent digital products, automation blueprints, and scalable business tools designed for measurable growth.',
        keywords: 'inraClick products, business automation products, digital solutions, scalable enterprise tools',
        path: '/products'
    }
};

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
