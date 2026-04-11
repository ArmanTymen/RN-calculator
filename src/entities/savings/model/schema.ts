import { z } from 'zod'

export const durationUnitTypeSchema = z.enum(['days', 'months', 'years'])
export const interestRateTypeTypeSchema = z.enum(['fixed', 'depends_on_amount', 'depends_on_term'])
export const payoutFrequencyTypeSchema = z.enum([
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'half_yearly',
  'yearly',
  'end_of_term',
])
export const currencyCodeTypeTypeSchema = z.enum(['RUB', 'USD', 'EUR', 'CNY'])

export const savingsFormValuesSchema = z.object({
  // 1. Для чисел: указываем сообщение на случай, если ввод не является числом
  // и добавляем логические ограничения (.positive, .min, .max)
  depositAmount: z.coerce
    .number({
      message: 'Введите число',
    })
    .positive('Сумма должна быть больше 0')
    .max(100_000_000, 'Слишком большая сумма'),

  currency: currencyCodeTypeTypeSchema, // Enum обычно не требует спец. сообщения, если есть дефолт

  duration: z.coerce
    .number({ message: 'Введите число' })
    .int('Срок должен быть целым числом')
    .positive('Срок должен быть больше 0'),

  durationUnit: durationUnitTypeSchema,

  interestRateType: interestRateTypeTypeSchema,

  interestRate: z.coerce
    .number({ message: 'Введите число' })
    .min(0, 'Ставка не может быть отрицательной')
    .max(100, 'Ставка не может превышать 100%'),

  isCapitalization: z.boolean(),

  payoutFrequency: payoutFrequencyTypeSchema,

  limit: z.coerce.number({ message: 'Введите число' }).min(0, 'Лимит не может быть отрицательной'),
})

export type SavingsFormInput = z.input<typeof savingsFormValuesSchema>
export type SavingsFormOutPut = z.output<typeof savingsFormValuesSchema>
