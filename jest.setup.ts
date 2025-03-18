// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
import "@testing-library/jest-dom";

const nextRouterMock = require("next-router-mock");

jest.mock("next/navigation", () => {
  const { useRouter } = nextRouterMock;
  const usePathname = () => {
    const router = useRouter();
    return router.pathname;
  };

  const useSearchParams = () => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  };

  return {
    useRouter,
    usePathname,
    useSearchParams,
  };
});
jest.mock("@site/utils/logger");

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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

window.ResizeObserver = ResizeObserver;
