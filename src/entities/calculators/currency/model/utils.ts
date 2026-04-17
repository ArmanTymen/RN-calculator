// src/entities/currency/model/constants.ts (или отдельный utils.ts)

import { CurrencyCode, CurrencyInfo } from './schema'

/**
 * Расчет конвертации.
 * Если валюта RUB — используем курс 1 и номинал 1.
 */
export const calculateExchange = (
  amount: number,
  sourceCode: CurrencyCode,
  targetCode: CurrencyCode,
  rates: CurrencyInfo[]
): number => {
  if (sourceCode === targetCode) return amount

  const getRateInfo = (code: CurrencyCode) => {
    if (code === 'RUB') return { value: 1, nominal: 1 }
    const rate = rates.find((r) => r.CharCode === code)
    return {
      value: rate?.Value ?? 0,
      nominal: rate?.Nominal ?? 1,
    }
  }

  const source = getRateInfo(sourceCode)
  const target = getRateInfo(targetCode)

  if (source.value === 0 || target.value === 0) return 0

  // Формула: (Сумма * (Курс_исх / Ном_исх)) / (Курс_цел / Ном_цел)
  return (amount * (source.value / source.nominal)) / (target.value / target.nominal)
}
