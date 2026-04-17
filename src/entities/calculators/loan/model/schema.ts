import { z } from 'zod'

export const paymentTypeSchema = z.enum(['annuity', 'differentiated'])
export const earlyRepaymentStrategySchema = z.enum(['reduce_term', 'reduce_payment'])

export const earlyRepaymentSchema = z.object({
  id: z.string().uuid('Некорректный ID'),
  month: z.number().int().positive('Месяц должен быть положительным'),
  amount: z.number().positive('Сумма досрочного платежа должна быть больше 0'),
  strategy: earlyRepaymentStrategySchema,
})

export const refinanceSchema = z.object({
  enabled: z.boolean(),
  atMonth: z.number().int().min(0, 'Месяц рефинансирования не может быть отрицательным'),
  newRate: z.number().min(0).max(100, 'Ставка не может превышать 100%'),
  newMonths: z.number().int().min(1, 'Срок должен быть минимум 1 месяц'),
})

export const baseLoanSchema = z.object({
  annualRate: z.number().positive().max(100),
  paymentType: paymentTypeSchema,
  earlyRepayments: z.array(earlyRepaymentSchema),
})
