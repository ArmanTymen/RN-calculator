import React, { useState } from 'react'
import { View, Text, Pressable, LayoutAnimation } from 'react-native'
import { Info, ChevronDown, ChevronUp } from 'lucide-react-native'
import { OperationConfig } from '../model/types'

export const TheoryHint = ({ config }: { config: OperationConfig }): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOpen(!isOpen)
  }

  return (
    <View className="mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/50">
      <Pressable
        onPress={toggle}
        className="flex-row items-center justify-between p-4 active:bg-blue-100"
      >
        <View className="flex-row items-center gap-2">
          <Info size={18} color="#2563eb" />
          <Text className="text-sm font-semibold text-blue-800">Справка и формула</Text>
        </View>
        {isOpen ? (
          <ChevronUp size={18} color="#2563eb" />
        ) : (
          <ChevronDown size={18} color="#2563eb" />
        )}
      </Pressable>

      {isOpen && (
        <View className="px-4 pb-4">
          <Text className="mb-3 text-xs leading-4 text-slate-600">{config.description}</Text>

          <View className="rounded-xl border border-blue-50 bg-white p-3">
            <View className="mb-2">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Формула
              </Text>
              <Text className="font-mono text-sm text-blue-600">{config.formula}</Text>
            </View>
            <View>
              <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Пример
              </Text>
              <Text className="text-sm text-slate-700">{config.example}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
