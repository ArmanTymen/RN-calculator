//src/entities/currency/api
import { api } from '@/shared/api/axios'
import { CurrencyResponse } from '../model'

const getCbrUrl = (date?: Date): string => {
  if (!date) return '/daily_json.js'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)

  // Если дата сегодня или в будущем — отдаем текущий курс
  if (targetDate.getTime() >= today.getTime()) {
    return '/daily_json.js'
  }

  // Форматируем год, месяц и день с ведущими нулями
  const year = targetDate.getFullYear()
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const day = String(targetDate.getDate()).padStart(2, '0')

  return `/archive/${year}/${month}/${day}/daily_json.js`
}

export const fetchCurrencyRates = async (date?: Date): Promise<CurrencyResponse> => {
  const url = getCbrUrl(date)
  const { data } = await api.get<CurrencyResponse>(url)
  return data
}
