import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  clearMocks: true,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/layout.tsx",
    "!app/page.tsx",
    "!app/api/contact/route.ts",
    "components/**/*.{ts,tsx}",
    "constants/**/*.{ts,tsx}",
    "utils/**/*.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "@site/(.*)": "<rootDir>/$1",
    "@link": "<rootDir>/navigation/link",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/.*/__mocks__",
    "<rootDir>/navigation",
    "<rootDir>/e2e",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  reporters: [["jest-silent-reporter", { useDots: true }]],
};

export default createJestConfig(customJestConfig);
