import { Modal, View, Text, Pressable, ScrollView } from 'react-native'
import { X, Trash2 } from 'lucide-react-native'
import { EarlyRepayment } from '@/entities/credit'
import { EarlyRepaymentForm } from '@/features/repayment-add'
import { formatMonthIndexToDate } from '@/shared/lib'

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
}: Props) => {
  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-slate-900/50">
        <View className="h-[85%] w-full flex-col rounded-t-3xl bg-white shadow-xl">
          <View className="flex-row items-center justify-between border-b border-slate-100 p-4">
            <Text className="text-lg font-bold text-slate-900">Досрочные платежи</Text>
            <Pressable onPress={onClose} className="rounded-full bg-slate-100 p-2">
              <X color="#64748b" size={20} />
            </Pressable>
          </View>

          <View className="border-b border-slate-100 bg-slate-50/50">
            <EarlyRepaymentForm onSubmit={onAdd} maxMonths={maxMonths} />
          </View>

          <ScrollView className="flex-1 p-4">
            <Text className="mb-3 text-xs font-semibold uppercase text-slate-400">
              Добавленные платежи
            </Text>

            {items.length === 0 ? (
              <Text className="py-10 text-center text-sm text-slate-400">Список пока пуст</Text>
            ) : (
              <View className="flex-col gap-3 pb-10">
                {items.map((item) => (
                  <View
                    key={item.id}
                    className="flex-row items-center justify-between rounded-2xl border border-slate-100 p-3"
                  >
                    <View>
                      <Text className="text-sm font-bold text-slate-900">
                        {new Intl.NumberFormat('ru-RU').format(item.amount)} ₽
                      </Text>
                      <Text className="mt-1 text-[10px] text-slate-500">
                        Дата: {formatMonthIndexToDate(item.month)} •{' '}
                        {item.strategy === 'reduce_term' ? 'Срок' : 'Платеж'}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => onRemove(item.id)}
                      className="rounded-xl bg-red-50 p-2 active:bg-red-100"
                    >
                      <Trash2 color="#ef4444" size={16} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
