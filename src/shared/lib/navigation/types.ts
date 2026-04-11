export type CalculatorStackParamList = {
  CalculatorsList: undefined
  SimpleCalculatorPage: undefined
  ExchangePage: undefined
  PercentagePage: undefined
  CreditPage: undefined
  MortgagePage: undefined
  SavingsPage: undefined
  TaxPage: undefined
  PropertyTaxDeductionPage: undefined
  VacationPage: undefined
}

export type RootParamList = {
  HomePage: undefined
  Settings: undefined
  Calculators: undefined
  Converter: undefined
}

export type AllScreensParamList = RootParamList & CalculatorStackParamList
