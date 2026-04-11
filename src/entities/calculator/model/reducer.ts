import { calculate } from '@/shared/lib/calculate-math/math'
import type { CalculatorAction, CalculatorState } from './types'
import Big from 'big.js'

export const initialState: CalculatorState = {
  display: '0',
  prevValue: null,
  operator: null,
  waitingForNext: false,
  isError: false,
  equation: '',
}

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  if (state.isError && action.type !== 'CLEAR') return state

  switch (action.type) {
    case 'DIGIT': {
      const nextDigit = action.payload
      const isNewInput = state.waitingForNext || state.display === '0'
      const newDisplay = isNewInput ? nextDigit : state.display + nextDigit

      // Если мы уже в процессе операции (есть первый операнд и знак),
      // формируем полную строку: "25 + 24"
      const newEquation = state.operator
        ? `${state.prevValue} ${state.operator} ${newDisplay}`
        : state.equation

      return {
        ...state,
        display: newDisplay,
        waitingForNext: false,
        equation: newEquation,
      }
    }

    case 'OPERATOR': {
      // Логика цепочки: 25 + 24 -> нажал "-" -> стало 49 и ждем дальше
      if (state.operator && state.prevValue !== null && !state.waitingForNext) {
        try {
          const result = calculate(state.prevValue, state.display, state.operator)
          return {
            ...state,
            display: result,
            prevValue: result,
            operator: action.payload,
            waitingForNext: true,
            equation: `${result} ${action.payload}`, // В ряду теперь: "49 -"
          }
        } catch {
          return { ...initialState, display: 'Error', isError: true }
        }
      }

      // Первая операция: 25 -> нажал "+" -> стало "25 +"
      return {
        ...state,
        operator: action.payload,
        prevValue: state.display,
        waitingForNext: true,
        equation: `${state.display} ${action.payload}`,
      }
    }

    case 'EQUALS': {
      if (!state.operator || state.prevValue === null) return state
      try {
        const result = calculate(state.prevValue, state.display, state.operator)
        return {
          ...initialState,
          display: result,
          waitingForNext: true,
          equation: '', // iOS очищает верхнюю строку после "="
        }
      } catch {
        return { ...initialState, display: 'Error', isError: true }
      }
    }

    case 'CLEAR':
      return initialState

    case 'DOT': {
      const newDisplay = state.waitingForNext
        ? '0.'
        : state.display.includes('.')
          ? state.display
          : state.display + '.'
      const newEquation = state.operator
        ? `${state.prevValue} ${state.operator} ${newDisplay}`
        : state.equation
      return { ...state, display: newDisplay, waitingForNext: false, equation: newEquation }
    }
    case 'NEGATE':
      if (state.display === '0') return state

      return {
        ...state,
        display: state.display.startsWith('-') ? state.display.slice(1) : '-' + state.display,
      }

    case 'PERCENT':
      try {
        const current = new Big(state.display)

        if (state.prevValue !== null) {
          const base = new Big(state.prevValue)
          const result = base.times(current).div(100)

          return {
            ...state,
            display: result.toString(),
            waitingForNext: true,
          }
        }

        return {
          ...state,
          display: current.div(100).toString(),
        }
      } catch {
        return { ...initialState, display: 'Error', isError: true }
      }

    default:
      return state
  }
}
