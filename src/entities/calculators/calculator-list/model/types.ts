import { CalculatorStackParamList } from '@/shared/lib/navigation/types'
import type { LucideIcon } from 'lucide-react-native'

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
