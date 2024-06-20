import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LessonProvider } from './contexts/LessonContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
        <LessonProvider>
            <App />
        </LessonProvider>
        </AuthProvider>
    </BrowserRouter>
);

