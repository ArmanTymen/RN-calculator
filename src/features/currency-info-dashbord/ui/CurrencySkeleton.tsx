import { View } from 'react-native'

export const CurrencySkeleton = () => (
  <View className="animate-pulse divide-y divide-gray-50 rounded-2xl border border-gray-100 bg-white">
    {[1, 2, 3, 4, 5].map((i) => (
      <View key={i} className="flex items-center justify-between p-4">
        <View className="space-y-2">
          <View className="h-4 w-12 rounded bg-gray-200" /> {/* USD */}
          <View className="h-3 w-32 rounded bg-gray-100" /> {/* Доллар США */}
        </View>
        <View className="flex flex-col items-end space-y-2">
          <View className="h-5 w-16 rounded bg-gray-200" /> {/* Цена */}
          <View className="h-3 w-10 rounded bg-gray-100" /> {/* Изменение */}
        </View>
      </View>
    ))}
  </View>
)
