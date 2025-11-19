// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import "@testing-library/jest-dom";

jest.mock("next/router", () => import("next-router-mock"));
jest.mock("@site/utils/logger");

const { getComputedStyle } = globalThis;
globalThis.getComputedStyle = (elt) => getComputedStyle(elt);

Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserver;
