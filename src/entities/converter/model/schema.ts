import { z } from 'zod'

export const converterTypeSchema = z.enum([
  'mi_to_km',
  'km_to_mi',
  'ft_to_m',
  'm_to_ft',
  'lb_to_kg',
  'kg_to_lb',
])

export const converterFormSchema = z.object({
  inputValue: z.coerce
    .number({ message: 'Введите число' })
    .min(0, 'Значение не может быть отрицательным'), // Для веса/длины актуально

  conversionType: converterTypeSchema,
})

// ИСПРАВЛЕНО: OutPut -> Output
export type ConverterFormInput = z.input<typeof converterFormSchema>
export type ConverterFormOutPut = z.output<typeof converterFormSchema>

export type ConversionType = z.infer<typeof converterTypeSchema>
