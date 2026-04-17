import React from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { PersonalTaxIncomeForm } from '@/features/calculators/personal-income-tax-form'
import { FormProvider } from 'react-hook-form'
import { usePersonalTaxIncomeForm } from '@/features/calculators/personal-income-tax-form/model/usePersonalTaxIncomeForm'
import { TaxDetailsTable, TaxResultDisplay } from '@/entities/calculators/personal-income-tax'
import { SafeAreaView } from 'react-native-safe-area-context'

export const PersonalTaxIncomeCalculator = () => {
  const methods = usePersonalTaxIncomeForm()
  const { control, setValue, handleReset, values, results, isReady } = methods

  if (!isReady) return <ActivityIndicator className="flex-1" />

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <PersonalTaxIncomeForm
            control={control}
            setValue={setValue}
            handleReset={handleReset}
            values={values}
          />

          {results && (
            <>
              <TaxResultDisplay results={results} />

              <TaxDetailsTable brackets={results.brackets} taxableBase={results.taxableBase} />
            </>
          )}
        </ScrollView>
      </FormProvider>
    </SafeAreaView>
  )
}
