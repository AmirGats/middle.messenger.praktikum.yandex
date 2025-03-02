import ts from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    languageOptions: {
      parser: ts,
    },
    rules: {
      "no-unused-vars": 2,
      "max-len": [1, 100],
      "max-params": [2, 3],
    },
  },
];
