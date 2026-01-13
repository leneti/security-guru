import type { Configuration } from "lint-staged";

const config: Configuration = {
  "yarn.lock": ["yarn dedupe", "git add yarn.lock"],
  "*.{ts,tsx,js,jsx,json,md}": ["yarn lint:fix", "yarn format"],
};

export default config;
