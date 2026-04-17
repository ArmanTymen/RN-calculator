// features/savings-calculator/ui/TransactionList.tsx
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Control, FieldValues, Path } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { SavingsFormInput, SavingsTransaction } from '@/entities/calculators/savings/model/schema'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { X } from 'lucide-react-native'
import { ControlledDateInput } from '@/shared/ui/controlled-data'

interface TransactionListProps {
  type: 'replenishments' | 'withdrawals'
  data: SavingsTransaction[]
  control: Control<SavingsFormInput>
  handleRemoveTransaction: (type: 'replenishments' | 'withdrawals', id: string) => void
}

export const TransactionList = ({
  type,
  data,
  control,
  handleRemoveTransaction,
}: TransactionListProps) => (
  <View className="mt-2 flex-col gap-3">
    {data.map((item, index) => {
      const amountPath = `${type}.${index}.amount` as Path<SavingsFormInput>
      const datePath = `${type}.${index}.date` as Path<SavingsFormInput>

      return (
        <View
          key={item.id}
          className="flex-row items-center gap-2 rounded-xl border border-slate-100 bg-white p-2 shadow-sm"
        >
          <TouchableOpacity
            onPress={() => handleRemoveTransaction(type, item.id)}
            className="h-8 w-8 items-center justify-center rounded-full bg-red-50"
          >
            <X size={16} color="#ef4444" />
          </TouchableOpacity>

          <View className="h-12 flex-[1.5] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Picker selectedValue="once" style={{ marginLeft: -8, marginTop: -2 }}>
              <Picker.Item label="Разовое" value="once" color="#1e293b" style={{ fontSize: 13 }} />
              <Picker.Item
                label="Ежемесячно"
                value="monthly"
                color="#1e293b"
                style={{ fontSize: 13 }}
              />
            </Picker>
          </View>

          <View className="flex-[2]">
            <ControlledNumberInput
              name={amountPath}
              control={control as unknown as Control<FieldValues>}
              isFormatted
              limit={1000000000}
              label=""
            />
          </View>

          {/* Исправленное поле календаря */}
          <View className="flex-[2]">
            <ControlledDateInput name={datePath} control={control} placeholder="дд.мм.гггг" />
          </View>
        </View>
      )
    })}
  </View>
)
