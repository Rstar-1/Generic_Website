import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../../context/CartContext';

const Layout = () => (
    <CartProvider>
        <Header />
        <main className='w-full'>
            <Outlet />
        </main>
        <Footer />
    </CartProvider>
);

export default Layout;
