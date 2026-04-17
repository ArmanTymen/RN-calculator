import React, { useCallback } from 'react'
import { View, Text, FlatList, ListRenderItem } from 'react-native'
import { ScheduleRowComponent } from './ScheduleRowComponent'
import { ScheduleRow } from '@/entities/calculators/credit'
import { BottomSheetModal } from '../../bottom-sheet-modal'

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
    <BottomSheetModal isOpen={isOpen} onClose={onClose} title="График платежей">
      {/* Заголовок таблицы */}
      <View className="flex-row border-b border-slate-100 bg-slate-50/50 px-4 py-3">
        <Text className="flex-1 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
          Дата
        </Text>
        <Text className="flex-1 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
          Платеж
        </Text>
        <Text className="flex-1 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
          Проценты
        </Text>
        <Text className="flex-[1.2] text-right text-xs font-bold uppercase tracking-wider text-slate-500">
          Остаток
        </Text>
      </View>

      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, paddingTop: 8 }}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetModal>
  )
}
