import eslintConfigPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPluginDepend from "eslint-plugin-depend";
import { createNodeResolver, importX } from "eslint-plugin-import-x";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintpluginNode from "eslint-plugin-n";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import { configs as eslintPluginRegexpConfig } from "eslint-plugin-regexp";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";
// @ts-expect-error -- Missing types
import eslintPluginCommentsConfig from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslintPluginReact from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
// eslint-disable-next-line n/no-extraneous-import -- We don't want redundant dependencies
import js from "@eslint/js";
import eslintPluginNext from "@next/eslint-plugin-next";
// eslint-disable-next-line n/no-extraneous-import -- We don't want redundant dependencies
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.join(__dirname, ".gitignore");

const tsConfig = [
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,cjsx,ts,mts,cts,tsx,mtsx,ctsx}"],
  })),
  {
    ...(eslintPluginCommentsConfig as { recommended: FlatConfig.Config })
      .recommended,
    rules: {
      ...(eslintPluginCommentsConfig as { recommended: FlatConfig.Config })
        .recommended.rules,
      // We will require descriptions
      "@eslint-community/eslint-comments/require-description": "error",
    },
  },
  eslintpluginNode.configs["flat/recommended"],
  {
    ...importX.flatConfigs.recommended,
    rules: {
      ...importX.flatConfigs.recommended.rules,
      "import-x/no-named-as-default-member": "off",
    },
  },
  importX.flatConfigs.typescript,
  eslintPluginUnicorn.configs.recommended,
  {
    ...eslintPluginRegexpConfig["flat/recommended"],
    rules: {
      ...eslintPluginRegexpConfig["flat/recommended"].rules,
      "regexp/no-obscure-range": "off",
    },
  },
  {
    ...(eslintPluginDepend.configs!["flat/recommended"] as FlatConfig.Config),
    rules: {
      ...(eslintPluginDepend.configs!["flat/recommended"] as FlatConfig.Config)
        .rules,
      "depend/ban-dependencies": [
        "error",
        {
          presets: ["native", "microutilities", "preferred"],
          allowed: ["eslint-plugin-next", "find-up", "lint-staged", "dotenv"],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,cjsx,ts,mts,cts,tsx,mtsx,ctsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.{cjs,cjsx,cts,ctsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "unicorn/prefer-module": "off",
    },
  },
  {
    rules: {
      "n/no-unsupported-features/node-builtins": [
        "error",
        { allowExperimental: true },
      ],
      "n/no-missing-import": "off",
      "n/no-process-exit": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/no-array-sort": "off",
      "unicorn/no-array-method-this-argument": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/throw-new-error": "off",
      "unicorn/import-style": [
        "error",
        {
          styles: {
            chalk: {
              default: false,
            },
          },
          extendDefaultStyles: true,
        },
      ],
    },
  },
];

const nextConfig = [
  { name: "Generated Next.js files", ignores: ["next-env.d.ts"] },
  {
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
    },
  },
];

const reactConfig = [
  eslintPluginJsxA11y.flatConfigs.recommended,
  eslintPluginReact.configs["recommended-type-checked"],
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs["recommended-latest"].rules,
    },
  },
  {
    settings: { react: { version: "detect" } },
    rules: { "n/no-unsupported-features/node-builtins": "off" },
  },
];

export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...tsConfig,
  ...nextConfig,
  ...reactConfig,
  eslintConfigPrettier,
];
