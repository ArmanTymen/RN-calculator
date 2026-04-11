import { NdflForm } from '@/features/ndfl-form'
import { Text, View } from 'react-native'

export const TaxPage = () => {
  return (
    <View className="mx-auto w-full max-w-md py-4">
      <Text className="mb-6 text-2xl font-bold text-slate-900">Калькулятор НДФЛ</Text>
      <NdflForm />
    </View>
  )
}
