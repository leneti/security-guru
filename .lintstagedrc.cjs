/**
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "package-lock.json": ["npm dedupe"],
  "!(Dockerfile|*.rs|*.tf|*.tfvars|*.hcl|package-lock.json|*.js|*.mjs|*.cjs|*.jsx|*.mjsx|*.cjsx|*.ts|*.mts|*.cts|*.tsx|*.mtsx|*.ctsx|*.json|*.toml|*.yml|*.yaml|*.graphql|*.graphqls)":
    ["prettier --write --ignore-unknown"],
  "*.{js,mjs,cjs,jsx,mjsx,cjsx,ts,mts,cts,tsx,mtsx,ctsx,json,toml,yml,yaml,graphql,graphqls}":
    ["prettier --write", "eslint --fix --no-warn-ignored"],
};

module.exports = config;
