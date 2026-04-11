import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { CALCULATOR_GROUPS } from '@/entities/calculator'
import { useNavigation } from '@react-navigation/native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import type { AllScreensParamList } from '@/shared/lib/navigation/types'

export const CalculationList = () => {
  const navigation = useNavigation()
  const handlePress = (route: keyof AllScreensParamList) => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    }

    ReactNativeHapticFeedback.trigger('impactLight', options)
    navigation.navigate(route as never)
  }
  return (
    <View className="pb-8">
      {CALCULATOR_GROUPS.map((group) => (
        <View key={group.id} className="mb-6 gap-3">
          <Text className="ml-2 text-lg font-bold text-slate-700">{group.title}</Text>

          <View className="gap-3">
            {group.items.map((calc) => (
              <TouchableOpacity
                key={calc.to.toString()}
                onPress={() => handlePress(calc.to as keyof AllScreensParamList)}
                activeOpacity={0.7}
                className="flex-row items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <View
                  className={`h-12 w-12 items-center justify-center rounded-xl ${calc.bgColor}`}
                >
                  <calc.icon size={24} className={calc.color} />
                </View>

                <View className="flex-1 flex-col">
                  <Text className="text-lg font-bold leading-tight text-slate-900">
                    {calc.title}
                  </Text>
                  <Text className="text-sm text-slate-500">{calc.description}</Text>
                </View>

                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}
