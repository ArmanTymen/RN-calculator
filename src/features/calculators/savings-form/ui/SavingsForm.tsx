// features/savings-calculator/ui/SavingsForm.tsx
import React from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import { Controller, Control } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { SegmentedControl } from '@/shared/ui/segmented-control'
import { TransactionList } from './TransactionList'
import { Plus } from 'lucide-react-native'
import { SavingsFormInput, SavingsTransaction } from '@/entities/calculators/savings/model/schema'
import { CURRENCIES, DURATION_UNITS } from '@/entities/calculators/savings'

interface Props {
  control: Control<SavingsFormInput>
  replenishments: SavingsTransaction[]
  withdrawals: SavingsTransaction[]
  handleAddReplenishment: () => void
  handleAddWithdrawal: () => void
  handleRemoveTransaction: (type: 'replenishments' | 'withdrawals', id: string) => void
}

export const SavingsForm = ({
  control,
  replenishments,
  withdrawals,
  handleAddReplenishment,
  handleAddWithdrawal,
  handleRemoveTransaction,
}: Props) => {
  const showLimitField = withdrawals.length > 0
  return (
    <>
      <View className="flex-col gap-4">
        <ControlledNumberInput
          name="depositAmount"
          control={control}
          label="Сумма вклада"
          limit={10000000000}
          isFormatted
        />
        <Controller
          control={control}
          name="currency"
          render={({ field: { onChange, value } }) => (
            <SegmentedControl options={CURRENCIES} value={value} onChange={onChange} />
          )}
        />
      </View>

      <View className="flex-col gap-3">
        <ControlledNumberInput
          name="duration"
          control={control}
          label="Срок размещения"
          limit={10000}
          keyboardType="numeric"
        />
        <Controller
          control={control}
          name="durationUnit"
          render={({ field: { onChange, value } }) => (
            <SegmentedControl options={DURATION_UNITS} value={value} onChange={onChange} />
          )}
        />
      </View>

      <View className="flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <View className="flex-col gap-1">
          <Text className="text-sm font-medium text-slate-500">Тип ставки</Text>
          <View className="overflow-hidden rounded-xl border border-slate-300 bg-white">
            <Controller
              control={control}
              name="interestRateType"
              render={({ field: { onChange, value } }) => (
                <Picker selectedValue={value} onValueChange={onChange} mode="dropdown">
                  <Picker.Item label="Фиксированная" value="fixed" />
                  <Picker.Item label="Зависит от суммы" value="depends_on_amount" />
                  <Picker.Item label="Зависит от срока" value="depends_on_term" />
                </Picker>
              )}
            />
          </View>
        </View>

        <ControlledNumberInput
          name="interestRate"
          control={control}
          label="Годовая ставка (%)"
          limit={100}
          keyboardType="numeric"
        />

        <Controller
          control={control}
          name="isCapitalization"
          render={({ field: { onChange, value } }) => (
            <View className="mt-2 flex-col gap-2 border-t border-slate-200 pt-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-slate-800">
                  Капитализация процентов
                </Text>
                <Switch
                  trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
                  thumbColor="#ffffff"
                  onValueChange={onChange}
                  value={value}
                />
              </View>
              <Text className="text-xs leading-4 text-slate-500">
                Капитализация - свойство вклада, при котором начисленные проценты не отдаются на
                руки держателю, а прибавляются к вкладу. Таким образом сумма вклада растет с каждой
                выплатой процентов.
              </Text>
            </View>
          )}
        />
      </View>

      <View className="mt-2 flex-col gap-6 border-t border-slate-100 pt-6">
        {/* Секция ПОПОЛНЕНИЯ */}
        <View className="flex-col gap-2">
          <View className="flex-row items-center justify-between pr-2">
            <Text className="text-sm font-medium text-slate-600">Пополнения</Text>
            {/* Кнопка добавления в стиле ссылки с плюсом */}
            <TouchableOpacity
              onPress={handleAddReplenishment}
              className="flex-row items-center gap-1.5"
            >
              <Plus size={16} color="#2563eb" strokeWidth={3} />
              <Text className="text-sm font-semibold text-blue-600">Добавить пополнение</Text>
            </TouchableOpacity>
          </View>

          <TransactionList
            type="replenishments"
            data={replenishments}
            control={control}
            handleRemoveTransaction={handleRemoveTransaction}
          />
        </View>

        {/* Секция СНЯТИЯ */}
        <View className="mt-2 flex-col gap-2">
          <View className="flex-row items-center justify-between pr-2">
            <Text className="text-sm font-medium text-slate-600">Частичные снятия</Text>
            <TouchableOpacity
              onPress={handleAddWithdrawal}
              className="flex-row items-center gap-1.5"
            >
              <Plus size={16} color="#2563eb" strokeWidth={3} />
              <Text className="text-sm font-semibold text-blue-600">Добавить снятие</Text>
            </TouchableOpacity>
          </View>

          <TransactionList
            type="withdrawals"
            data={withdrawals}
            control={control}
            handleRemoveTransaction={handleRemoveTransaction}
          />
        </View>

        {/* НЕСНИЖАЕМЫЙ ОСТАТОК (Появляется только если нажали + у снятий) */}
        {showLimitField && (
          <View className="shadow-inner mt-2 flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
            <ControlledNumberInput
              name="limit"
              control={control}
              label="Неснижаемый остаток"
              limit={1000000000}
              isFormatted
              // Здесь тоже нужен ₽ справа внутри инпута
            />
            <Text className="pl-1 text-xs leading-4 text-slate-500">
              Сумма, ниже которой не может остаться на вкладе после частичных снятий.
            </Text>
          </View>
        )}
      </View>
    </>
  )
}
