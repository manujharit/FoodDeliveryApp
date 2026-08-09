import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    files: ["**/*.js", "**/*.jsx"],
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    )),

    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        prettier: fixupPluginRules(prettier),
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            process: "readonly",
        },

        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": "error",
        "unused-imports/no-unused-imports": "error",
        "no-unused-vars": "error",
        "no-console": "error",
        eqeqeq: "error",
        curly: "error",
        "no-var": "error",
        "prefer-const": "error",
        "padding-line-between-statements": [
            "error",
            { "blankLine": "always", "prev": "import", "next": "*" },
            { "blankLine": "any", "prev": "import", "next": "import" },
            { "blankLine": "always", "prev": "*", "next": "if" },
            { "blankLine": "always", "prev": "*", "next": "return" },
            { "blankLine": "never", "prev": "expression", "next": "expression" },
            { "blankLine": "always", "prev": "*", "next": "multiline-expression" },
            { "blankLine": "always", "prev": "multiline-expression", "next": "*" },
            { "blankLine": "always", "prev": "*", "next": ["multiline-const", "multiline-let", "multiline-var"] },
            { "blankLine": "never", "prev": ["singleline-const", "singleline-let", "singleline-var"], "next": ["singleline-const", "singleline-let", "singleline-var"] }
        ],
        "max-len": ["error", { "code": 120 }],
        "multiline-comment-style": ["error", "starred-block"]
    },
}]);