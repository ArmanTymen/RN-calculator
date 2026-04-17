import { useCurrencyRates } from '@/entities/calculators/currency'
import { View, Text } from 'react-native'

interface CurrencyDasbordProps {
  date?: Date
}

export const CurrencyDasbord = ({ date = new Date() }: CurrencyDasbordProps) => {
  const { data: rates } = useCurrencyRates(date)

  return (
    <View className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <View className="flex-col">
        {rates &&
          rates.map((item, index) => {
            const isLast = index === rates.length - 1
            const isGrowth = item.Value > item.Previous

            return (
              <View
                key={item.ID}
                className={`flex-row items-center justify-between p-4 ${isLast ? '' : 'border-b border-slate-100'}`}
              >
                <View className="flex-col">
                  <Text className="font-semibold text-slate-900">{item.CharCode}:</Text>
                  <Text className="text-xs font-medium text-slate-500">
                    {item.Name} — {item.Nominal}
                  </Text>
                </View>
                <View className="flex-col items-end">
                  <Text className="font-bold text-slate-900">{item.Value.toFixed(2)}</Text>
                  <Text
                    className={`text-xs font-medium ${isGrowth ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {isGrowth ? '↑' : '↓'}
                    {Math.abs(item.Value - item.Previous).toFixed(4)}
                  </Text>
                </View>
              </View>
            )
          })}
      </View>
    </View>
  )
}
