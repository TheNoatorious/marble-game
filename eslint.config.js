import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react"; // Import eslint-plugin-react

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    // General file patterns to lint
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Target JS, JSX, TS, and TSX files
        plugins: {
            react: pluginReact, // Specify the react plugin directly in flat config
            "@typescript-eslint": tseslint, // Specify the typescript-eslint plugin directly
        },
        languageOptions: {
            globals: globals.browser, // Browser globals
        },
        rules: {
            // Any rules you want to override for the files being targeted
        },
        extends: [
            pluginJs.configs.recommended, // ESLint JS config
            tseslint.configs.recommended, // TypeScript ESLint recommended config directly
            pluginReact.configs.flat.recommended, // React ESLint plugin recommended config
        ],
    },
];
