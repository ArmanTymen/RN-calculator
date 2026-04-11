import { CalculationList } from '@/widgets/calculation-list'
import { ScrollView, Text } from 'react-native'

export const Calculators = () => {
  return (
    <ScrollView className="flex-1 bg-slate-50 p-4" showsVerticalScrollIndicator={false}>
      <Text className="mb-6 text-3xl font-extrabold text-slate-900">Инструменты</Text>
      <CalculationList />
    </ScrollView>
  )
}
