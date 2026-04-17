export type DurationUnit = 'days' | 'months' | 'years'
export type InterestRateType = 'fixed' | 'depends_on_amount' | 'depends_on_term'
export type PayoutFrequency =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'half_yearly'
  | 'yearly'
  | 'end_of_term'
export type CurrencyCode = 'RUB' | 'USD' | 'EUR' | 'CNY'

export interface SavingsFormValues {
  depositAmount: number
  currency: CurrencyCode
  duration: number
  durationUnit: DurationUnit
  interestRateType: InterestRateType
  interestRate: number
  isCapitalization: boolean
  payoutFrequency: PayoutFrequency
  limit: number
}
