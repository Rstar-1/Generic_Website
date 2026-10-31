import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/server/store';

import App from './app/App.jsx';

import './utils/i18n';
import './styles/theme.scss';
import './styles/structure.scss';
import './styles/global.scss';

const container = document.getElementById('root');

if (container && container.hasChildNodes()) {
    hydrateRoot(
        container,
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
} else if (container) {
    createRoot(container).render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
