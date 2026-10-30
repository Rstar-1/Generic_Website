import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';

// File & directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants & Mode Detection
const hasBuiltAssets = await fs.access(path.join(__dirname, 'dist/client/index.html')).then(() => true).catch(() => false);
const isProduction = process.env.NODE_ENV === 'production' || (process.env.NODE_ENV !== 'development' && hasBuiltAssets);
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
    ? await fs.readFile(path.join(__dirname, 'dist/client/index.html'), 'utf-8').catch(() => '')
    : '';
const ssrManifest = isProduction
    ? await fs.readFile(path.join(__dirname, 'dist/client/.vite/ssr-manifest.json'), 'utf-8').then(JSON.parse).catch(() => undefined)
    : undefined;

// Create Express app & enable Gzip/Deflate compression for all responses
const app = express();
app.use(compression());

function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[char]);
}

// Pre-load machine-readable discovery assets into memory
const ardJson = await fs.readFile(path.join(__dirname, 'public/.well-known/ard.json'), 'utf-8').catch(() => '{}');
const catalogJson = await fs.readFile(path.join(__dirname, 'public/.well-known/ai-catalog.json'), 'utf-8').catch(() => ardJson);
const llmsTxt = await fs.readFile(path.join(__dirname, 'public/llms.txt'), 'utf-8').catch(() => '');
const llmsFullTxt = await fs.readFile(path.join(__dirname, 'public/llms-full.txt'), 'utf-8').catch(() => '');
const sitemapXml = await fs.readFile(path.join(__dirname, 'public/sitemap.xml'), 'utf-8').catch(() => '');

// -------------------------------------------------------------
// 1. High-Priority AI Agent Discovery & Machine-readable Endpoints
// (Must be registered FIRST to ensure they are never intercepted by SSR HTML)
// -------------------------------------------------------------
app.all(['/.well-known/ard.json', '/ard.json'], (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(ardJson);
});

app.all(['/.well-known/ai-catalog.json', '/ai-catalog.json'], (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(catalogJson);
});

app.all(['/llms.txt', '/llms-full.txt'], (req, res) => {
    const isFull = req.path.includes('full');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(isFull ? llmsFullTxt : llmsTxt);
});

app.all('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(sitemapXml);
});

app.all('/robots.txt', (req, res) => {
    const host = req.get('host') || `localhost:${port}`;
    const protocol = req.protocol || 'http';
    const origin = `${protocol}://${host}`;
    const content = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(content);
});

// -------------------------------------------------------------
// 2. Vite Middleware (Dev) or Sirv Static (Prod)
// -------------------------------------------------------------
let vite;
if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base,
        ssr: {
            resolve: {
                conditions: ['import', 'default'],
                externalConditions: ['import', 'default'],
            },
        },
    });
    app.use(vite.middlewares);
} else {
    const sirv = (await import('sirv')).default;
    app.use(
        base,
        sirv(path.join(__dirname, 'dist/client'), {
            extensions: [],
            gzip: true,
            dot: true,
            maxAge: 31536000,
            immutable: true,
            setHeaders(res, pathname) {
                if (pathname.startsWith('/assets/') || /\.(png|jpe?g|webp|svg|gif|ico|woff2?|css|js)$/i.test(pathname)) {
                    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                }
            },
        })
    );
}

// -------------------------------------------------------------
// 3. Server-Side Rendering (SSR) & HTML Delivery with In-Memory Caching
// -------------------------------------------------------------
const ssrCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

app.use(async (req, res, next) => {
    try {
        const rawUrl = req.originalUrl || '/';
        const url = rawUrl.startsWith(base) ? rawUrl.slice(base.length - 1) : rawUrl;
        const cacheKey = url.split('?')[0];

        // Never render SPA HTML for missing static assets or files with extensions
        if (/\.[a-zA-Z0-9]+$/.test(cacheKey)) {
            return res.status(404).end();
        }

        const agentLinkHeader = [
            `</.well-known/ard.json>; rel="ard"`,
            `</.well-known/ai-catalog.json>; rel="ai-catalog"`,
            `</llms.txt>; rel="describedby"`
        ].join(', ');

        if (isProduction && ssrCache.has(cacheKey)) {
            const cached = ssrCache.get(cacheKey);
            if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
                res.setHeader('Link', agentLinkHeader);
                res.status(200).set({
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
                }).send(cached.html);
                return;
            }
        }

        let template;
        let render;

        if (!isProduction) {
            template = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
            template = await vite.transformIndexHtml(url, template);
            render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
        } else {
            template = templateHtml;
            render = (await import('./dist/server/entry-server.js')).render;
        }

        const rendered = await render(url, ssrManifest);
        const appHtml = rendered.html ?? (typeof rendered === 'string' ? rendered : '');
        const title = rendered.seo?.title || 'Ashmita Vinyls';
        const description = rendered.seo?.description || 'Discover our products and services.';
        const headTags = rendered.head ?? '';

        let html = template
            .replace('<!--app-title-->', escapeHtml(title))
            .replace(
                '<meta name="description" content="<!--app-description-->">',
                `<meta name="description" content="${escapeHtml(description)}">`
            )
            .replace('<!--app-description-->', escapeHtml(description))
            .replace('<!--app-head-->', headTags)
            .replace('<!--app-html-->', appHtml);

        // Move stylesheet link to the top of <head> before anything else so browser blocks paint until styles are ready
        const cssLinkMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+assets\/style-[^>]+>/i);
        if (cssLinkMatch) {
            const hrefMatch = cssLinkMatch[0].match(/href="([^"]+)"/);
            const preloadTag = hrefMatch ? `<link rel="preload" as="style" href="${hrefMatch[1]}">\n    ` : '';
            html = html.replace(cssLinkMatch[0], '');
            html = html.replace('<head>', `<head>\n    ${preloadTag}${cssLinkMatch[0]}`);
        }

        // Set Link header for AI Agent Discoverability
        res.setHeader('Link', agentLinkHeader);

        if (isProduction) {
            ssrCache.set(cacheKey, { html, timestamp: Date.now() });
        }

        res.status(200).set({
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
        }).send(html);
    } catch (error) {
        if (!isProduction && vite) {
            vite.ssrFixStacktrace(error);
        }
        console.error('SSR Error:', error.stack || error);
        next(error);
    }
});

app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port} (${isProduction ? 'production' : 'development'})`);
});
