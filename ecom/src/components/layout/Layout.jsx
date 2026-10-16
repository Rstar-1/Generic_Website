import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

import Button from '../common/Button';
import { ToastContainer } from '../common/Toast';

const socialLinks = [
    {
        id: 'instagram',
        icon: 'Instagram',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: import.meta.env.VITE_SOCIAL_INSTAGRAM,
        bg: 'insta'
    },
    {
        id: 'youtube',
        icon: 'YouTube',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: import.meta.env.VITE_SOCIAL_YOUTUBE,
        bg: 'danger'
    },
    {
        id: 'facebook',
        icon: 'Facebook',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: import.meta.env.VITE_SOCIAL_FACEBOOK,
        bg: 'info'
    },
    {
        id: 'whatsapp',
        icon: 'WhatsApp',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: import.meta.env.VITE_SOCIAL_WHATSAPP,
        bg: 'success'
    }
];

const Layout = () => (
    <>
        <Header />

        <main className='w-full'>
            <Outlet />
        </main>

        <aside
            aria-label="Social and Contact Bar"
            style={{ top: '40%' }}
            className='fixed right-0 z-99 overflow-hidden mx-5'
        >
            <div className='grid-cols-1 gap-6'>
                {socialLinks?.map((item) => (
                    <Button
                        key={item.id}
                        version="icon"
                        bg={item.bg}
                        aria-label={item.id}
                        onClick={() => {
                            if (!item.url) return;
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
                        className='rounded-5 flex'
                    />
                ))}
            </div>
        </aside>

        <Chatbot />
        <ToastContainer />

        <Footer />
    </>
);

export default Layout;
