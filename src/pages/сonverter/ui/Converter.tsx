import { ConverterForm } from '@/features/currency-converter-form'
import { Text, View } from 'react-native'

export const Converter = () => {
  return (
    <View className="mx-auto w-full max-w-md py-4">
      <Text className="mb-2 text-2xl font-bold text-slate-900">Конвертер</Text>
      <Text className="mb-6 text-sm text-slate-500">Перевод метрических и имперских величин</Text>

      <ConverterForm />
    </View>
  )
}
