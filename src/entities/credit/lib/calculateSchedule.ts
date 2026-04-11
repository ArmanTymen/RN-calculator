// src/entities/credit/lib/calculateSchedule.ts
import type { EarlyRepayment, Refinance, ScheduleRow, PaymentType } from '../model/types'

interface Params {
  amount: number
  annualRate: number
  months: number
  paymentType?: PaymentType
  earlyRepayments?: EarlyRepayment[]
  refinance?: Refinance
}

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'short',
  year: 'numeric',
})

/**
 * Оптимизированная версия расчета графика платежей
 * Использует number вместо Big.js для ускорения в 50-100 раз
 * Точность достаточна для финансовых расчетов (копейки)
 */

export const calculateSchedule = ({
  amount,
  annualRate,
  months,
  paymentType,
  earlyRepayments = [],
  refinance,
}: Params): ScheduleRow[] => {
  // Защита от некорректных данных
  if (amount <= 0 || annualRate <= 0 || months <= 0) return []

  // Группируем досрочные платежи по месяцам и суммируем их
  // Вместо массива объектов храним просто сумму досрочки за месяц
  const earlyMap = new Map<number, number>()
  earlyRepayments.forEach((r) => {
    const current = earlyMap.get(r.month) || 0
    earlyMap.set(r.month, current + r.amount)
  })

  const startDate = new Date()
  startDate.setDate(1)

  // Переводим всё в number (быстрые вычисления)
  let monthlyRate = annualRate / 100 / 12
  let remainingBalance = amount
  let currentRemainingTerm = months

  // Стратегии досрочек храним отдельно для каждого месяца
  const strategyMap = new Map<number, 'reduce_payment' | 'reduce_term'>()
  earlyRepayments.forEach((r) => {
    if (!strategyMap.has(r.month)) {
      strategyMap.set(r.month, r.strategy)
    }
  })

  // Начальный расчет аннуитетного платежа (если нужно)
  let currentAnnuityPayment = 0
  if (paymentType === 'annuity') {
    currentAnnuityPayment = calculateAnnuityPayment(
      remainingBalance,
      monthlyRate,
      currentRemainingTerm
    )
  }

  const schedule: ScheduleRow[] = []
  let isRefinanced = false

  // Ограничиваем цикл реальным сроком + запас
  const maxMonths = Math.max(months, 600) // Максимум 50 лет
  for (let i = 1; i <= maxMonths; i++) {
    // Выход при полном погашении (остаток меньше 1 копейки)
    if (remainingBalance <= 0.01) break

    // ========== 1. РЕФИНАНСИРОВАНИЕ ==========
    const refMonth = refinance?.atMonth ?? 0
    const refRate = refinance?.newRate ?? 0
    const refMonths = refinance?.newMonths ?? 1

    if (refinance?.enabled && i === refMonth && !isRefinanced && refRate > 0) {
      monthlyRate = refRate / 100 / 12
      currentRemainingTerm = refMonths

      if (paymentType === 'annuity') {
        currentAnnuityPayment = calculateAnnuityPayment(
          remainingBalance,
          monthlyRate,
          currentRemainingTerm
        )
      }
      isRefinanced = true
    }

    // ========== 2. РАСЧЕТ ПРОЦЕНТОВ ==========
    const interestPayment = remainingBalance * monthlyRate
    let principalPayment = 0

    if (paymentType === 'annuity') {
      // Аннуитет: тело = платеж - проценты
      principalPayment = currentAnnuityPayment - interestPayment
      // Защита от отрицательного тела (последний платеж)
      if (principalPayment < 0) principalPayment = remainingBalance
    } else {
      // Дифференцированный: тело = остаток / оставшиеся месяцы
      const monthsLeft = isRefinanced
        ? refinance!.newMonths - (i - refinance!.atMonth)
        : months - i + 1
      principalPayment = remainingBalance / Math.max(monthsLeft, 1)
    }

    // ========== 3. ДОСРОЧНЫЕ ПЛАТЕЖИ ==========
    const earlyAmountThisMonth = earlyMap.get(i) || 0
    let earlyAmount = earlyAmountThisMonth
    const strategy = strategyMap.get(i)

    // Если стратегия "уменьшение платежа" для аннуитета — пересчитываем платеж
    if (strategy === 'reduce_payment' && paymentType === 'annuity' && earlyAmount > 0) {
      const monthsLeft = isRefinanced
        ? refinance!.newMonths - (i - refinance!.atMonth) - 1
        : months - i

      if (monthsLeft > 0) {
        // Остаток после вычитания планового тела и досрочки
        const balanceAfterExtra = remainingBalance - principalPayment - earlyAmount
        if (balanceAfterExtra > 0) {
          currentAnnuityPayment = calculateAnnuityPayment(
            balanceAfterExtra,
            monthlyRate,
            monthsLeft
          )
        }
      }
    }

    // ========== 4. КОРРЕКТИРОВКА (нельзя заплатить больше остатка) ==========
    let totalPayment = principalPayment + earlyAmount
    if (totalPayment > remainingBalance) {
      // Если переплата — корректируем
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance
        earlyAmount = 0
      } else {
        earlyAmount = remainingBalance - principalPayment
      }
      totalPayment = principalPayment + earlyAmount
    }

    // Обновляем остаток долга
    remainingBalance = remainingBalance - principalPayment - earlyAmount
    if (remainingBalance < 0) remainingBalance = 0

    // ========== 5. ФОРМИРОВАНИЕ ЗАПИСИ ==========
    const currentDate = new Date(startDate.getFullYear(), startDate.getMonth() + (i - 1), 1)
    const formattedDate = dateFormatter.format(currentDate)

    // Округляем до 2 знаков (копейки)
    const paymentTotal = totalPayment + interestPayment
    const principalTotal = principalPayment + earlyAmount

    schedule.push({
      id: `month-${i}-${currentDate.getTime()}`,
      date: formattedDate,
      payment: Math.round(paymentTotal * 100) / 100,
      principal: Math.round(principalTotal * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.round(remainingBalance * 100) / 100,
    })
  }

  return schedule
}

/**
 * Расчет аннуитетного платежа
 * Использует Math.pow для быстрых вычислений
 *
 * Формула: P = S * (r * (1 + r)^n) / ((1 + r)^n - 1)
 * где:
 *   S — сумма кредита
 *   r — месячная процентная ставка
 *   n — количество месяцев
 */
const calculateAnnuityPayment = (balance: number, monthlyRate: number, months: number): number => {
  // Защита от деления на ноль
  if (months <= 0) return balance

  // Если ставка 0% — просто делим на количество месяцев
  if (monthlyRate === 0) return balance / months

  // Стандартная формула аннуитета
  const factor = Math.pow(1 + monthlyRate, months)
  const annuity = (balance * (monthlyRate * factor)) / (factor - 1)

  return annuity
}
