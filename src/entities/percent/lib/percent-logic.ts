import { OperationConfig, PercentOperation } from '@/entities/percent'

export const PERCENT_OPERATIONS: Record<PercentOperation, OperationConfig> = {
  percent_of_number: {
    title: 'Найти процент от числа',
    description: 'Рассчитывает указанную долю (в процентах) от заданного числа.',
    formula: 'Результат = (Число × Процент) / 100',
    label1: 'Процент (%)',
    label2: 'От числа',
    calculate: (percent, number, decimals) => {
      if (!percent || !number) return null
      const result = (number * percent) / 100
      return Number(result.toFixed(decimals))
    },
  },
  percentage_ratio: {
    title: 'Сколько процентов составляет число от числа',
    description: 'Показывает, какую часть (в процентах) одно число составляет от другого.',
    formula: 'Результат = (Число 1 / Число 2) × 100',
    label1: 'Число 1',
    label2: 'От числа 2',
    resultSuffix: '%',
    calculate: (val1, val2, decimals) => {
      if (!val1 || !val2 || val2 === 0) return null
      const result = (val1 / val2) * 100
      return Number(result.toFixed(decimals))
    },
  },
  add_percent: {
    title: 'Прибавить процент к числу',
    description: 'Увеличивает число на заданный процент.',
    formula: 'Результат = Число + (Число × Процент / 100)',
    label1: 'Число',
    label2: 'Процент (%)',
    calculate: (num, pct, decimals) => {
      if (!num || !pct) return null
      const result = num + (num * pct) / 100
      return Number(result.toFixed(decimals))
    },
  },
}
