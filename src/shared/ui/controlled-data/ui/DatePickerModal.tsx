// shared/ui/date-picker-modal.tsx
import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { X } from 'lucide-react-native'
import { getLocalYMD } from '../lib/date'

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (date: Date) => void
  currentDate: Date
  minDate?: Date
  maxDate?: Date
  label?: string
}

export const DatePickerModal = ({
  isOpen,
  onClose,
  onSelect,
  currentDate,
  minDate,
  maxDate,
  label = 'Выберите дату',
}: DatePickerModalProps) => {
  const selectedDateString = getLocalYMD(currentDate)
  const minDateString = minDate ? getLocalYMD(minDate) : undefined
  const maxDateString = maxDate ? getLocalYMD(maxDate) : undefined

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View className="flex-1 justify-center bg-black/50 px-4">
        <View className="overflow-hidden rounded-2xl bg-white pb-4 shadow-xl">
          <View className="flex-row items-center justify-between border-b border-slate-100 p-4">
            <Text className="text-lg font-bold text-slate-800">{label}</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <X size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <Calendar
            current={selectedDateString}
            minDate={minDateString}
            maxDate={maxDateString}
            firstDay={1}
            markedDates={{
              [selectedDateString]: { selected: true, selectedColor: '#3b82f6' },
            }}
            onDayPress={(day: { dateString: string }) => {
              const [year, month, date] = day.dateString.split('-').map(Number)
              onSelect(new Date(year, month - 1, date))
            }}
            theme={{
              todayTextColor: '#3b82f6',
              arrowColor: '#3b82f6',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
            }}
          />
        </View>
      </View>
    </Modal>
  )
}
