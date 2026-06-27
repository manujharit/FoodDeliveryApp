import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
    {
        languageOptions: {
            ecmaVersion: 12,
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
            "prettier/prettier": "error",
            'no-console': 'warn',
            'no-unused-vars': 'warn',
            'unused-imports/no-unused-imports': 'error',
        },
    }
];