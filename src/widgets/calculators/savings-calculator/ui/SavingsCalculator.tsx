import { SavingsForm } from '@/features/calculators/savings-form'
import { useSavingsForm } from '@/features/calculators/savings-form/model/useSavingsForm'
import { PiggyBank } from 'lucide-react-native'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const SavingsCalculator = () => {
  const methods = useSavingsForm()

  const {
    control,
    replenishments,
    withdrawals,
    handleAddReplenishment,
    handleAddWithdrawal,
    handleRemoveTransaction,
    isReady,
    calculationResult,
  } = useSavingsForm()

  if (!isReady) return null

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <SavingsForm
            control={control}
            replenishments={replenishments}
            withdrawals={withdrawals}
            handleAddReplenishment={handleAddReplenishment}
            handleAddWithdrawal={handleAddWithdrawal}
            handleRemoveTransaction={handleRemoveTransaction}
          />

          {calculationResult && (
            <View className="mt-6 flex-col gap-2 rounded-2xl border border-green-200 bg-green-50 p-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-medium text-green-700">Сумма в конце срока</Text>

                <View className="flex-row items-center gap-1 rounded-full bg-green-100 px-2 py-0.5">
                  <PiggyBank size={10} color="#15803d" />
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                    Вклад
                  </Text>
                </View>
              </View>

              <View style={{ minHeight: 40 }} className="justify-center">
                <Text className="text-4xl font-bold text-slate-900">
                  {Math.round(calculationResult.finalAmount).toLocaleString('ru-RU')} ₽
                </Text>
              </View>

              <View className="mt-2 flex-row justify-between border-t border-green-200 pt-4">
                <View className="flex-col">
                  <Text className="text-xs uppercase tracking-tighter text-slate-500">
                    Начислено процентов
                  </Text>
                  <Text className="text-lg font-bold text-slate-900">
                    + {Math.round(calculationResult.totalInterest).toLocaleString('ru-RU')} ₽
                  </Text>
                </View>

                <View className="justify-end">
                  <Text className="text-[10px] italic text-green-600">с учетом налогов*</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </FormProvider>
    </SafeAreaView>
  )
}
