import React from 'react';
import ReactDOM from 'react-dom/client';

import { HashRouter } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import { MoviApp } from './MoviApp';
import './index.css';
import { ContextProvider } from './context/ContextProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
    <HashRouter>
        <React.StrictMode>
            <ContextProvider>
                <MoviApp />
            </ContextProvider>
        </React.StrictMode>
    </HashRouter>


);
