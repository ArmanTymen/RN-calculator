// src/entities/credit/lib/calculateSchedule.ts
import { ScheduleRow } from '../model/types'
import { EarlyRepayment, PaymentType, Refinance } from '../model'

interface CalculateParams {
  amount: number
  annualRate: number
  months: number
  paymentType?: PaymentType
  earlyRepayments?: EarlyRepayment[]
  refinance?: Refinance
}

const fastRound = (val: number): number => Math.round(val * 100) / 100

const getAnnuityPayment = (S: number, r: number, n: number): number => {
  if (n <= 0 || !Number.isFinite(n)) return S
  if (r <= 0 || !Number.isFinite(r)) return S / n

  const pow = Math.pow(1 + r, n)
  if (!Number.isFinite(pow) || pow === 1) return S / n

  const P = (S * r * pow) / (pow - 1)
  return Number.isFinite(P) ? P : S / n
}

export const calculateSchedule = ({
  amount,
  annualRate,
  months,
  paymentType = 'annuity',
  earlyRepayments = [],
  refinance,
}: CalculateParams): ScheduleRow[] => {
  if (amount <= 0 || annualRate < 0 || months <= 0) return []

  const earlyMap = new Map<number, { amount: number; strategy: 'reduce_payment' | 'reduce_term' }>()
  earlyRepayments.forEach((r) => {
    const existing = earlyMap.get(r.month) || { amount: 0, strategy: r.strategy }
    earlyMap.set(r.month, {
      amount: existing.amount + r.amount,
      strategy: r.strategy,
    })
  })

  const schedule: ScheduleRow[] = []
  const startDate = new Date()
  startDate.setDate(1)

  let remainingBalance = amount
  let currentMonthlyRate = annualRate / 100 / 12
  let currentRemainingTerm = months
  let isRefinanced = false

  let annuityPayment = getAnnuityPayment(remainingBalance, currentMonthlyRate, currentRemainingTerm)

  const MAX_ITERATIONS = 600
  const dateFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'short', year: 'numeric' })

  for (let monthIdx = 1; monthIdx <= MAX_ITERATIONS; monthIdx++) {
    if (remainingBalance <= 0.01) break

    // --- Блок Рефинансирования ---
    if (refinance?.enabled && monthIdx === refinance.atMonth && !isRefinanced) {
      currentMonthlyRate = refinance.newRate / 100 / 12
      currentRemainingTerm = refinance.newMonths
      annuityPayment = getAnnuityPayment(remainingBalance, currentMonthlyRate, currentRemainingTerm)
      isRefinanced = true
    }

    // --- Расчет обязательных платежей ---
    const interestPart = remainingBalance * currentMonthlyRate
    let principalPart = 0

    if (paymentType === 'annuity') {
      principalPart = annuityPayment - interestPart
    } else {
      const monthsLeft = isRefinanced
        ? currentRemainingTerm - (monthIdx - refinance!.atMonth)
        : months - monthIdx + 1
      principalPart = remainingBalance / Math.max(monthsLeft, 1)
    }

    // --- Блок Досрочного погашения ---
    const early = earlyMap.get(monthIdx)
    let earlyAmount = early?.amount || 0

    if (principalPart + earlyAmount > remainingBalance) {
      principalPart = Math.min(principalPart, remainingBalance)
      earlyAmount = Math.max(0, remainingBalance - principalPart)
    }

    remainingBalance -= principalPart + earlyAmount

    // --- Пересчет аннуитета (если стратегия "Уменьшение платежа") ---
    if (early?.strategy === 'reduce_payment' && paymentType === 'annuity' && remainingBalance > 0) {
      const nextMonthsLeft = isRefinanced
        ? currentRemainingTerm - (monthIdx - refinance!.atMonth) - 1
        : months - monthIdx

      if (nextMonthsLeft > 0) {
        annuityPayment = getAnnuityPayment(remainingBalance, currentMonthlyRate, nextMonthsLeft)
      }
    }

    // --- Формирование строки ---
    const rowDate = new Date(startDate.getFullYear(), startDate.getMonth() + (monthIdx - 1), 1)

    schedule.push({
      id: `month-${monthIdx}-${rowDate.getTime()}`,
      date: dateFormatter.format(rowDate),
      payment: fastRound(principalPart + earlyAmount + interestPart),
      principal: fastRound(principalPart + earlyAmount),
      interest: fastRound(interestPart),
      balance: fastRound(Math.max(0, remainingBalance)),
    })
  }

  return schedule
}
