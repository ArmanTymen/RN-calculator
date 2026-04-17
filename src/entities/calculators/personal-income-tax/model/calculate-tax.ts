// src/entities/personal-income-tax/model/calculate-tax.ts

import { PersonalTaxIncomeFormOutPut } from './schema'

export interface TaxBracket {
  rate: number
  threshold: number
  taxableAmount: number
  tax: number
}

interface TaxResult {
  totalGross: number
  taxAmount: number
  netIncome: number
  effectiveRate: number // От базы
  realRate: number // От общей суммы (грязных)
  taxableBase: number
  brackets: TaxBracket[]
}

const NDFL_LIMITS = [
  { limit: 2_400_000, rate: 0.13 },
  { limit: 5_000_000, rate: 0.15 },
  { limit: 20_000_000, rate: 0.18 },
  { limit: 50_000_000, rate: 0.2 },
  { limit: Infinity, rate: 0.22 },
]

export const calculatePersonalTax = (data: PersonalTaxIncomeFormOutPut): TaxResult => {
  const { income, taxDeduction, isNonResident, isSpecialCategory } = data

  // 1. Считаем базу
  const taxableBase = Math.max(0, income - taxDeduction)

  // Если нерезидент (не ВКС), то фикс 30% без всяких шкал
  if (isNonResident && !isSpecialCategory) {
    const tax = taxableBase * 0.3
    return {
      totalGross: income,
      taxAmount: Math.round(tax),
      netIncome: Math.round(income - tax),
      effectiveRate: 30,
      realRate: (tax / income) * 100,
      taxableBase,
      brackets: [],
    }
  }

  // 2. Расчет по прогрессивной шкале (кусками)
  let totalTax = 0
  let remainingBase = taxableBase
  let lastThreshold = 0
  const brackets: TaxBracket[] = []

  for (const { limit, rate } of NDFL_LIMITS) {
    if (remainingBase <= 0) break

    const rangeSize = limit - lastThreshold
    const amountInBracket = Math.min(remainingBase, rangeSize)
    const taxInBracket = amountInBracket * rate

    brackets.push({
      rate: rate * 100,
      threshold: limit,
      taxableAmount: amountInBracket,
      tax: taxInBracket,
    })

    totalTax += taxInBracket
    remainingBase -= amountInBracket
    lastThreshold = limit
  }

  return {
    totalGross: income,
    taxAmount: Math.round(totalTax),
    netIncome: Math.round(income - totalTax),
    effectiveRate: taxableBase > 0 ? (totalTax / taxableBase) * 100 : 0,
    realRate: income > 0 ? (totalTax / income) * 100 : 0,
    taxableBase,
    brackets,
  }
}
