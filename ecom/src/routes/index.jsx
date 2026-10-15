import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🧩 Layout
import Layout from '../components/layout/Layout';
import Loader from '../components/common/generic/Loader';

// 📦 Lazy Pages
const Home = lazy(() => import('../pages/home/Home'));
const About = lazy(() => import('../pages/about/About'));
const Blog = lazy(() => import('../pages/blog/Blog'));
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'));
const Supplier = lazy(() => import('../pages/supplier/Supplier'));
const Product = lazy(() => import('../pages/product/Product'));
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'));
const Connect = lazy(() => import('../pages/connect/Connect'));
const Terms = lazy(() => import('../pages/terms/Terms'));
const Privacy = lazy(() => import('../pages/privacy/Privacy'));

function AppRoutes() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog-detail" element={<BlogDetail />} />
                    <Route path="supplier" element={<Supplier />} />
                    <Route path="supplier/:brandName" element={<Supplier />} />
                    <Route path="blog/:id" element={<BlogDetail />} />
                    <Route path="product" element={<Product />} />
                    <Route path="products" element={<Product />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="product-detail" element={<ProductDetail />} />
                    <Route path="connect" element={<Connect />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="privacy" element={<Privacy />} />
                </Route>
                <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px' }}>404 - Page Not Found</h2>} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
