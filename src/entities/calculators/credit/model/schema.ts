import {
  baseLoanSchema,
  earlyRepaymentSchema,
  refinanceSchema,
} from '@/entities/calculators/loan/model'
import { z } from 'zod'

export const paymentTypeSchema = z.enum(['annuity', 'differentiated'])
export const earlyRepaymentStrategySchema = z.enum(['reduce_term', 'reduce_payment'])

// 1. Добавили coerce для ставки
export const baseCreditSchema = z.object({
  annualRate: z.coerce
    .number({ message: 'Введите число' }) // Ошибка, если ввели дичь
    .positive('Ставка должна быть больше 0') // Ошибка, если 0 или минус
    .max(100, 'Ставка не может превышать 100%'),
  paymentType: paymentTypeSchema,
  earlyRepayments: z.array(earlyRepaymentSchema),
})

export const creditFormSchema = baseLoanSchema.extend({
  // 2. Вернули .positive()
  amount: z.coerce
    .number({ message: 'Введите число' })
    .positive('Сумма кредита должна быть больше 0'),
  // 3. Вернули .int() (месяцы не могут быть дробными) и .positive()
  months: z.coerce
    .number({ message: 'Введите число' })
    .int('Срок должен быть целым числом')
    .positive('Срок должен быть больше 0'),
  refinance: refinanceSchema,
})

export type CreditFormInput = z.input<typeof creditFormSchema>
export type CreditFormOutPut = z.output<typeof creditFormSchema>

export type PaymentType = z.infer<typeof paymentTypeSchema>
export type EarlyRepayment = z.infer<typeof earlyRepaymentSchema>
export type Refinance = z.infer<typeof refinanceSchema>

export type CreditFormValues = CreditFormInput
export type CalculateScheduleParams = CreditFormOutPut
