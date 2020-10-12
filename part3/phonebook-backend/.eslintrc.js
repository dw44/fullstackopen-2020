module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': [
      'error',
      'windows',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
  },
};
