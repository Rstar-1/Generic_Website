import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Loader from '../components/common/generic/Loader';

const Home = React.lazy(() => import('../pages/home/Home'));
const About = React.lazy(() => import('../pages/about/About'));
const Blog = React.lazy(() => import('../pages/blogs/Blog'));
const BlogDetail = React.lazy(() => import('../pages/blogs/BlogDetail'));
const Supplier = React.lazy(() => import('../pages/supplier/Supplier'));
const Product = React.lazy(() => import('../pages/product/Product'));
const ProductDetail = React.lazy(() => import('../pages/product/ProductDetail'));
const Connect = React.lazy(() => import('../pages/connect/Connect'));
const Terms = React.lazy(() => import('../pages/content/Terms'));
const Privacy = React.lazy(() => import('../pages/content/Privacy'));
const Faq = React.lazy(() => import('../pages/content/Faq'));
const Category = React.lazy(() => import('../pages/category/Category'));

function AppRoutes() {
    return (
        <React.Suspense fallback={<Loader />}>
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
    );
}

export default AppRoutes;
