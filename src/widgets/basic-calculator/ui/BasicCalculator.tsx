// src/widgets/basic-calculator/ui/BasicCalculator.tsx
import React, { useCallback, useMemo, useReducer } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { CalculatorButton, CalculatorDisplay } from '@/features/basic-calculator-form'
import {
  BUTTONS_CONFIG,
  CalculatorAction,
  calculatorReducer,
  initialState,
} from '@/entities/calculator'

export const BasicCalculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  const { width } = useWindowDimensions()
  const buttonSize = (width - 40 - 48) / 4

  const handlePress = useCallback((action: CalculatorAction) => {
    dispatch(action)
  }, [])

  const flatButtons = useMemo(() => BUTTONS_CONFIG.flat(), [])

  return (
    <View className="flex-1">
      <CalculatorDisplay equation={state.equation} display={state.display} />

      <View className="flex-row flex-wrap gap-4 px-5 pb-8">
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {flatButtons.map((btn, index) => (
            <View key={index} style={{ width: btn.colSpan === 2 ? '48%' : '22%' }}>
              <CalculatorButton
                label={typeof btn.label === 'function' ? btn.label(state) : btn.label}
                onClick={() => handlePress(btn.action)}
                textClass={btn.textClass}
                containerClass={btn.containerClass}
                colSpan={btn.colSpan}
                size={buttonSize}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
