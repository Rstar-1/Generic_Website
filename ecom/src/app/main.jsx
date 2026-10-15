import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './server/store';

import App from './App.jsx';

import '../utils/i18n';
import '../styles/theme.scss';
import '../styles/structure.scss';
import '../styles/global.scss';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
