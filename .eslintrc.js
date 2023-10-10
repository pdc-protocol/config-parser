module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['@pdc-protocol/eslint-config-pdcp'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
