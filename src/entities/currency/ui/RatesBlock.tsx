//src/entities/currency/ui

import { ActivityIndicator, Text, View } from 'react-native'
import { useCurrencyRates } from '../api'
import { Info } from 'lucide-react-native'
import { CURRENCIES } from '../model'
import { RateDisplay } from './RateDisplay'

interface RatesBlockProps {
  title: string
  query: ReturnType<typeof useCurrencyRates>
  variant?: 'primary' | 'secondary'
}

export const RatesBlock = ({ title, query, variant = 'primary' }: RatesBlockProps) => {
  const { data: rates, isLoading, isError } = query

  return (
    <View
      className={`mt-8 rounded-2xl border p-4 ${variant === 'secondary' ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200'}`}
    >
      <View className="mb-3 flex-row items-center gap-2">
        <Text className="text-sm font-bold text-slate-700">{title}</Text>
        <Info size={16} color="#94a3b8" />
      </View>

      <View className="flex-row flex-wrap gap-4">
        {isLoading ? (
          <ActivityIndicator size="small" color="#3b82f6" />
        ) : isError ? (
          <Text className="text-sm text-red-500">Нет данных (возможно, выходной)</Text>
        ) : (
          rates?.map((rate) => {
            const currencyConfig = CURRENCIES.find((c) => c.code === rate.CharCode)
            return (
              <RateDisplay
                key={rate.ID}
                flag={currencyConfig?.flag ?? '🏳️'}
                code={rate.CharCode}
                value={rate.Value.toFixed(4).replace('.', ',')}
              />
            )
          })
        )}
      </View>
    </View>
  )
}
