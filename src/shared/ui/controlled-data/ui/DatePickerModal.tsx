import React from 'react'
import { Modal, View, Text, TouchableOpacity, Platform } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'
import { Picker } from '@react-native-picker/picker'

import { getLocalYMD } from '../lib/date'
import { DatePickerHeader } from './DatePickerHeader'
import { CustomCalendarTheme } from '../model/types'
import { useDatePicker } from '../lib/useDatePicker'

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (date: Date) => void
  currentDate: Date
  minDate?: Date
  maxDate?: Date
  label?: string
}

const calendarTheme: CustomCalendarTheme = {
  todayTextColor: '#3b82f6',
  textDayFontWeight: '500',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '500',
  monthTextColor: '#1e293b',
  textMonthFontSize: 16,
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
      alignItems: 'center',
    },
  },
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
  const {
    viewMode,
    navDate,
    setNavDate,
    months,
    years,
    handleNavDateChange,
    toggleMode,
    resetAndClose,
    setViewMode,
  } = useDatePicker({ currentDate, onClose })

  const selectedDateString = getLocalYMD(currentDate)

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={resetAndClose}>
      <View className="flex-1 justify-center bg-slate-900/50 px-4">
        <View className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <DatePickerHeader
            label={label}
            viewMode={viewMode}
            onToggleMode={toggleMode}
            onClose={resetAndClose}
          />

          {viewMode === 'picker' ? (
            <View className="flex-col pb-6 pt-4">
              <View className="flex-row px-4">
                <View className="flex-1">
                  <Picker
                    selectedValue={navDate.getMonth()}
                    onValueChange={(val) => handleNavDateChange('month', Number(val))}
                    style={Platform.OS === 'ios' ? { height: 150 } : {}}
                  >
                    {months.map((m, i) => (
                      <Picker.Item key={m} label={m} value={i} />
                    ))}
                  </Picker>
                </View>
                <View className="flex-1">
                  <Picker
                    selectedValue={navDate.getFullYear()}
                    onValueChange={(val) => handleNavDateChange('year', Number(val))}
                    style={Platform.OS === 'ios' ? { height: 150 } : {}}
                  >
                    {years.map((y) => (
                      <Picker.Item key={y} label={String(y)} value={y} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View className="mt-4 px-4">
                <TouchableOpacity
                  onPress={() => setViewMode('calendar')}
                  className="w-full items-center rounded-xl bg-blue-600 py-3.5"
                >
                  <Text className="font-bold text-white">Применить</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="pb-4">
              <Calendar
                current={getLocalYMD(navDate)}
                minDate={minDate ? getLocalYMD(minDate) : undefined}
                maxDate={maxDate ? getLocalYMD(maxDate) : undefined}
                onMonthChange={(date) => setNavDate(new Date(date.year, date.month - 1, 1))}
                renderArrow={(direction) => (
                  <View className="rounded-full bg-slate-50 p-2">
                    {direction === 'left' ? (
                      <ChevronLeft size={20} color="#3b82f6" />
                    ) : (
                      <ChevronRight size={20} color="#3b82f6" />
                    )}
                  </View>
                )}
                markedDates={{ [selectedDateString]: { selected: true, selectedColor: '#3b82f6' } }}
                onDayPress={(day) => {
                  const [y, m, d] = day.dateString.split('-').map(Number)
                  onSelect(new Date(y, m - 1, d))
                }}
                theme={calendarTheme}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}
