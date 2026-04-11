import { z } from 'zod'

export const percentOperationSchema = z.enum([
  'percent_of_number',
  'percentage_ratio',
  'add_percent',
])

export const percentFormSchema = z.object({
  operationType: z.enum(['percent_of_number', 'percentage_ratio', 'add_percent']),
  val1: z.coerce.number({ message: 'Введите число' }).min(0, 'Минимум 0'),
  val2: z.coerce.number({ message: 'Введите число' }).min(0, 'Минимум 0'),
  decimals: z.coerce.number({ message: '0-10' }).min(0).max(10),
})

// Тип того, что Zod получает на вход (тут будут unknown из-за coerce)
export type PercentFormInput = z.input<typeof percentFormSchema>

// Тип того, что Zod выдает после валидации (тут будут чистые number)
export type PercentFormOutput = z.output<typeof percentFormSchema>

export type PercentOperation = z.output<typeof percentOperationSchema>
