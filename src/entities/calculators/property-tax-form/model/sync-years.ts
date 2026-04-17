// entities/tax/model/sync-years.ts

import { YearlyIncomeInput } from './schema'

export const calculateYearlyIncomes = (
  purchaseYearStr: string,
  currentIncomes: YearlyIncomeInput[]
): YearlyIncomeInput[] => {
  const year = parseInt(purchaseYearStr, 10)
  if (isNaN(year) || year < 2000) return []

  const currentYear = new Date().getFullYear()
  const maxTaxYear = currentYear - 1

  if (year > maxTaxYear) return []

  const targetYears: number[] = []
  for (let i = maxTaxYear; i >= year && targetYears.length < 3; i--) {
    targetYears.push(i)
  }

  return targetYears.map((y) => {
    const existing = currentIncomes.find((item) => item.year === y)
    return { year: y, value: existing ? existing.value : 0 }
  })
}
