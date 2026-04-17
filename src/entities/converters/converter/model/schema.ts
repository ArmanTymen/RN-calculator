import { z } from 'zod'
import { UNITS_DATA } from './constants'

// 1. Системы и Категории
export const SYSTEMS = ['metric', 'imperial', 'us_customary', 'digital', 'scientific'] as const
export type SystemType = (typeof SYSTEMS)[number]

export const CATEGORIES = [
  'length',
  'mass',
  'volume',
  'temperature',
  'digital_data',
  'time',
] as const
export type CategoryType = (typeof CATEGORIES)[number]

// 2. Определение Юнита
export interface UnitDefinition {
  id: string
  label: string
  shortLabel: string
  category: CategoryType
  system: SystemType
  multiplier: number
  offset: number
}

// 3. Динамическое получение ID из объекта данных для Zod
// Важно: чтобы z.enum работал, нам нужен кортеж (tuple) [string, ...string[]]
const allUnitIds = Object.keys(UNITS_DATA) as [string, ...string[]]
export const unitIdSchema = z.enum(allUnitIds)
export type UnitId = z.infer<typeof unitIdSchema>

// 4. Схемы валидации
export const converterFormSchema = z
  .object({
    inputValue: z.coerce
      .number({ message: 'Введите число' })
      .min(0, 'Значение не может быть отрицательным'),

    category: z.enum(CATEGORIES),
    fromUnit: unitIdSchema,
  })
  // Мы убрали toUnit из базовой схемы, так как делаем bulk-конвертацию (все сразу),
  // но оставили валидацию соответствия категории для выбранного входного юнита.
  .refine(
    (data) => {
      const unit = UNITS_DATA[data.fromUnit as UnitId]
      return unit?.category === data.category
    },
    {
      message: 'Выбранный юнит не соответствует текущей категории',
      path: ['fromUnit'],
    }
  )

// Типы для стейта и форм
// z.input - то, что приходит в парсер (может быть unknown из-за coerce)
export type ConverterFormInput = z.input<typeof converterFormSchema>
// z.infer - чистый результат после парсинга (числа будут числами)
export type ConverterFormOutput = z.infer<typeof converterFormSchema>

// 5. Интерфейсы результатов
export interface ConversionResult {
  id: UnitId
  label: string
  shortLabel: string
  convertedValue: string
  system: SystemType
}

// 6. Маппинг заголовков
export const CATEGORY_LABELS: Record<CategoryType, string> = {
  length: 'Длина',
  mass: 'Вес и Масса',
  volume: 'Объем',
  temperature: 'Температура',
  digital_data: 'Данные',
  time: 'Время',
}
