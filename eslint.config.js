import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactThree from "@react-three/eslint-plugin"; // Import the plugin

/** @type {import('eslint').Linter.Config[]} */
export default [
    // Add a configuration for the files you're targeting
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },

    // Define the global settings for the environment
    { languageOptions: { globals: globals.browser } },

    // ESLint JS config
    pluginJs.configs.recommended,

    // TypeScript ESLint recommended config
    ...tseslint.configs.recommended,

    // React ESLint plugin recommended config
    pluginReact.configs.flat.recommended,

    // React Three ESLint plugin recommended config
    pluginReactThree.configs.recommended, // Add the recommended config from @react-three/eslint-plugin
];
