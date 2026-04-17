import React from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { Trash2 } from 'lucide-react-native'
import { EarlyRepayment } from '@/entities/calculators/credit'
import { formatMonthIndexToDate } from '@/shared/lib'
import { EarlyRepaymentForm } from './EarlyRepaymentForm'
import { BottomSheetModal } from '../../bottom-sheet-modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: Omit<EarlyRepayment, 'id'>) => void
  onRemove: (id: string) => void
  items: EarlyRepayment[]
  maxMonths: number
}

export const EarlyRepaymentModal = ({
  isOpen,
  onClose,
  onAdd,
  onRemove,
  items,
  maxMonths,
}: Props): React.JSX.Element => {
  return (
    <BottomSheetModal
      isOpen={isOpen}
      onClose={onClose}
      title="Досрочные платежи"
      enableKeyboardHandling={true}
    >
      <View className="flex-1">
        <View className="border-b border-slate-100 bg-slate-50/30 pb-2">
          <EarlyRepaymentForm onSubmit={onAdd} maxMonths={maxMonths} />
        </View>

        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        >
          <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Добавленные операции
          </Text>

          {items.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-sm text-slate-400">Список пока пуст</Text>
            </View>
          ) : (
            <View className="flex-col gap-3 pb-10">
              {items.map((item) => (
                <View
                  key={item.id}
                  className="flex-row items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <View className="flex-col gap-1">
                    <Text className="text-base font-bold text-slate-900">
                      {new Intl.NumberFormat('ru-RU').format(item.amount)} ₽
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-xs font-medium text-slate-500">
                        {formatMonthIndexToDate(item.month)}
                      </Text>
                      <View className="mx-2 h-1 w-1 rounded-full bg-slate-300" />
                      <Text className="text-xs font-medium text-blue-600">
                        {item.strategy === 'reduce_term' ? 'Сократить срок' : 'Снизить платеж'}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => onRemove(item.id)}
                    className="h-10 w-10 items-center justify-center rounded-xl bg-red-50 active:bg-red-100"
                  >
                    <Trash2 color="#ef4444" size={18} />
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </BottomSheetModal>
  )
}
