import {defineConfig} from 'vite';
import checker from "vite-plugin-checker";

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist'
    },
    plugins: [
        checker({
            typescript: true,
        }),
    ],
});
