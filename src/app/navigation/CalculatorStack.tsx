import { createStackNavigator } from '@react-navigation/stack'
import { Calculators } from '@/pages/calculators/calculators-list-page'
import { SimpleCalculatorPage } from '@/pages/calculators/simple-calculator-page'
import { CreditPage } from '@/pages/calculators/credit-page'
import { ExchangePage } from '@/pages/calculators/currency-converter-page'
import { MortgagePage } from '@/pages/calculators/mortgage-page'
import { PercentagePage } from '@/pages/calculators/percentage-page'
import { SavingsPage } from '@/pages/calculators/savings-page/ui/SavingsPage'
import { TaxPage } from '@/pages/calculators/tax-page'
import { VacationPage } from '@/pages/calculators/vacation-page'
import { CalculatorStackParamList } from '@/shared/lib/navigation/types'
import { PropertyTaxDeductionPage } from '@/pages/calculators/property-tax-page'

const Stack = createStackNavigator<CalculatorStackParamList>()

export const CalculatorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalculatorsList" component={Calculators} />
      <Stack.Screen name="SimpleCalculatorPage" component={SimpleCalculatorPage} />
      <Stack.Screen name="CreditPage" component={CreditPage} />
      <Stack.Screen name="ExchangePage" component={ExchangePage} />
      <Stack.Screen name="MortgagePage" component={MortgagePage} />
      <Stack.Screen name="PercentagePage" component={PercentagePage} />
      <Stack.Screen name="SavingsPage" component={SavingsPage} />
      <Stack.Screen name="TaxPage" component={TaxPage} />
      <Stack.Screen name="PropertyTaxDeductionPage" component={PropertyTaxDeductionPage} />
      <Stack.Screen name="VacationPage" component={VacationPage} />
    </Stack.Navigator>
  )
}
