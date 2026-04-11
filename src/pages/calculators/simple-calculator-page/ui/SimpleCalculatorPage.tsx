import { BasicCalculator } from '@/widgets/basic-calculator'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const SimpleCalculatorPage = () => {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <BasicCalculator />
      </SafeAreaView>
    </View>
  )
}
