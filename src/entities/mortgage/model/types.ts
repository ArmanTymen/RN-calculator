import { z } from 'zod'
import { mortgageFormSchema, deductionsSchema } from './schema'

// Для ипотеки выводим только ее специфичные типы
export type DeductionsState = z.infer<typeof deductionsSchema>
export type MortgageFormValues = z.infer<typeof mortgageFormSchema>

// Вспомогательные типы UI и результаты вычислений оставляем
export type ActiveModal = 'schedule' | 'early' | 'extra' | 'deductions' | null

export interface MortgageResult {
  monthlyPayment: number
  totalPayment: number
  totalOverpayment: number
}
