module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/essential'
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue"],
  rules: {
    "arrow-body-style": 0,
    "import/prefer-default-export": 0,
    "no-console": 0,
    "no-debugger": 0,
    "no-plusplus": 0,
    "import/no-extraneous-dependencies": 0,
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^h$",
        varsIgnorePattern: "^h$",
      },
    ],
    "vue/multi-word-component-names": "off",
  },
};
