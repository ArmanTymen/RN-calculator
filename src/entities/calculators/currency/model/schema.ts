import { z } from 'zod'

export const currencyCodeSchema = z.enum(['RUB', 'USD', 'EUR', 'CNY'])

export const currencyInfoSchema = z.object({
  ID: z.string(),
  NumCode: z.string(),
  CharCode: z.string(),
  Nominal: z.coerce.number(),
  Name: z.string(),
  Value: z.coerce.number(),
  Previous: z.coerce.number(),
})

// 3. Схема ответа API (используем record для динамических ключей)
export const currencyResponseSchema = z.object({
  // Ключ - CharCode (строка), Значение - объект currencyInfoSchema
  Valute: z.record(z.string(), currencyInfoSchema),
})

// 4. Опция для выпадающего списка (UI)
export const currencyOptionSchema = z.object({
  code: currencyCodeSchema,
  label: z.string(),
  flag: z.string(),
})

export const currencyConverterFormSchema = z.object({
  amount: z.coerce.number({ message: 'Введите сумму' }).positive('Сумма должна быть больше 0'),

  sourceCurrency: currencyCodeSchema,
  targetCurrency: currencyCodeSchema,

  rateDate: z.coerce.date({ message: 'Выберите дату' }).default(() => new Date()),
})

export type CurrencyConverterFormInput = z.input<typeof currencyConverterFormSchema>

// Выходные типы (для логики расчета)
export type CurrencyConverterFormOutPut = z.output<typeof currencyConverterFormSchema>

// Дополнительные типы из схем
export type CurrencyCode = z.infer<typeof currencyCodeSchema>
export type CurrencyInfo = z.infer<typeof currencyInfoSchema>
export type CurrencyResponse = z.infer<typeof currencyResponseSchema>
export type CurrencyOption = z.infer<typeof currencyOptionSchema>
