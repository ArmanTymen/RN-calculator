export type ConversionType =
  | 'mi_to_km'
  | 'km_to_mi'
  | 'ft_to_m'
  | 'm_to_ft'
  | 'lb_to_kg'
  | 'kg_to_lb'

export interface ConverterFormValues {
  inputValue: number
  conversionType: ConversionType
}

export interface ConversionResult {
  result: number
  unitLabel: string
}
