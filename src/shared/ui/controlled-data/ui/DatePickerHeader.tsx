import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { X, CalendarDays, ListOrdered } from 'lucide-react-native'

interface HeaderProps {
  label: string
  viewMode: 'calendar' | 'picker'
  onToggleMode: () => void
  onClose: () => void
}

export const DatePickerHeader = ({ label, viewMode, onToggleMode, onClose }: HeaderProps) => (
  <View className="flex-row items-center justify-between gap-2 border-b border-slate-100 p-4">
    <View className="flex-1 pr-2">
      <Text className="text-lg font-bold text-slate-800" numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>

    <TouchableOpacity
      onPress={onToggleMode}
      className="flex-row items-center rounded-lg bg-blue-50 px-3 py-1.5"
    >
      {viewMode === 'calendar' ? (
        <ListOrdered size={16} color="#3b82f6" />
      ) : (
        <CalendarDays size={16} color="#3b82f6" />
      )}
      <Text className="ml-2 text-xs font-bold text-blue-600">
        {viewMode === 'calendar' ? 'Год' : 'Сетка'}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={onClose} className="rounded-full bg-slate-50 p-1.5">
      <X size={20} color="#64748b" />
    </TouchableOpacity>
  </View>
)
