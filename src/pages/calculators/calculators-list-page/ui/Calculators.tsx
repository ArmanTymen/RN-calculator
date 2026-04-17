import { CalculationList } from '@/widgets/calculators/calculation-list'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Calculators = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
      >
        <Text className="mb-6 text-3xl font-extrabold text-slate-900">Инструменты</Text>
        <CalculationList />
      </ScrollView>
    </SafeAreaView>
  )
}
