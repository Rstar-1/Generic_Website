import React, { useEffect } from 'react';
import {
    pageSeoData,
    sitelinks,
    aeoFAQs,
    siteGeo,
    SITE_URL,
    SITE_NAME,
    DEFAULT_IMAGE
} from './seoConfig';

const updateTag = (selector, createTag, updateAttr) => {
    let el = document.querySelector(selector);
    if (!el) {
        el = createTag();
        document.head.appendChild(el);
    }
    updateAttr(el);
    return el;
};

const SEO = ({
    page,
    title: customTitle,
    description: customDesc,
    keywords: customKeywords,
    image: customImage,
    path: customPath,
    type = 'website',
    breadcrumbs,
    faqs
}) => {
    const config = (page && pageSeoData[page]) || {};
    const title = customTitle || config.title || `${SITE_NAME} — AI Business Automation & Digital Growth Agency`;
    const description = customDesc || config.description || 'inraClick combines intelligent business automation, website development, SEO, AEO, and GEO to help businesses grow.';
    const keywords = customKeywords || config.keywords || 'inraClick, AI business automation, SEO agency Mumbai, AEO, GEO';
    const pagePath = customPath || config.path || '';
    const canonicalUrl = `${SITE_URL}${pagePath}`;
    const imageUrl = customImage ? (customImage.startsWith('http') ? customImage : `${SITE_URL}${customImage}`) : `${SITE_URL}${DEFAULT_IMAGE}`;
    const activeFaqs = faqs || (page === 'home' || !page ? aeoFAQs : []);

    useEffect(() => {
        // 1. Title
        document.title = title;

        // 2. Standard Meta
        updateTag('meta[name="description"]', () => document.createElement('meta'), (el) => {
            el.setAttribute('name', 'description');
            el.setAttribute('content', description);
        });
        updateTag('meta[name="keywords"]', () => document.createElement('meta'), (el) => {
            el.setAttribute('name', 'keywords');
            el.setAttribute('content', keywords);
        });
        updateTag('meta[name="robots"]', () => document.createElement('meta'), (el) => {
            el.setAttribute('name', 'robots');
            el.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        });

        // 3. Canonical
        updateTag('link[rel="canonical"]', () => document.createElement('link'), (el) => {
            el.setAttribute('rel', 'canonical');
            el.setAttribute('href', canonicalUrl);
        });

        // 4. Open Graph (Social Sharing)
        const ogTags = [
            { property: 'og:site_name', content: SITE_NAME },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:url', content: canonicalUrl },
            { property: 'og:type', content: type },
            { property: 'og:image', content: imageUrl },
            { property: 'og:locale', content: 'en_US' }
        ];
        ogTags.forEach(({ property, content }) => {
            updateTag(`meta[property="${property}"]`, () => document.createElement('meta'), (el) => {
                el.setAttribute('property', property);
                el.setAttribute('content', content);
            });
        });

        // 5. Twitter Cards
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: imageUrl }
        ];
        twitterTags.forEach(({ name, content }) => {
            updateTag(`meta[name="${name}"]`, () => document.createElement('meta'), (el) => {
                el.setAttribute('name', name);
                el.setAttribute('content', content);
            });
        });

        // 6. GEO Meta Tags (Generative Engine & Local Search Optimization)
        const geoTags = [
            { name: 'geo.region', content: siteGeo.region },
            { name: 'geo.placename', content: siteGeo.placename },
            { name: 'geo.position', content: siteGeo.position },
            { name: 'ICBM', content: siteGeo.icbm },
            { name: 'ai-content-declaration', content: 'human-directed AI workflows' }
        ];
        geoTags.forEach(({ name, content }) => {
            updateTag(`meta[name="${name}"]`, () => document.createElement('meta'), (el) => {
                el.setAttribute('name', name);
                el.setAttribute('content', content);
            });
        });

        // 7. Structured Data (JSON-LD) for Google Sitelinks, Knowledge Graph & AEO
        const graph = [
            // Website Schema with Sitelinks Navigation
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                description: 'AI Business Automation & Digital Growth Agency in Mumbai',
                publisher: { '@id': `${SITE_URL}/#organization` },
                hasPart: sitelinks.map((link) => ({
                    '@type': 'SiteNavigationElement',
                    name: link.name,
                    description: link.description,
                    url: link.url
                }))
            },
            // Organization & LocalBusiness Schema
            {
                '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
                '@id': `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}${DEFAULT_IMAGE}`,
                image: imageUrl,
                description:
                    'inraClick is a leading AI Business Automation and Digital Growth agency in Mumbai specializing in human-led AI, web development, SEO, AEO, and performance marketing.',
                telephone: siteGeo.telephone,
                email: siteGeo.email,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: siteGeo.streetAddress,
                    addressLocality: siteGeo.addressLocality,
                    addressRegion: siteGeo.addressRegion,
                    postalCode: siteGeo.postalCode,
                    addressCountry: siteGeo.addressCountry
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 18.9220,
                    longitude: 72.8347
                },
                sameAs: [
                    import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://www.instagram.com/inraclick/',
                    import.meta.env.VITE_SOCIAL_YOUTUBE || 'https://www.youtube.com/@INRACLICK',
                    import.meta.env.VITE_SOCIAL_FACEBOOK || 'https://www.facebook.com/share/p/1EhdBQaRw4/',
                    import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com'
                ].filter(Boolean)
            },
            // WebPage Schema
            {
                '@type': 'WebPage',
                '@id': `${canonicalUrl}#webpage`,
                url: canonicalUrl,
                name: title,
                description: description,
                isPartOf: { '@id': `${SITE_URL}/#website` }
            }
        ];

        // BreadcrumbList Schema
        const activeBreadcrumbs = breadcrumbs || [
            { label: 'Home', path: '/' },
            ...(pagePath && pagePath !== '/' && pagePath !== '/home'
                ? [{ label: title.split('|')[0].trim(), path: pagePath }]
                : [])
        ];
        if (activeBreadcrumbs.length > 1) {
            graph.push({
                '@type': 'BreadcrumbList',
                itemListElement: activeBreadcrumbs.map((crumb, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: crumb.label,
                    item: crumb.path.startsWith('http') ? crumb.path : `${SITE_URL}${crumb.path}`
                }))
            });
        }

        // AEO: FAQPage Schema for AI Overviews / Answer Engines
        if (activeFaqs && activeFaqs.length > 0) {
            graph.push({
                '@type': 'FAQPage',
                mainEntity: activeFaqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer
                    }
                }))
            });
        }

        const jsonLd = {
            '@context': 'https://schema.org',
            '@graph': graph
        };

        let scriptEl = document.getElementById('inraclick-seo-jsonld');
        if (!scriptEl) {
            scriptEl = document.createElement('script');
            scriptEl.id = 'inraclick-seo-jsonld';
            scriptEl.type = 'application/ld+json';
            document.head.appendChild(scriptEl);
        }
        scriptEl.textContent = JSON.stringify(jsonLd);
    }, [title, description, keywords, canonicalUrl, imageUrl, type]);

    return null;
};

export default React.memo(SEO);
