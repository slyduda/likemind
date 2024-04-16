module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "prettier"],
  plugins: ["unused-imports"],
  rules: {
    "no-unused-vars": "off", // not using "@typescript-eslint/no-unused-vars": "off" for unused var issues
    "unused-imports/no-unused-imports": "error",
    // "@typescript-eslint/no-unused-vars": "error"
    "vue/first-attribute-linebreak": [
      "off",
      {
        singleline: "ignore",
        multiline: "below",
      },
    ],
  },
};
