import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Writable } from 'node:stream';
import { store } from './app/server/store';
import App from './app/App.jsx';
import {
  resolveImagePath
} from './utils';
import { buildMetadata } from './seo/metadata';
import { buildGraphJsonLd } from './seo/jsonLd';

import './utils/i18n';
import './styles/theme.scss';
import './styles/structure.scss';
import './styles/global.scss';

function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[char]);
}

export function buildHeadTags(url) {
    const pathname = new URL(url, 'http://localhost').pathname;
    const meta = buildMetadata({ path: pathname });
    const graph = buildGraphJsonLd({ meta });

    const defaultBanner = resolveImagePath('Banner.jpg');
    const rawLcp = (meta.image && !meta.image.includes('hospital_ward')) ? meta.image : defaultBanner;
    const lcpImage = rawLcp ? resolveImagePath(rawLcp) : defaultBanner;
    const isImageLcp = Boolean(lcpImage && !/\.(mp4|webm|ogg)($|\?|#)/i.test(lcpImage));

    const tags = [
        meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : '',
        `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
        meta.canonical ? `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />` : '',
        `<meta property="og:site_name" content="${escapeHtml(meta.siteName)}" />`,
        `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
        `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
        meta.canonical ? `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />` : '',
        `<meta property="og:type" content="${escapeHtml(meta.type)}" />`,
        meta.image ? `<meta property="og:image" content="${escapeHtml(meta.image)}" />` : '',
        `<meta property="og:locale" content="${escapeHtml(meta.language || 'en_US')}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
        meta.image ? `<meta name="twitter:image" content="${escapeHtml(meta.image)}" />` : '',
        isImageLcp ? `<link rel="preload" as="image" href="${escapeHtml(lcpImage)}" fetchpriority="high" />` : '',
        `<link rel="preload" as="image" href="${escapeHtml(resolveImagePath('sobo_logo.png'))}" fetchpriority="high" />`,
        `<script id="site-seo-jsonld" type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`,
    ].filter(Boolean).join('\n    ');

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonicalUrl: meta.canonical,
        imageUrl: meta.image,
        tags,
    };
}

export async function render(url, ssrManifest) {
    const head = buildHeadTags(url);

    const html = await new Promise((resolve, reject) => {
        let content = '';
        const writable = new Writable({
            write(chunk, encoding, callback) {
                content += chunk.toString();
                callback();
            },
        });

        const { pipe } = renderToPipeableStream(
            <Provider store={store}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </Provider>,
            {
                onAllReady() {
                    pipe(writable);
                },
                onError(err) {
                    reject(err);
                },
            }
        );

        writable.on('finish', () => resolve(content));
        writable.on('error', reject);
    });

    return {
        html,
        head: head.tags,
        seo: head,
        toString() {
            return html;
        },
    };
}
