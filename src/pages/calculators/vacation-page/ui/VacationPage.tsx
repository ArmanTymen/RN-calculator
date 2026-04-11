import { VacationCalculator } from '@/features/vacation-form'
import { ScrollView, Text } from 'react-native'

export const VacationPage = () => {
  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Калькулятор отпуска</Text>
      <VacationCalculator />
    </ScrollView>
  )
}
