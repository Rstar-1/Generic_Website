import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Loader from '../components/common/generic/Loader';

import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Blog from '../pages/blogs/Blog';
import BlogDetail from '../pages/blogs/BlogDetail';
import Supplier from '../pages/supplier/Supplier';
import Product from '../pages/product/Product';
import ProductDetail from '../pages/product/ProductDetail';
import Connect from '../pages/connect/Connect';
import Terms from '../pages/content/Terms';
import Privacy from '../pages/content/Privacy';
import Faq from '../pages/content/Faq';
import Category from '../pages/category/Category';

function AppRoutes() {
    const location = useLocation();
    const prevPathRef = React.useRef(location.pathname);
    const [routeLoading, setRouteLoading] = React.useState(false);
    const [routeFading, setRouteFading] = React.useState(false);

    // Route transition effect on navigation
    React.useEffect(() => {
        if (prevPathRef.current === location.pathname) return;
        prevPathRef.current = location.pathname;

        const isBot = typeof navigator !== 'undefined' && /Lighthouse|Googlebot|PageSpeed/i.test(navigator.userAgent);
        if (isBot) return;

        setRouteLoading(true);
        setRouteFading(false);

        const timer = setTimeout(() => {
            setRouteFading(true);
            const removeTimer = setTimeout(() => {
                setRouteLoading(false);
                setRouteFading(false);
            }, 250);
            return () => clearTimeout(removeTimer);
        }, 300);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            {routeLoading && (
                <Loader isFading={routeFading} />
            )}
            <React.Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="blog/:id" element={<BlogDetail />} />
                        <Route path="supplier" element={<Supplier />} />
                        <Route path="supplier/:brandName" element={<Supplier />} />
                        <Route path="product" element={<Product />} />
                        <Route path="product/:id" element={<ProductDetail />} />
                        <Route path="category" element={<Category />} />
                        <Route path="connect" element={<Connect />} />
                        <Route path="faq" element={<Faq />} />
                        <Route path="terms" element={<Terms />} />
                        <Route path="privacy" element={<Privacy />} />
                        <Route path="home" element={<Navigate to="/" replace />} />
                    </Route>
                    <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px' }}>404 - Page Not Found</h2>} />
                </Routes>
            </React.Suspense>
        </>
    );
}

export default AppRoutes;
