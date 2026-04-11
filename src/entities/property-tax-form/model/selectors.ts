// entities/property-tax-form/model/selectors.ts
import { PropertyTaxFormSchema } from './types'

export const selectTaxResults = (data: PropertyTaxFormSchema | undefined | null) => {
  if (!data || !data.propertyValue) return null

  const { propertyValue, isPreviouslyUsed, alreadyReceivedAmount = 0, yearlyIncomes = [] } = data

  // Логика расчета
  const availableBase = isPreviouslyUsed
    ? Math.min(propertyValue, Math.max(0, 2000000 - alreadyReceivedAmount / 0.13))
    : Math.min(propertyValue, 2000000)

  const totalTaxReturn = availableBase * 0.13
  const totalTaxPaidLimit = yearlyIncomes.reduce((acc, curr) => acc + (curr.value || 0) * 0.13, 0)
  const availableNow = Math.min(totalTaxReturn, totalTaxPaidLimit)

  return {
    availableBase,
    totalTaxReturn,
    availableNow,
    remainingReturn: Math.max(0, totalTaxReturn - availableNow),
    shouldShowResults: propertyValue > 0 && yearlyIncomes.length > 0,
  }
}
