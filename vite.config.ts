import { defineConfig } from 'vite';

const config = () => {
    return defineConfig({
        server: {
            host: 'localhost',
            port: 3000,
        },
    });
};

export default config;
