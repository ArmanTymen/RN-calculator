export interface OperationConfig {
  title: string
  description: string
  formula: string
  example: string
  label1: string
  label2: string
  resultSuffix?: string
  calculate: (val1: number, val2: number, decimals: number) => number | null
}

export type PercentOperation =
  | 'percent_of_number'
  | 'percentage_ratio'
  | 'add_percent'
  | 'subtract_percent'
  | 'greater_than_percent'
  | 'less_than_percent'
  | 'find_100_percent'
