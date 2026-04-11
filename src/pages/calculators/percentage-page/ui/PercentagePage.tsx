// pages/percent/ui/PercentPage.tsx
import { ScrollView, Text } from 'react-native'
import { PercentCalculator } from '@/widgets/percent-calculator'

export const PercentagePage = () => {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      <Text className="text-black-600 mb-1 text-2xl font-bold uppercase tracking-widest">
        Калькулятор процентов
      </Text>
      <PercentCalculator />
    </ScrollView>
  )
}
