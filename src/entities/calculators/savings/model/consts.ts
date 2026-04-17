import { CurrencyCode, DurationUnit } from './types'

export const CURRENCIES: { label: string; value: CurrencyCode }[] = [
  { label: '₽', value: 'RUB' },
  { label: '$', value: 'USD' },
  { label: '€', value: 'EUR' },
  { label: '¥', value: 'CNY' },
]

export const DURATION_UNITS: { label: string; value: DurationUnit }[] = [
  { label: 'Дни', value: 'days' },
  { label: 'Месяцы', value: 'months' },
  { label: 'Годы', value: 'years' },
] as const
