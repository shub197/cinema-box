import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@scss': path.resolve(__dirname, './src/scss'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@scss/global/application-wide" as *;`,
            }
        }
    }
})
