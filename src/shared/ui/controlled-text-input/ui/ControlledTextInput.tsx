import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
}

export const ControlledTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="gap-1">
          {label && <Text className="text-sm font-medium text-slate-700">{label}</Text>}
          <TextInput
            className={`h-12 rounded-xl border bg-white px-4 text-slate-900 ${
              error ? 'border-red-500' : 'border-slate-200'
            }`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
          />
          {error && <Text className="text-xs text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  )
}
