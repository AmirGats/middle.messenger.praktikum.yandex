import {defineConfig} from 'vite';
import checker from "vite-plugin-checker";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist'
    },
    plugins: [
        checker({
            typescript: true,
        }),
        handlebars({
            partialDirectory: "src/templates/components",
        }),
    ],
});
