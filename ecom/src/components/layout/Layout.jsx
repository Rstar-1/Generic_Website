import React from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../common/generic/Loader';

import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot';

import Button from '../common/Button';
import { ToastContainer } from '../common/Toast';
import {
  getSocialLinks,
  openExternalLink
} from '../../utils';

const socialLinks = getSocialLinks();

const Layout = () => (
    <>
        <Header />

        <main className="w-full">
            <React.Suspense fallback={null}>
                <Outlet />
            </React.Suspense>
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
                            onClick={() => openExternalLink(item?.url)}
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
