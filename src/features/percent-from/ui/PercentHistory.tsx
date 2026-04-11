import { View, Text, TouchableOpacity } from 'react-native'

export const PercentHistory = () => {
  return (
    <View className="mt-4 flex-col items-center justify-center rounded-2xl bg-blue-50 py-6">
      <View className="flex-row items-baseline px-4">
        <TouchableOpacity>
          <Text>Мой расчеты</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>История расчетов</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
