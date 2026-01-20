import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import '@/assets/icons/fontawesome.js';
import "@/scss/main.scss";
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        <Analytics />
    </StrictMode>,
)
