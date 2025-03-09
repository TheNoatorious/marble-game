import "@testing-library/jest-dom";
import "jest-canvas-mock";
import "resize-observer-polyfill";
import { beforeAll } from "@jest/globals";

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

// Dynamically import and mock the scheduler module
beforeAll(async () => {
    const unstableMock = await import("scheduler/unstable_mock");
    jest.mock("scheduler", () => unstableMock);
});

beforeAll(() => {
    // Mock console.error to suppress the warning related to `act`
    const originalError = console.error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === "string" &&
            args[0].includes(
                "The current testing environment is not configured to support act"
            )
        ) {
            return; // Ignore the act warning
        }
        // Otherwise, call the original console.error
        originalError.apply(console, args);
    };
});
