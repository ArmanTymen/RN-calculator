// shared/ui/controlled-date-input.tsx
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Calendar as CalendarIcon } from 'lucide-react-native'
import { formatDisplayDate } from '../lib/date'
import { DatePickerModal } from './DatePickerModal'

interface ControlledDateInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  minimumDate?: Date
  maximumDate?: Date
}

export const ControlledDateInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Выберите дату',
  minimumDate,
  maximumDate,
}: ControlledDateInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View className="flex flex-col gap-1">
      {label && <Text className="mb-1 text-sm font-medium text-slate-700">{label}</Text>}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const isDate = (value as unknown) instanceof Date
          const dateValue = isDate ? (value as unknown as Date) : new Date()

          return (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsOpen(true)}
                className={`h-14 w-full flex-row items-center justify-between rounded-xl border bg-slate-50 px-4 ${
                  error ? 'border-red-500' : 'border-slate-100'
                }`}
              >
                <Text className={isDate ? 'text-lg text-slate-900' : 'text-lg text-slate-400'}>
                  {isDate ? formatDisplayDate(dateValue) : placeholder}
                </Text>
                <CalendarIcon size={20} color="#94a3b8" />
              </TouchableOpacity>

              <DatePickerModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSelect={(date) => {
                  onChange(date)
                  setIsOpen(false)
                }}
                currentDate={dateValue}
                minDate={minimumDate}
                maxDate={maximumDate}
                label={label}
              />

              {error && <Text className="mt-1 text-xs text-red-500">{error.message}</Text>}
            </>
          )
        }}
      />
    </View>
  )
}
