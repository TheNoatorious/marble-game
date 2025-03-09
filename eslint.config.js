import globals from "globals";
import js from "@eslint/js";
import tsparser from "@typescript-eslint/parser"; // Required for TypeScript
import react from "eslint-plugin-react"; // React plugin
import r3f from "@react-three/eslint-plugin"; // React Three Fiber ESLint plugin
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc"; // Import FlatCompat

// Mimic CommonJS variables for compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a FlatCompat instance
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    // JavaScript and TypeScript settings
    js.configs.recommended, // ESLint JS recommended config

    // Convert old-style extends using FlatCompat
    ...compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:@react-three/recommended" // ✅ React Three Fiber recommended config
    ),

    // React-specific settings
    {
        files: ["**/*.{jsx,tsx}"], // Only apply to JSX and TSX files
        plugins: {
            react, // Register the react plugin explicitly
            "@react-three": r3f, // Register React Three Fiber plugin
        },
        settings: {
            react: {
                version: "detect", // Automatically detect React version
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off", // ✅ Fix: No need to import React in scope
            "react/jsx-uses-react": "off", // ✅ Fix: Not needed in modern React
            "react/jsx-uses-vars": "error", // Prevent unused JSX variables
            "react/no-unknown-property": [
                "error",
                {
                    ignore: [
                        "geometry", // Three.js property
                        "material", // Three.js property
                        "position", // Three.js property
                        "rotation", // Three.js property
                        "scale", // Three.js property
                        "castShadow", // Three.js property
                        "receiveShadow", // Three.js property
                        "envMap", // Three.js property
                        "dispose", // Three.js property
                        "vertexColors", // Three.js property
                        "toneMapped", // Three.js property
                        "shadow-mapSize",
                        "shadow-camera-near",
                        "shadow-camera-far",
                        "shadow-camera-top",
                        "shadow-camera-right",
                        "shadow-camera-bottom",
                        "shadow-camera-left",
                        "intensity",
                    ],
                },
            ],
        },
    },

    // General settings for JS, JSX, TS, and TSX files
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Target JS, JSX, TS, and TSX files
        languageOptions: {
            parser: tsparser, // Use TypeScript parser
            globals: globals.browser, // Browser globals
        },
        rules: {
            // Define additional custom rules here
        },
    },
];
