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

export const savingsTransactionSchema = z.object({
  id: z.string(),
  date: z.coerce.date({ message: 'Выберите дату' }).default(() => new Date()),
  amount: z.coerce.number().positive('Сумма должна быть больше 0'),
})
export const savingsFormValuesSchema = z.object({
  depositAmount: z.coerce
    .number({
      message: 'Введите число',
    })
    .positive('Сумма должна быть больше 0')
    .max(100_000_000, 'Слишком большая сумма'),

  currency: currencyCodeTypeTypeSchema,

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
  replenishments: z.array(savingsTransactionSchema).default([]),
  withdrawals: z.array(savingsTransactionSchema).default([]),
})

export type SavingsTransaction = z.infer<typeof savingsTransactionSchema>
export type SavingsFormInput = z.input<typeof savingsFormValuesSchema>
export type SavingsFormOutPut = z.output<typeof savingsFormValuesSchema>
