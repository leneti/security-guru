// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

import "@testing-library/jest-dom/extend-expect";
global.console = {
  ...global.console,
  log: jest.fn().mockName("mock.console.log"),
};
