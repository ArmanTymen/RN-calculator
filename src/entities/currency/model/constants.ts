//src/entities/currency/model
import { CurrencyOption } from './types'

export const CURRENCIES: CurrencyOption[] = [
  { code: 'RUB', label: 'Российский рубль', flag: '🇷🇺' },
  { code: 'USD', label: 'Доллар США', flag: '🇺🇸' },
  { code: 'EUR', label: 'Евро', flag: '🇪🇺' },
  { code: 'CNY', label: 'Китайский юань', flag: '🇨🇳' },
]
export const TODAY = new Date()
// src/entities/currency/model/constants.ts

/**
 * Сравнение дат без учета времени (по локальному времени пользователя)
 */
export const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

/**
 * Для формирования ключа кэша в TanStack Query
 * лучше использовать локальную дату, а не ISO
 */
export const getLocalDateKey = (date: Date): string => {
  const validDate = date instanceof Date ? date : new Date()
  const year = validDate.getFullYear()
  const month = String(validDate.getMonth() + 1).padStart(2, '0')
  const day = String(validDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
