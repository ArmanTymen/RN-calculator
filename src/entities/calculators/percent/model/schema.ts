import { z } from 'zod'

// 1. Создаем массив ключей, чтобы использовать его в нескольких местах
export const PERCENT_OPERATION_KEYS = [
  'percent_of_number',
  'percentage_ratio',
  'add_percent',
  'subtract_percent',
  'greater_than_percent',
  'less_than_percent',
  'find_100_percent',
] as const

export const percentOperationSchema = z.enum(PERCENT_OPERATION_KEYS)

export const percentFormSchema = z.object({
  // Используем массив ключей для валидации
  operationType: z.enum(PERCENT_OPERATION_KEYS),
  val1: z.coerce.number({ message: 'Введите число' }).default(0),
  val2: z.coerce.number({ message: 'Введите число' }).default(0),
  decimals: z.coerce.number({ message: '0-10' }).min(0).max(10).default(2),
})

export type PercentFormInput = z.input<typeof percentFormSchema>
export type PercentFormOutput = z.output<typeof percentFormSchema>
export type PercentOperation = z.infer<typeof percentOperationSchema>
