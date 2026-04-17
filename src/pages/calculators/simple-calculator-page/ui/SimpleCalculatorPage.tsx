// src/pages/simple-calculator/ui/SimpleCalculatorPage.tsx
import { SimpleCalculator } from '@/widgets/calculators/basic-calculator'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const SimpleCalculatorPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <View className="px-6 pt-4">
        <Text className="text-3xl font-black tracking-tight text-slate-900">Калькулятор</Text>
      </View>
      <SimpleCalculator />
    </SafeAreaView>
  )
}
