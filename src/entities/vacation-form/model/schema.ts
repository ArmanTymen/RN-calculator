import z from 'zod'

export const vacationTypeSchema = z.object({
  hiringDate: z.coerce.date({ message: 'Неверная дата' }).default(() => new Date()),
  calculationDate: z.coerce.date({ message: 'Неверная дата' }).default(() => new Date()),

  excludedDays: z.coerce.number({ message: 'Введите число' }).min(0, 'Не может быть меньше 0'),

  annualVacationDays: z.coerce
    .number({ message: 'Введите число' })
    .min(0, 'Минимум 0')
    .max(365, 'В году всего 365 дней'),

  usedDays: z.coerce.number({ message: 'Введите число' }).min(0, 'Минимум 0'),

  averageEarnings: z.coerce
    .number({ message: 'Введите сумму' })
    .min(0, 'Заработок не может быть отрицательным'),
})

export type VacationFormInput = z.input<typeof vacationTypeSchema>
export type VacationFormOutput = z.output<typeof vacationTypeSchema> // Исправлено OutPut -> Output
