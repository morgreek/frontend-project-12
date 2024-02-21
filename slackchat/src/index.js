import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from './slices/index.js';
import './i18next'
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';

filter.clearList()
filter.add(filter.getDictionary('en'))
filter.add(filter.getDictionary('fr'))
filter.add(filter.getDictionary('ru'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer/>
        </Provider>
    </React.StrictMode>,
);
