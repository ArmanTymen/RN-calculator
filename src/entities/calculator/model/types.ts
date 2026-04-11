import { type CalcOperator } from '@/shared/lib/calculate-math/math'
import { CalculatorStackParamList } from '@/shared/lib/navigation/types'
import type { LucideIcon } from 'lucide-react-native'

export interface CalculatorState {
  display: string
  prevValue: string | null
  operator: CalcOperator | null
  waitingForNext: boolean
  isError: boolean
  equation: string
}

export type CalculatorAction =
  | { type: 'DIGIT'; payload: string }
  | { type: 'OPERATOR'; payload: CalcOperator }
  | { type: 'EQUALS' }
  | { type: 'CLEAR' }
  | { type: 'DOT' }
  | { type: 'PERCENT' }
  | { type: 'NEGATE' }

export interface CalculatorItem {
  to: keyof CalculatorStackParamList
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
}

export interface CalculatorGroup {
  id: 'daily' | 'loans_investments' | 'work_taxes'
  title: string
  items: CalculatorItem[]
}

export interface CalculatorButtons {
  label: string
  onClick: () => void
  textClass: string
  containerClass: string
  colSpan?: number
  size: number
}
