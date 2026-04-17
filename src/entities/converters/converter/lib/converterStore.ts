import { UNITS_DATA } from '../model'

export const convertUnits = (value: number, fromId: string, toId: string): number => {
  const fromUnit = UNITS_DATA[fromId]
  const toUnit = UNITS_DATA[toId]

  if (!fromUnit || !toUnit || fromUnit.category !== toUnit.category) {
    throw new Error('Некорректная пара единиц измерения')
  }

  // 1. Переводим в базовую единицу: (Value + Offset) * Multiplier
  const baseValue = (value + fromUnit.offset) * fromUnit.multiplier

  // 2. Переводим из базовой в целевую: (Base / Multiplier) - Offset
  const result = baseValue / toUnit.multiplier - toUnit.offset

  return Number(result.toFixed(4))
}

// Пример селектора для UI: получение списка единиц по категории
export const getUnitsByCategory = (category: string) =>
  Object.values(UNITS_DATA).filter((u) => u.category === category)
