// src/entities/calculators/simple-calculator/model/reducer.ts
import { CalcOperator, calculate } from '@/entities/calculators/simple-calculator/model/math'
import Big from 'big.js'
import { CalculatorAction, CalculatorState } from './types'

export const initialState: CalculatorState = {
  display: '0',
  prevValue: null,
  operator: null,
  waitingForNext: false,
  isError: false,
  equation: '',
  history: [], // Инициализация истории
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
      if (state.operator && state.prevValue !== null && !state.waitingForNext) {
        try {
          const result = calculate(state.prevValue, state.display, state.operator)
          return {
            ...state,
            display: result,
            prevValue: result,
            operator: action.payload as CalcOperator,
            waitingForNext: true,
            equation: `${result} ${action.payload}`,
          }
        } catch {
          return { ...initialState, display: 'Error', isError: true, history: state.history }
        }
      }

      return {
        ...state,
        operator: action.payload as CalcOperator,
        prevValue: state.display,
        waitingForNext: true,
        equation: `${state.display} ${action.payload}`,
      }
    }

    case 'EQUALS': {
      if (!state.operator || state.prevValue === null) return state
      try {
        const result = calculate(state.prevValue, state.display, state.operator)

        // Формируем новую запись для истории
        const newHistoryItem = {
          id: Date.now().toString(),
          equation: `${state.prevValue} ${state.operator} ${state.display}`,
          result,
        }

        return {
          ...initialState,
          display: result,
          waitingForNext: true,
          equation: '',
          // Добавляем новую запись и берем последние 3 элемента
          history: [...state.history, newHistoryItem].slice(-3),
        }
      } catch {
        return { ...initialState, display: 'Error', isError: true, history: state.history }
      }
    }

    case 'CLEAR':
      return { ...initialState, history: state.history } // При очистке сохраняем историю

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
        return { ...initialState, display: 'Error', isError: true, history: state.history }
      }

    default:
      return state
  }
}
