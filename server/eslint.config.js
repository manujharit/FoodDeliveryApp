
module.exports = [
    {
        languageOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
            globals: {
                process: 'readonly',
            },
        },
        files: ['*.js', '*.jsx'],
        plugins: {
            prettier: require('eslint-plugin-prettier'),
        },
        rules: {
            "prettier/prettier": "error",
            'no-console': 'warn',
            'no-unused-vars': 'warn',
        },
    }
];