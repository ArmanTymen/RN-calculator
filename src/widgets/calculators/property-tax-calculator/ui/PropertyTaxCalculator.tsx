import { PropertyTaxDeductionForm } from '@/features/calculators/property-tax-deduction-form'
import { usePropertyTaxForm } from '@/features/calculators/property-tax-deduction-form/model/usePropertyTaxForm'
import { ResultRow } from '@/features/calculators/property-tax-deduction-form/ui/ResultRow'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const PropertyTaxCalculator = () => {
  const methods = usePropertyTaxForm()
  const { control, setValue, fields, results, isHydrated, watch, handleYearChange } =
    usePropertyTaxForm()
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <PropertyTaxDeductionForm
            control={control}
            setValue={setValue}
            fields={fields}
            isHydrated={isHydrated}
            watch={watch}
            handleYearChange={handleYearChange}
          />
          {results?.shouldShowResults && (
            <View className="mb-10 gap-3 rounded-3xl bg-slate-100 p-5">
              <ResultRow label="Доступный вычет:" value={results.availableBase} />
              <ResultRow label="Налог к возврату:" value={results.totalTaxReturn} />
              <View className="my-1 h-[1px] bg-slate-200" />
              <ResultRow label="Доступно сейчас:" value={results.availableNow} />
            </View>
          )}
        </ScrollView>
      </FormProvider>
    </SafeAreaView>
  )
}
