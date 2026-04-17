// pages/percent/ui/PercentPage.tsx
import { View, Text } from 'react-native'
import { PercentCalculator } from '@/widgets/calculators/percent-calculator'

export const PercentagePage = () => {
  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Калькулятор процентов</Text>
      <PercentCalculator />
    </View>
  )
}
