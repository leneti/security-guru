import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  clearMocks: true,
  collectCoverage: true,
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
