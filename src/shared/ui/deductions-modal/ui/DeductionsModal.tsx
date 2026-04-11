import { Modal, View, Text, Pressable } from 'react-native'
import { X, Check } from 'lucide-react-native'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { MortgageFormValues, useDeductions } from '@/entities/mortgage'
import { ScheduleRow } from '@/entities/credit'

interface Props {
  isOpen: boolean
  onClose: () => void
  scheduleData: ScheduleRow[]
}
const formatMoney = (val: number) => Math.round(val).toLocaleString('ru-RU') + ' ₽'

export const DeductionsModal = ({ isOpen, onClose, scheduleData }: Props) => {
  const { control } = useFormContext<MortgageFormValues>()
  const propertyPrice = useWatch({ control, name: 'propertyPrice' }) || 0
  const isMarried = useWatch({ control, name: 'deductions.isMarried' }) || false

  const { propertyDeduction, interestDeduction, totalDeduction } = useDeductions({
    propertyPrice: Number(propertyPrice),
    scheduleData,
    isMarried,
  })

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-slate-900/50">
        <View className="h-[85%] w-full flex-col rounded-t-3xl bg-white shadow-xl">
          <View className="flex-row items-center justify-between border-b border-slate-100 p-4">
            <Text className="text-lg font-bold text-slate-900">Налоговый вычет</Text>
            <Pressable onPress={onClose} className="rounded-full bg-slate-100 p-2">
              <X color="#64748b" size={20} />
            </Pressable>
          </View>

          <View className="flex-1 p-6">
            <Text className="mb-6 text-sm text-slate-500">
              Государство позволяет вернуть 13% от стоимости жилья и фактически уплаченных
              процентов...
            </Text>

            <Controller
              control={control}
              name="deductions.isMarried"
              render={({ field: { onChange, value } }) => (
                <Pressable
                  onPress={() => onChange(!value)}
                  className="mb-6 flex-row items-start gap-3 rounded-xl border border-slate-200 p-4"
                >
                  <View
                    className={`mt-1 h-5 w-5 items-center justify-center rounded border ${value ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}
                  >
                    {value && <Check color="white" size={14} />}
                  </View>
                  <View className="flex-1 flex-col">
                    <Text className="font-medium text-slate-900">Покупаем в браке</Text>
                    <Text className="mt-1 text-xs text-slate-500">
                      Лимиты вычета удваиваются и распределяются на обоих супругов
                    </Text>
                  </View>
                </Pressable>
              )}
            />

            <View className="rounded-2xl bg-green-50 p-5">
              <Text className="mb-4 text-sm font-semibold text-green-800">Сумма к возврату:</Text>

              <View className="flex-col gap-3">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-slate-600">За покупку недвижимости:</Text>
                  <Text className="text-sm font-bold text-slate-900">
                    {formatMoney(propertyDeduction)}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-sm text-slate-600">За проценты по ипотеке:</Text>
                  <Text className="text-sm font-bold text-slate-900">
                    {formatMoney(interestDeduction)}
                  </Text>
                </View>

                <View className="mt-2 flex-row justify-between border-t border-green-200 pt-3">
                  <Text className="font-bold text-green-900">Итого можно вернуть:</Text>
                  <Text className="text-xl font-black text-green-600">
                    {formatMoney(totalDeduction)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
