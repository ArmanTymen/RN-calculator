import React from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { Check } from 'lucide-react-native'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { MortgageFormValues, useDeductions } from '@/entities/calculators/mortgage'
import { ScheduleRow } from '@/entities/calculators/credit'
import { BottomSheetModal } from '../../bottom-sheet-modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  scheduleData: ScheduleRow[]
}

const formatMoney = (val: number): string => Math.round(val).toLocaleString('ru-RU') + ' ₽'

export const DeductionsModal = ({ isOpen, onClose, scheduleData }: Props): React.JSX.Element => {
  const { control } = useFormContext<MortgageFormValues>()
  const propertyPrice = useWatch({ control, name: 'propertyPrice' }) || 0
  const isMarried = useWatch({ control, name: 'deductions.isMarried' }) || false

  const { propertyDeduction, interestDeduction, totalDeduction } = useDeductions({
    propertyPrice: Number(propertyPrice),
    scheduleData,
    isMarried,
  })

  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} title="Налоговый вычет">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
        <Text className="mb-6 text-sm leading-5 text-slate-500">
          Государство позволяет вернуть 13% от стоимости жилья и фактически уплаченных процентов.
          Лимит на покупку — 2 млн ₽ (возврат 260к), на проценты — 3 млн ₽ (возврат 390к).
        </Text>

        <Controller
          control={control}
          name="deductions.isMarried"
          render={({ field: { onChange, value } }) => (
            <Pressable
              onPress={() => onChange(!value)}
              className="mb-6 flex-row items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 active:bg-slate-100"
            >
              <View
                className={`mt-1 h-6 w-6 items-center justify-center rounded-lg border ${
                  value ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                }`}
              >
                {value && <Check color="white" size={16} strokeWidth={3} />}
              </View>
              <View className="flex-1 flex-col">
                <Text className="text-base font-bold text-slate-900">Покупаем в браке</Text>
                <Text className="mt-1 text-xs leading-4 text-slate-500">
                  Лимиты вычета удваиваются и распределяются на обоих супругов (до 1.3 млн ₽
                  суммарно)
                </Text>
              </View>
            </Pressable>
          )}
        />

        <View className="mb-10 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
          <Text className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-800">
            Сумма к возврату
          </Text>

          <View className="flex-col gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-slate-600">За покупку дома:</Text>
              <Text className="text-base font-bold text-slate-900">
                {formatMoney(propertyDeduction)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-slate-600">За проценты:</Text>
              <Text className="text-base font-bold text-slate-900">
                {formatMoney(interestDeduction)}
              </Text>
            </View>

            <View className="mt-2 flex-row items-center justify-between border-t border-emerald-200 pt-4">
              <Text className="font-bold text-emerald-900">Итого вернуть:</Text>
              <Text className="text-2xl font-black text-emerald-600">
                {formatMoney(totalDeduction)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  )
}
