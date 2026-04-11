export type IncomeType = 'salary' | 'dividends' | 'property_sale'

export interface NdflFormValues {
  incomeType: IncomeType
  income: number
  incomeMode: 'gross' | 'net'
  taxDeduction: number
  isNonResident: boolean
  isSpecialCategory: boolean // Те самые категории из 2-го скрина
  hasDistrictCoefficient: boolean // Районный коэффициент из 3-го скрина
  districtCoefficient: number
  northernBonus: number
}
