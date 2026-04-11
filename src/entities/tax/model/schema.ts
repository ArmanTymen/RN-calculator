import { z } from 'zod'

export const incomeTypeSchema = z.enum(['salary', 'dividends', 'property_sale'])
export const incomeModeTypeSchema = z.enum(['gross', 'net'])

export const taxTypeSchema = z.object({
  incomeType: incomeTypeSchema,

  income: z.coerce
    .number({ message: 'Введите сумму дохода' })
    .min(0, 'Доход не может быть отрицательным')
    .max(1_000_000_000, 'Слишком большая сумма'),

  incomeMode: incomeModeTypeSchema,

  taxDeduction: z.coerce
    .number({ message: 'Введите сумму вычета' })
    .min(0, 'Вычет не может быть отрицательным'),

  isNonResident: z.boolean(),

  isSpecialCategory: z.boolean(),

  hasDistrictCoefficient: z.boolean(),

  // Коэффициент — это множитель, он не может быть меньше 1
  districtCoefficient: z.coerce
    .number({ message: 'Введите коэффициент' })
    .min(1, 'Минимальный коэффициент — 1')
    .max(3, 'Слишком высокий коэффициент'),

  // Северная надбавка обычно в процентах
  northernBonus: z.coerce
    .number({ message: 'Введите % надбавки' })
    .min(0, 'Надбавка не может быть меньше 0%')
    .max(100, 'Надбавка не может превышать 100%'),
})

export type TaxFormInput = z.input<typeof taxTypeSchema>
export type TaxFormOutPut = z.output<typeof taxTypeSchema>
