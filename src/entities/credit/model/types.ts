import { z } from 'zod'
import { earlyRepaymentStrategySchema, CreditFormOutPut } from './schema'
import { refinanceSchema } from '@/entities/loan/model'

export type EarlyRepaymentStrategy = z.infer<typeof earlyRepaymentStrategySchema>
export type Refinance = z.infer<typeof refinanceSchema>

export interface ScheduleRow {
  id: string
  date: string
  payment: number
  principal: number
  interest: number
  balance: number
}

export interface CreditResult {
  firstPayment: number
  lastPayment: number
  totalOverpayment: number
}

// Параметры для функции расчета теперь строго завязаны на Output из Zod
// Это гарантирует, что в расчеты попадут только валидные числа
export type CalculateScheduleParams = CreditFormOutPut
