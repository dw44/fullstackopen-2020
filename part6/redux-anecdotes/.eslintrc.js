module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react', 'jest',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    'react/react-in-jsx-scope': [
      0,
    ],
    'no-shadow': [
      0,
    ],
    'react/jsx-filename-extension': [
      0,
    ],
    'react/button-has-type': [
      0,
    ],
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
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always',
    ],
    'arrow-spacing': [
      'error', { before: true, after: true },
    ],
    'no-console': 0,
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
