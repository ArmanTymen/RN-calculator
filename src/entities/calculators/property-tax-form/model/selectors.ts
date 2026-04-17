// entities/property-tax-form/model/selectors.ts
import { PropertyTaxFormInput } from './schema'

export const selectTaxResults = (data: PropertyTaxFormInput | undefined | null) => {
  // 1. Приводим propertyValue к числу для проверки.
  // Если там пустая строка, Number вернет 0, и мы безопасно прервем расчет.
  if (!data || !Number(data.propertyValue)) return null

  const { isPreviouslyUsed, alreadyReceivedAmount = 0, yearlyIncomes = [] } = data

  // 2. Строгое приведение типов (Coercion) для математики.
  // Это убирает ошибку "The left-hand side of an arithmetic operation must be of type number"
  const safePropertyValue = Number(data.propertyValue) || 0
  const safeAlreadyReceived = Number(alreadyReceivedAmount) || 0

  // 3. Логика расчета
  const availableBase = isPreviouslyUsed
    ? Math.min(safePropertyValue, Math.max(0, 2000000 - safeAlreadyReceived / 0.13))
    : Math.min(safePropertyValue, 2000000)

  const totalTaxReturn = availableBase * 0.13

  // В yearlyIncomes.value тоже может быть строка в момент ввода, оборачиваем в Number
  const totalTaxPaidLimit = yearlyIncomes.reduce(
    (acc, curr) => acc + (Number(curr.value) || 0) * 0.13,
    0
  )

  const availableNow = Math.min(totalTaxReturn, totalTaxPaidLimit)

  return {
    availableBase,
    totalTaxReturn,
    availableNow,
    remainingReturn: Math.max(0, totalTaxReturn - availableNow),
    // 4. Используем безопасное число для сравнения '>'
    shouldShowResults: safePropertyValue > 0 && yearlyIncomes.length > 0,
  }
}
