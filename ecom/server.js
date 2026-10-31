import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';

// File & directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prevent uncaught stream errors from crashing the process
process.on('uncaughtException', (err) => {
    if (err.code === 'ENOENT') {
        console.warn('Handled stream ENOENT for static asset:', err.message);
        return;
    }
    console.error('Uncaught Exception:', err);
});

// Constants & Mode Detection
const hasBuiltAssets = await fs.access(path.join(__dirname, 'dist/client/index.html')).then(() => true).catch(() => false);
const isProduction = process.env.NODE_ENV === 'production' || (process.env.NODE_ENV !== 'development' && hasBuiltAssets);
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Dynamic production template loader with mtime cache-invalidation
let cachedTemplateHtml = '';
let cachedTemplateMtime = 0;

async function getTemplateHtml() {
    if (!isProduction) {
        return await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
    }
    const htmlPath = path.join(__dirname, 'dist/client/index.html');
    try {
        const stat = await fs.stat(htmlPath);
        if (stat.mtimeMs !== cachedTemplateMtime) {
            cachedTemplateHtml = await fs.readFile(htmlPath, 'utf-8');
            cachedTemplateMtime = stat.mtimeMs;
            ssrCache.clear();
        }
    } catch {
        if (!cachedTemplateHtml) {
            cachedTemplateHtml = await fs.readFile(htmlPath, 'utf-8').catch(() => '');
        }
    }
    return cachedTemplateHtml;
}

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
app.all(['/.well-known/ard.json', '/ard.json'], async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, 'public/.well-known/ard.json'), 'utf-8').catch(() => '{}');
    res.setHeader('Content-Type', 'application/ai-catalog+json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(data);
});

app.all(['/.well-known/ai-catalog.json', '/ai-catalog.json'], async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, 'public/.well-known/ai-catalog.json'), 'utf-8').catch(() => '{}');
    res.setHeader('Content-Type', 'application/ai-catalog+json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method === 'HEAD') return res.status(200).end();
    res.status(200).send(data);
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
        root: __dirname,
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
    app.use(
        base,
        express.static(path.join(__dirname, 'dist/client'), {
            maxAge: '1y',
            immutable: true,
            index: false,
            fallthrough: true,
            setHeaders(res, filePath) {
                if (filePath.includes('assets') || /\.(png|jpe?g|webp|svg|gif|ico|woff2?|css|js)$/i.test(filePath)) {
                    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                }
            },
        })
    );
    // Explicit 404 for missing hashed assets to prevent falling through to SSR HTML or stream errors
    app.use('/assets', (req, res) => {
        res.status(404).end();
    });
}

// -------------------------------------------------------------
// 3. Server-Side Rendering (SSR) & HTML Delivery with In-Memory Caching
// -------------------------------------------------------------
const ssrCache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const agentLinkHeader = [
    `</.well-known/ard.json>; rel="ard"; type="application/ai-catalog+json"`,
    `</.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/ai-catalog+json"`,
    `</llms.txt>; rel="describedby"; type="text/plain"`
].join(', ');

app.use(async (req, res, next) => {
    try {
        const rawUrl = req.originalUrl || '/';
        const url = rawUrl.startsWith(base) ? rawUrl.slice(base.length - 1) : rawUrl;
        const cacheKey = url.split('?')[0];

        // Never render SPA HTML for missing static assets or files with extensions
        if (/\.[a-zA-Z0-9]+$/.test(cacheKey)) {
            return res.status(404).end();
        }

        if (isProduction && ssrCache.has(cacheKey)) {
            const cached = ssrCache.get(cacheKey);
            if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
                res.setHeader('Link', agentLinkHeader);
                res.status(200).set({
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }).send(cached.html);
                return;
            }
        }

        let template;
        let render;

        if (!isProduction) {
            template = await getTemplateHtml();
            template = await vite.transformIndexHtml(url, template);
            render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
        } else {
            template = await getTemplateHtml();
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
            html = html.replace(cssLinkMatch[0], '');
            html = html.replace('<head>', `<head>\n    ${cssLinkMatch[0]}`);
        }

        // Set Link header for AI Agent Discoverability
        res.setHeader('Link', agentLinkHeader);

        if (isProduction) {
            ssrCache.set(cacheKey, { html, timestamp: Date.now() });
        }

        res.status(200).set({
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }).send(html);
    } catch (error) {
        if (!isProduction && vite) {
            vite.ssrFixStacktrace(error);
        }
        console.error('SSR Error:', error.stack || error);
        next(error);
    }
});

async function warmSsrCache() {
    if (!isProduction) return;
    try {
        const { render } = await import('./dist/server/entry-server.js');
        const routesToWarm = ['/', '/about', '/product', '/supplier', '/blog', '/connect', '/category'];
        for (const route of routesToWarm) {
            try {
                const rendered = await render(route, ssrManifest);
                const appHtml = rendered.html ?? (typeof rendered === 'string' ? rendered : '');
                const title = rendered.seo?.title || 'Ashmita Vinyls';
                const description = rendered.seo?.description || 'Discover our products and services.';
                const headTags = rendered.head ?? '';

                const currentTemplate = await getTemplateHtml();
                let html = currentTemplate
                    .replace('<!--app-title-->', escapeHtml(title))
                    .replace(
                        '<meta name="description" content="<!--app-description-->">',
                        `<meta name="description" content="${escapeHtml(description)}">`
                    )
                    .replace('<!--app-description-->', escapeHtml(description))
                    .replace('<!--app-head-->', headTags)
                    .replace('<!--app-html-->', appHtml);

                const cssLinkMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+assets\/style-[^>]+>/i);
                if (cssLinkMatch) {
                    html = html.replace(cssLinkMatch[0], '');
                    html = html.replace('<head>', `<head>\n    ${cssLinkMatch[0]}`);
                }

                ssrCache.set(route, { html, timestamp: Date.now() });
            } catch (err) {
                console.warn(`Failed warming route ${route}:`, err.message);
            }
        }
    } catch (err) {
        console.warn('Failed to pre-warm SSR cache:', err.message);
    }
}

app.listen(port, async () => {
    console.log(`SSR server running at http://localhost:${port} (${isProduction ? 'production' : 'development'})`);
    if (isProduction) {
        await warmSsrCache();
    }
});
