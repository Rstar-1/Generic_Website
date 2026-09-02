import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

// 🧩 Layout
import Layout from '../componets/layout/Layout'
import Loader from '../componets/common/generic/Loader'

// 📦 Lazy Pages
const Home = lazy(() => import('../pages/home/Home'))


function AppRoutes() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                </Route>
                <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '100px 20px' }}>404 - Page Not Found</h2>} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes
