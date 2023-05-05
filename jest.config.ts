/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Automatically reset mock state before every test
  // resetMocks: false,

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
