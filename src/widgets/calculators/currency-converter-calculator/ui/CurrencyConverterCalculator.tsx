// src/widgets/currency-converter-calculator/ui/CurrencyConverterCalculator.tsx
import React from 'react'
import { ScrollView } from 'react-native'
import { FormProvider } from 'react-hook-form'
import { RatesBlock } from '@/entities/calculators/currency'
import { useCurrencyConverter } from '@/features/calculators/currency-converter-form/model/useCurrencyConverter'
import { CurrencyConverterForm } from '@/features/calculators/currency-converter-form/ui/CurrencyConverterForm'
import { SafeAreaView } from 'react-native-safe-area-context'

export const CurrencyConverterCalculator = () => {
  const {
    methods,
    todayQuery,
    isDifferentDate,
    safeDate,
    selectedDateQuery,
    result,
    swapCurrencies,
  } = useCurrencyConverter()

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <CurrencyConverterForm
            result={result}
            swapCurrencies={swapCurrencies}
            isLoading={selectedDateQuery.isLoading}
          />

          <RatesBlock title="Курсы ЦБ на сегодня" query={todayQuery} />

          {isDifferentDate && (
            <RatesBlock
              title={`Курсы ЦБ на ${safeDate.toLocaleDateString('ru-RU')}`}
              query={selectedDateQuery}
              variant="secondary"
            />
          )}
        </ScrollView>
      </FormProvider>
    </SafeAreaView>
  )
}
