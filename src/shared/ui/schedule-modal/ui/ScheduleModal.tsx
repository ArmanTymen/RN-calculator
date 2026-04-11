import { Modal, View, Text, Pressable, FlatList, ListRenderItem } from 'react-native'
import { X } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { ScheduleRowComponent } from './ScheduleRowComponent'
import { ScheduleRow } from '@/entities/credit'

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  schedule: ScheduleRow[]
}

export const ScheduleModal = ({ isOpen, onClose, schedule }: ScheduleModalProps) => {
  const renderItem: ListRenderItem<ScheduleRow> = useCallback(
    ({ item }) => <ScheduleRowComponent item={item} />,
    []
  )

  const getItemLayout = useCallback(
    (_: ArrayLike<ScheduleRow> | null | undefined, index: number) => ({
      length: 48,
      offset: 48 * index,
      index,
    }),
    []
  )

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-slate-900/50">
        <View className="h-[80%] w-full flex-col rounded-t-3xl bg-white shadow-xl">
          <View className="flex-row items-center justify-between border-b border-slate-100 p-4">
            <Text className="text-lg font-bold text-slate-900">График платежей</Text>
            <Pressable onPress={onClose} className="rounded-full bg-slate-100 p-2">
              <X color="#64748b" size={20} />
            </Pressable>
          </View>

          <View className="flex-row border-b border-slate-100 bg-slate-50 px-4 py-3">
            <Text className="flex-1 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Дата
            </Text>
            <Text className="flex-1 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Платеж
            </Text>
            <Text className="flex-1 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Проценты
            </Text>
            <Text className="flex-[1.2] text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Остаток
            </Text>
          </View>

          <FlatList
            data={schedule}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            initialNumToRender={12}
            maxToRenderPerBatch={15}
            windowSize={5}
            removeClippedSubviews={true}
            getItemLayout={getItemLayout}
          />
        </View>
      </View>
    </Modal>
  )
}
