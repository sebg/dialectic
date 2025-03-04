export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
];
