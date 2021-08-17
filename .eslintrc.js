module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb-typescript', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'import/order': ['error', { 'newlines-between': 'always' }],
    '@typescript-eslint/no-use-before-define': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/no-unused-prop-types': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/prefer-stateless-function': 'off',
  },
}