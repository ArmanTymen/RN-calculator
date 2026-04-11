import { PropertyTaxDeductionForm } from '@/features/property-tax-deduction-form'
import { ScrollView, Text } from 'react-native'

export const PropertyTaxDeductionPage = () => {
  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Имущественный вычет</Text>
      <PropertyTaxDeductionForm />
    </ScrollView>
  )
}
