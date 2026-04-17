// src/entities/calculators/simple-calculator/model/types.ts
import { CalcOperator } from './math'

export interface HistoryItem {
  id: string
  equation: string
  result: string
}

export interface CalculatorState {
  display: string
  prevValue: string | null
  operator: CalcOperator | null
  waitingForNext: boolean
  isError: boolean
  equation: string
  history: HistoryItem[] // Добавлено поле истории
}

export type CalculatorAction =
  | { type: 'DIGIT'; payload: string }
  | { type: 'OPERATOR'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'EQUALS' }
  | { type: 'DOT' }
  | { type: 'NEGATE' }
  | { type: 'PERCENT' }

export interface ButtonConfig {
  label: string | ((state: CalculatorState) => string)
  action: CalculatorAction
  containerClass: string
  textClass: string
  colSpan?: number
}
