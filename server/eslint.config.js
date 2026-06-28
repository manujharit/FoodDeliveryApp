import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
      },
    },
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      prettier: eslintPluginPrettier,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'error',
      'no-unused-vars': 'error',
      'unused-imports/no-unused-imports': 'error',
      eqeqeq: 'error',
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];
