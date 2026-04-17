import { PercentOperation } from '../model'
import { OperationConfig } from '../model/types'

export const PERCENT_OPERATIONS: Record<PercentOperation, OperationConfig> = {
  percent_of_number: {
    title: 'Найти процент от числа',
    description: 'Разделите число на 100 и умножьте на количество процентов.',
    formula: 'Результат = (Число × Процент) / 100',
    example: '30% от 200: (200 × 30) / 100 = 60',
    label1: 'Процент (%)',
    label2: 'От числа',
    calculate: (pct: number, num: number, dec: number) =>
      num && pct ? Number(((num * pct) / 100).toFixed(dec)) : null,
  },
  percentage_ratio: {
    title: 'Сколько % составляет число',
    description: 'Разделите первое число на второе и умножьте на 100%.',
    formula: 'Результат = (Число 1 / Число 2) × 100',
    example: '12 от 30: (12 / 30) × 100 = 40%',
    label1: 'Число 1',
    label2: 'От числа 2',
    resultSuffix: '%',
    calculate: (v1: number, v2: number, dec: number) =>
      v1 && v2 ? Number(((v1 / v2) * 100).toFixed(dec)) : null,
  },
  add_percent: {
    title: 'Прибавить процент',
    description: 'Увеличивает число на заданную долю.',
    formula: 'Результат = Число × (1 + Процент / 100)',
    example: '200 + 30%: 200 × 1.3 = 260',
    label1: 'Число',
    label2: 'Процент (%)',
    calculate: (num: number, pct: number, dec: number) =>
      num && pct ? Number((num * (1 + pct / 100)).toFixed(dec)) : null,
  },
  subtract_percent: {
    title: 'Вычесть процент',
    description: 'Уменьшает число на заданную долю (скидка).',
    formula: 'Результат = Число × (1 - Процент / 100)',
    example: '30 000 - 5%: 30 000 × 0.95 = 28 500',
    label1: 'Число',
    label2: 'Процент (%)',
    calculate: (num: number, pct: number, dec: number) =>
      num && pct ? Number((num * (1 - pct / 100)).toFixed(dec)) : null,
  },
  greater_than_percent: {
    title: 'На сколько % больше',
    description: 'Вычисляет разницу в процентах относительно второго числа.',
    formula: 'Результат = (Число 1 / Число 2) × 100 - 100',
    example: '50к против 35к: (50/35)*100 - 100 = 43%',
    label1: 'Число 1',
    label2: 'Больше числа 2',
    resultSuffix: '%',
    calculate: (v1: number, v2: number, dec: number) =>
      v1 && v2 ? Number(((v1 / v2) * 100 - 100).toFixed(dec)) : null,
  },
  less_than_percent: {
    title: 'На сколько % меньше',
    description: 'Вычисляет нехватку первого числа до второго в процентах.',
    formula: 'Результат = 100 - (Число 1 / Число 2) × 100',
    example: '5 меньше 20: 100 - (5/20)*100 = 75%',
    label1: 'Число 1',
    label2: 'Меньше числа 2',
    resultSuffix: '%',
    calculate: (v1: number, v2: number, dec: number) =>
      v1 && v2 ? Number((100 - (v1 / v2) * 100).toFixed(dec)) : null,
  },
  find_100_percent: {
    title: 'Найти 100%',
    description: 'Находит целое, зная значение части и её процент.',
    formula: 'Результат = Число / (Процент / 100)',
    example: 'Если 25% это 7: 7 / 0.25 = 28',
    label1: 'Число',
    label2: 'Это сколько (%)',
    calculate: (val: number, pct: number, dec: number) =>
      val && pct ? Number((val / (pct / 100)).toFixed(dec)) : null,
  },
}
