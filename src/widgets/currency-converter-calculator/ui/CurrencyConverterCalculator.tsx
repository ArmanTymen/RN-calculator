import { RatesBlock } from '@/entities/currency'
import { useCurrencyConverter } from '@/features/currency-converter-form/model/useCurrencyConverter'
import { CurrencyConverterForm } from '@/features/currency-converter-form/ui/CurrencyConverterForm'
import React from 'react'
import { ScrollView } from 'react-native'

export const CurrencyConverterCalculator = () => {
  const { todayQuery, isDifferentDate, safeDate, selectedDateQuery } = useCurrencyConverter()
  return (
    <ScrollView>
      <CurrencyConverterForm />
      <RatesBlock title="Курсы ЦБ на сегодня" query={todayQuery} />

      {isDifferentDate && (
        <RatesBlock
          title={`Курсы ЦБ на ${safeDate.toLocaleDateString('ru-RU')}`}
          query={selectedDateQuery}
          variant="secondary"
        />
      )}
    </ScrollView>
  )
}
