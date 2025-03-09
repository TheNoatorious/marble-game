import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import restart from "vite-plugin-restart";

// https://vitejs.dev/config/
export default defineConfig({
    root: ".",
    publicDir: "public",
    plugins: [
        // Restart server on static/public file changes
        restart({ restart: ["public/**"] }),

        // React support with TypeScript
        react(),
    ],
    server: {
        host: true, // Open to local network and display URL
        open: !(
            // eslint-disable-next-line no-undef
            ("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env)
        ), // Open if it's not a CodeSandbox
    },
    build: {
        outDir: "dist", // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {},
    },
    optimizeDeps: {
        include: ["three"], // Ensure 'three' is pre-bundled properly
    },
});
