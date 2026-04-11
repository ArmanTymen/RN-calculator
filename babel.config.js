module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    // 1. Плагин для алиасов (@/)
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    // 2. Трансформатор для Zod v4 (решает текущую ошибку)
    '@babel/plugin-transform-export-namespace-from',

    // 3. Reanimated ВСЕГДА должен быть строго последним в списке!
    'react-native-reanimated/plugin',
  ],
}
