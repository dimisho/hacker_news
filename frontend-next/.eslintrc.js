module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [require.resolve('./eslint-base-config'), 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src/']],
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': ['off'],

    'react-hooks/exhaustive-deps': ['error'],
  },
  overrides: [
    {
      files: ['src/**/*.tsx', 'src/**/*.jsx'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              pascalCase: true,
            },
          },
        ],
      },
    },
    {
      files: ['src/**/Use*.ts', 'src/**/use*.ts', 'src/**/Use*.js', 'src/**/use*.js'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
            },
          },
        ],
      },
    },
    {
      files: ['src/**/With*.ts', 'src/**/with*.ts', 'src/**/With*.js', 'src/**/with*.js'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
            },
          },
        ],
      },
    },
  ],
};
