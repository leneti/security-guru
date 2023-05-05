import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  // automock: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // coverageThreshold: undefined,
  moduleNameMapper: {
    "@site/(.*)": "<rootDir>/$1",
  },
  // modulePathIgnorePatterns: [],
  // resetMocks: false,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // slowTestThreshold: 5,
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
};

export default createJestConfig(customJestConfig);
