import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

interface Option<T> {
  label: string
  value: T
}

interface Props<T> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}

export const SegmentedControl = <T extends string | number>({
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <View className="flex-row rounded-xl bg-slate-100 p-1">
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
            className={`flex-1 items-center justify-center rounded-lg py-2 ${
              isActive ? 'bg-white shadow-sm shadow-slate-300' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isActive ? 'text-slate-900' : 'text-slate-500'
              } ${isActive && typeof option.value === 'string' && option.value.length <= 3 ? 'font-bold text-blue-600' : ''}`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
