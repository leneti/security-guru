/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_SHOW_THEME_SWITCH:
      process.env.REACT_APP_SHOW_THEME_SWITCH === "true",
  },
};

module.exports = nextConfig;
