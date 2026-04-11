import { View, Text, TextInput } from 'react-native'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { formatSum, inputStyles, parseSum } from '../model/constants'

interface ControlledNumberInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  limit: number
  isFormatted?: boolean
  step?: string
  keyboardType?: 'numeric' | 'decimal-pad'
}

export const ControlledNumberInput = <T extends FieldValues>({
  name,
  control,
  label,
  limit,
  isFormatted = false,
  keyboardType = 'numeric',
}: ControlledNumberInputProps<T>) => {
  return (
    <View className="flex flex-col gap-1">
      <Text className="text-sm text-slate-500">{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const displayValue =
            value === 0 || value === undefined
              ? ''
              : isFormatted
                ? formatSum(Number(value))
                : String(value)

          return (
            <TextInput
              keyboardType={keyboardType}
              className={inputStyles}
              placeholder="0"
              placeholderTextColor="#94a3b8"
              value={displayValue}
              onChangeText={(text) => {
                const rawValue = isFormatted ? parseSum(text) : Number(text)

                if (rawValue <= limit || text === '') {
                  onChange(text === '' ? 0 : rawValue)
                }
              }}
            />
          )
        }}
      />
    </View>
  )
}
