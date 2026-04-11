import { View } from 'react-native'

export const StatsSkeleton = () => (
  <View className="flex-row gap-4">
    {[1, 2].map((i) => (
      <View key={i} className="flex-1 rounded-2xl border border-gray-200 bg-gray-100 p-4">
        <View className="mb-3 h-3 w-16 rounded bg-gray-200" />
        <View className="h-8 w-24 rounded-lg bg-gray-300" />
      </View>
    ))}
  </View>
)
