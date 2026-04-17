import { z } from 'zod'
import { earlyRepaymentStrategySchema } from './schema'

export type EarlyRepaymentStrategy = z.infer<typeof earlyRepaymentStrategySchema>

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
