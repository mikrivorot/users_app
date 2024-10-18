module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended',           // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
        'prettier',                              // Disables ESLint rules that would conflict with prettier
    ],
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off', // Turns off the rule that requires return types to be explicit
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allows unused variables starting with _
        '@typescript-eslint/no-explicit-any': 'warn', // Warns when using 'any' type
        '@typescript-eslint/ban-types': 'off', // Turns off banning of certain types
        'prettier/prettier': ['error', { endOfLine: 'auto' }], // Ensures consistent line endings across environments
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disables the rule requiring explicit return types for module boundaries
    },
};
