import { View, Text, Pressable } from 'react-native'
import { type FallbackProps } from 'react-error-boundary'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  return (
    <View className="items-center rounded-xl border border-red-200 bg-red-50 p-4">
      <Text className="text-center font-bold text-red-600">Ошибка загрузки данных</Text>
      <Text className="mb-3 text-center text-sm text-red-500">{errorMessage}</Text>

      <Pressable
        onPress={resetErrorBoundary}
        className="rounded-lg bg-red-600 px-6 py-2 active:opacity-70"
      >
        <Text className="text-xs font-bold uppercase text-white">Попробовать снова</Text>
      </Pressable>
    </View>
  )
}
