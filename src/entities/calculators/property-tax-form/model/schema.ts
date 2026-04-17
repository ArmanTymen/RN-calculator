import { z } from 'zod'

// 1. Схема элемента массива — выносим, чтобы на неё можно было ссылаться
const yearlyIncomeSchema = z.object({
  year: z.coerce.number({ message: 'Введите год' }).int().min(1900).max(2100),
  value: z.coerce.number({ message: 'Введите сумму' }).min(0, 'Минимум 0'),
})

// 2. Основная схема
export const propertyTaxFormSchema = z.object({
  propertyValue: z.coerce
    .number({ message: 'Введите стоимость' })
    .positive('Стоимость должна быть больше 0'),

  purchaseYear: z.coerce.number({ message: 'Введите год' }).int().min(1900, 'Некорректный год'),

  updatePurchaseYear: z.coerce
    .number({ message: 'Введите год' })
    .int()
    .min(1900, 'Некорректный год'),
  isPreviouslyUsed: z.boolean().default(false),

  alreadyReceivedAmount: z.coerce.number({ message: 'Введите сумму' }).min(0, 'Минимум 0'),

  // Массив объектов теперь валидируется строго по схеме выше
  yearlyIncomes: z.array(yearlyIncomeSchema),
})

// 3. Типы для внешней работы (Хуки, Сторы)
export type PropertyTaxFormInput = z.input<typeof propertyTaxFormSchema>
export type PropertyTaxFormOutput = z.output<typeof propertyTaxFormSchema>

// Тип для отдельного элемента (пригодится для useFieldArray)
export type YearlyIncomeInput = z.input<typeof yearlyIncomeSchema>
