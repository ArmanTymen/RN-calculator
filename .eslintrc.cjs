module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Отключает правила ESLint, конфликтующие с Prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'prettier', // ВАЖНО: Регистрирует плагин, чтобы правило 'prettier/prettier' заработало
  ],
  rules: {
    // Твои строгие правила
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',

    // Включаем проверку форматирования
    'prettier/prettier': 'error',

    // Правило semi дублируется. Prettier сам уберет точки с запятой
    // благодаря "semi": false в .prettierrc. Отдельное правило ESLint здесь не нужно,
    // но если хочешь жестко дублировать:
    semi: ['error', 'never'],
  },
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    'android/**',
    'ios/**',
    '.expo/**',
    'web-build/**',
  ],
  overrides: [
    {
      // Конфигурационные файлы
      files: ['*.cjs', '*.js', '*.mjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      parserOptions: {
        project: false,
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      // Исходный код
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
}
