module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-console": 2,
    "quotes": [2, "single", { "avoidEscape": true }],
    "comma-dangle": [2, "always-multiline"],
    "no-multi-spaces": ["error"],
    "eol-last" : 2,
    "semi": 2,
  },
}
