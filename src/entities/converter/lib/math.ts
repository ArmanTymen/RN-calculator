//src/entities/converter/lib
import { type ConversionType, type ConversionResult } from '../model/types'

export const calculateConversion = (value: number, type: ConversionType): ConversionResult => {
  if (!value || value <= 0) {
    return { result: 0, unitLabel: '' }
  }

  let result = 0
  let unitLabel = ''

  switch (type) {
    case 'mi_to_km':
      result = value * 1.60934
      unitLabel = 'км'
      break
    case 'km_to_mi':
      result = value / 1.60934
      unitLabel = 'миль'
      break
    case 'ft_to_m':
      result = value * 0.3048
      unitLabel = 'м'
      break
    case 'm_to_ft':
      result = value / 0.3048
      unitLabel = 'футов'
      break
    case 'lb_to_kg':
      result = value * 0.453592
      unitLabel = 'кг'
      break
    case 'kg_to_lb':
      result = value / 0.453592
      unitLabel = 'фунтов'
      break
  }

  return {
    result: Math.round(result * 10000) / 10000,
    unitLabel,
  }
}
