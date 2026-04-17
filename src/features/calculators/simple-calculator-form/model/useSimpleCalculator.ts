// src/features/calculators/simple-calculator-form/useSimpleCalculator.ts
import { useCalculatorStore } from '@/entities/calculators/simple-calculator/model/store'

export const useSimpleCalculator = () => {
  const state = useCalculatorStore((state) => state)
  const handlePress = useCalculatorStore((state) => state.dispatch)

  return {
    state,
    handlePress,
  }
}
