import { ConverterBlock } from '@/widgets/converter/ui/ConverterBlock'
import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export const ConverterPage = () => {
  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 px-4">
        <View className="mx-auto w-full max-w-md py-8">
          <Text className="mb-2 text-3xl font-extrabold text-slate-900">Конвертер</Text>
          <ConverterBlock />
        </View>
      </ScrollView>
    </View>
  )
}
