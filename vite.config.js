import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Registers every top-level HTML page so `vite build` emits all of them
// (by default Rollup only picks up index.html).
export default defineConfig({
    build: {
        // Several entry files (main.js, popular.js, settings.js) use top-level
        // await, which requires a modern build target.
        target: 'esnext',
        rollupOptions: {
            input: {
                main: fileURLToPath(new URL('./index.html', import.meta.url)),
                login: fileURLToPath(new URL('./login.html', import.meta.url)),
                onboarding: fileURLToPath(new URL('./onboarding.html', import.meta.url)),
                archive: fileURLToPath(new URL('./archive.html', import.meta.url)),
                popular: fileURLToPath(new URL('./popular.html', import.meta.url)),
                settings: fileURLToPath(new URL('./settings.html', import.meta.url)),
            },
        },
    },
});