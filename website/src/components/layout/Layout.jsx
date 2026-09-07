import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../../context/CartContext';
import Icon from '../common/Icon';
import Button from '../common/Button';

const socialLinks = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'Instagram',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: 'https://www.instagram.com/inraclick/',
        bg: 'insta',
        ariaLabel: 'Instagram'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: 'YouTube',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: 'https://www.youtube.com/@INRACLICK',
        bg: 'danger',
        ariaLabel: 'YouTube'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: 'Facebook',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: 'https://www.facebook.com/share/p/1EhdBQaRw4/',
        bg: 'info',
        ariaLabel: 'Facebook'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: 'WhatsApp',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: 'https://whatsapp.com/channel/0029VbD28RpKgsNusSLyup2i',
        bg: 'success',
        ariaLabel: 'WhatsApp'
    },
    // {
    //     id: 'linkedin',
    //     name: 'LinkedIn',
    //     icon: 'LinkedIn',
    //     width: '20',
    //     height: '20',
    //     fill: 'var(--white)',
    //     url: 'https://linkedin.com',
    //     bg: 'info',
    //     ariaLabel: 'LinkedIn'
    // },
    // {
    //     id: 'phone',
    //     name: 'Call',
    //     icon: 'Call',
    //     width: '20',
    //     height: '20',
    //     fill: 'var(--white)',
    //     url: 'tel:+1234567890',
    //     bg: 'info',
    //     ariaLabel: 'Call Us'
    // }
];

const Layout = () => (
    <CartProvider>
        <Header />
        <main className='w-full'>
            <Outlet />
        </main>

        <aside
            aria-label="Social and Contact Bar"
            style={{ top: '40%', }}
            className='fixed right-0 z-99 overflow-hidden mx-5'
        >
            <div className='grid-cols-1 gap-6'>
                {socialLinks.map((item) => (
                    <Button
                        key={item.id}
                        version="icon"
                        bg={item.bg}
                        aria-label={item.ariaLabel}
                        onClick={() => {
                            if (item.url.startsWith('http')) {
                                window.open(item.url, '_blank', 'noopener,noreferrer');
                            } else {
                                window.location.href = item.url;
                            }
                        }}
                        icon={item.icon}
                        iconWidth={item.width}
                        iconHeight={item.height}
                        iconFill={item.fill}
                        className='rounded-5 b-shadow flex'
                    />
                ))}
            </div>
        </aside>

        <Footer />
    </CartProvider>
);

export default Layout;
