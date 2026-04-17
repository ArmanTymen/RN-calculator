// src/entities/vacation-form/model/schema.ts
import z from 'zod'

export const excludedPeriodSchema = z.object({
  id: z.string(),
  startDate: z.coerce.date({ message: 'Обязательно' }),
  endDate: z.coerce.date({ message: 'Обязательно' }),
  comment: z.string().optional(),
})

export const vacationTypeSchema = z.object({
  hiringDate: z.coerce.date({ message: 'Неверная дата' }).default(() => new Date()),
  calculationDate: z.coerce.date({ message: 'Неверная дата' }).default(() => new Date()),
  excludedPeriods: z.array(excludedPeriodSchema).default([]),
  annualVacationDays: z.coerce.number({ message: 'Введите число' }).min(0).max(365),
  usedDays: z.coerce.number().min(0),
  averageEarnings: z.coerce.number().min(0),
})

export type ExcludedPeriod = z.infer<typeof excludedPeriodSchema>

// Для формы (может быть "грязным")
export type VacationFormInput = z.input<typeof vacationTypeSchema>

// ДЛЯ ВСЕГО ОСТАЛЬНОГО (Чистые данные)
export type VacationFormData = z.infer<typeof vacationTypeSchema>
