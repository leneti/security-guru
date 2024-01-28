import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "pages/**/*.{ts,tsx}",
    "!pages/_app.tsx",
    "!pages/_document.tsx",
    "!pages/index.tsx",
    "components/**/*.{ts,tsx}",
    "constants/**/*.{ts,tsx}",
    "utils/**/*.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "@site/(.*)": "<rootDir>/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
};

export default createJestConfig(customJestConfig);
