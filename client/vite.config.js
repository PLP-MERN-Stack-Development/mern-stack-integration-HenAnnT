import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // optional, default Vite port
        proxy: {
            '/api': 'http://localhost:5000', // redirect all /api calls to your backend
        },
    },
});