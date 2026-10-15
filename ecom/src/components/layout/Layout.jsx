import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';
import Button from '../common/Button';
import { ToastContainer } from '../common/Toast';

const socialLinks = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'Instagram',
        width: '20',
        height: '20',
        fill: 'var(--white)',
        url: import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://www.instagram.com/inraclick/',
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
        url: import.meta.env.VITE_SOCIAL_YOUTUBE || 'https://www.youtube.com/@INRACLICK',
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
        url: import.meta.env.VITE_SOCIAL_FACEBOOK || 'https://www.facebook.com/share/p/1EhdBQaRw4/',
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
        url: import.meta.env.VITE_SOCIAL_WHATSAPP || 'https://whatsapp.com/channel/0029VbD28RpKgsNusSLyup2i',
        bg: 'success',
        ariaLabel: 'WhatsApp'
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
                {socialLinks.map((item) => (
                    <Button
                        key={item.id}
                        version="icon"
                        bg={item.bg}
                        aria-label={item.ariaLabel}
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
                        className='rounded-5 b-shadow flex'
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
