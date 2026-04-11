import { z } from 'zod'
import { baseLoanSchema } from '@/entities/loan/model'

export const deductionsSchema = z.object({
  isMarried: z.boolean(),
})

export const mortgageFormSchema = baseLoanSchema
  .omit({ paymentType: true })
  .extend({
    propertyPrice: z.number().positive('Стоимость недвижимости должна быть больше 0'),
    downPayment: z.number().min(0, 'Взнос не может быть отрицательным'),
    years: z.coerce
      .number()
      .int()
      .positive('Срок должен быть больше 0')
      .max(50, 'Максимальный срок 50 лет'),
    deductions: deductionsSchema,
  })
  .refine((data) => data.downPayment < data.propertyPrice, {
    message: 'Первоначальный взнос не может быть больше или равен стоимости',
    path: ['downPayment'], // Ошибка привяжется к полю downPayment в UI
  })

export type MortgageFormInput = z.input<typeof mortgageFormSchema>
export type MortgageFormOutPut = z.output<typeof mortgageFormSchema>
