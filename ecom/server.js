import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : '';
const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8').then(JSON.parse).catch(() => undefined)
    : undefined;

// Create Express app
const app = express();

function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[char]);
}

// Add Vite or respective production middlewares
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
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [], gzip: true }));
}

// Serve SSR HTML
app.use(async (req, res, next) => {
    try {
        const rawUrl = req.originalUrl || '/';
        const url = rawUrl.startsWith(base) ? rawUrl.slice(base.length - 1) : rawUrl;

        let template;
        let render;

        if (!isProduction) {
            template = await fs.readFile('./index.html', 'utf-8');
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

        const html = template
            .replace('<!--app-title-->', escapeHtml(title))
            .replace(
                '<meta name="description" content="<!--app-description-->">',
                `<meta name="description" content="${escapeHtml(description)}">`
            )
            .replace('<!--app-description-->', escapeHtml(description))
            .replace('<!--app-head-->', headTags)
            .replace('<!--app-html-->', appHtml);

        res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
        if (!isProduction && vite) {
            vite.ssrFixStacktrace(error);
        }
        console.error('SSR Error:', error.stack || error);
        next(error);
    }
});

app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`);
});
