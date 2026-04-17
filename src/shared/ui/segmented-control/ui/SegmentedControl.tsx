// src/shared/ui/segmented-control.tsx
import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export interface Option<T> {
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
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = value === option.value
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
            style={[styles.button, isActive && styles.activeButton]}
          >
            <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// Эквиваленты классов Tailwind вынесены в константные стили
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9', // bg-slate-100
    borderRadius: 12, // rounded-xl
    padding: 4, // p-1
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4, // py-2
    borderRadius: 8, // rounded-lg
  },
  activeButton: {
    backgroundColor: '#ffffff', // bg-white
    shadowColor: '#000', // shadow-sm
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // для Android
  },
  text: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
  },
  activeText: {
    color: '#2563eb', // text-blue-600
    fontWeight: 'bold', // font-bold
  },
  inactiveText: {
    color: '#64748b', // text-slate-500
  },
})
