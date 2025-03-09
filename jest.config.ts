import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest", // Use ts-jest for TypeScript files
    testEnvironment: "jsdom", // Ensure JSDOM is explicitly set for React tests
    collectCoverage: true, // Enable code coverage
    coverageDirectory: "coverage", // Set coverage output directory
    coverageReporters: ["text", "lcov"], // Coverage report formats
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": [
            "ts-jest", // Using ts-jest for transformations
            {
                tsconfig: "tsconfig.json", // Use the correct tsconfig.json
                isolatedModules: true, // Ensures modules are handled in isolation
            },
        ],
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Reference the setup file
    testPathIgnorePatterns: ["/node_modules/", "/build/"], // Ignore these directories in tests
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"], // Ensure Jest properly resolves files
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock styles for tests
        "^react-three-fiber$": "<rootDir>/__mocks__/react-three-fiber.tsx", // Explicitly map
        "^@/(.*)$": "<rootDir>/src/$1", // Allow absolute imports from `src/`
    },
    moduleDirectories: ["node_modules", "src", "__mocks__"],
};

export default config;
