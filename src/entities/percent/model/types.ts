export interface OperationConfig {
  title: string
  description: string
  formula: string
  label1: string
  label2: string
  resultSuffix?: string
  calculate: (val1: number, val2: number, decimals: number) => number | null
}
