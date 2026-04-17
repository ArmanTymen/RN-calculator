//src/entities/currency/ui
import { Text, View } from 'react-native'

export const RateDisplay = ({
  flag,
  code,
  value,
}: {
  flag: string
  code: string
  value: string
}) => (
  <View className="flex-row items-center gap-1">
    <Text className="text-base">{flag}</Text>
    <Text className="text-sm font-medium text-slate-600">{code} —</Text>
    <Text className="text-sm font-bold text-slate-900">{value} ₽</Text>
  </View>
)
