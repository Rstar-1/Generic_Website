import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

import Button from '../common/Button';
import { ToastContainer } from '../common/Toast';

const socialLinks = [
    { id: 'instagram', icon: 'Instagram', bg: 'insta', url: import.meta.env.VITE_SOCIAL_INSTAGRAM },
    { id: 'youtube', icon: 'YouTube', bg: 'danger', url: import.meta.env.VITE_SOCIAL_YOUTUBE },
    { id: 'facebook', icon: 'Facebook', bg: 'info', url: import.meta.env.VITE_SOCIAL_FACEBOOK },
    { id: 'whatsapp', icon: 'WhatsApp', bg: 'success', url: import.meta.env.VITE_SOCIAL_WHATSAPP },
    { id: 'linkedin', icon: 'LinkedIn', bg: 'info', url: import.meta.env.VITE_SOCIAL_LINKEDIN },
    { id: 'twitter', icon: 'Twitter', bg: 'dark', url: import.meta.env.VITE_SOCIAL_TWITTER }
].filter((item) => item.url?.trim());

const handleSocialClick = (url) => {
    if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        window.location.href = url;
    }
};

const Layout = () => (
    <>
        <Header />

        <main className="w-full">
            <Outlet />
        </main>

        {socialLinks?.length > 0 && (
            <aside
                aria-label="Social and Contact Bar"
                style={{ top: '35%' }}
                className="fixed right-0 z-99 overflow-hidden mx-5"
            >
                <div className="grid-cols-1 gap-6">
                    {socialLinks?.map((item) => (
                        <Button
                            key={item?.id}
                            version="icon"
                            bg={item?.bg}
                            icon={item?.icon}
                            iconWidth="20"
                            iconHeight="20"
                            iconFill="var(--white)"
                            aria-label={item?.id}
                            onClick={() => handleSocialClick(item?.url)}
                            className="rounded-5 flex"
                        />
                    ))}
                </div>
            </aside>
        )}

        <Chatbot />
        <ToastContainer />

        <Footer />
    </>
);

export default Layout;
