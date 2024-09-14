import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import routes from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<RouterProvider router={routes} />
);


reportWebVitals();
