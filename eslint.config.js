import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        console: "readonly",
        atob: "readonly",
        URL: "readonly",
        Blob: "readonly",
        Uint8Array: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        clearTimeout: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        MessageEvent: "readonly",
        localStorage: "readonly",
        performance: "readonly",
        MutationObserver: "readonly",
        IntersectionObserver: "readonly",
        AbortController: "readonly",
        FormData: "readonly",
        URLSearchParams: "readonly",
        HTMLElement: "readonly",
        DOMException: "readonly",
        MessageChannel: "readonly",
        setImmediate: "readonly",
        reportError: "readonly",
        queueMicrotask: "readonly",
        matchMedia: "readonly",
        navigation: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "warn",
    },
  },
];
