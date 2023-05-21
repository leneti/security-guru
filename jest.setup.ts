// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

import "@testing-library/jest-dom/extend-expect";
jest.mock("next/router", () => require("next-router-mock"));
jest.mock("@site/utils/logger");
