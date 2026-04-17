import { SavingsFormOutPut } from '../model/schema'

export interface SavingsResult {
  finalAmount: number
  totalInterest: number
  totalReplenishments: number
  totalWithdrawals: number
}

// Приблизительная конвертация для простоты (в реальном банковском ПО используют точные даты)
const getDaysFromUnit = (duration: number, unit: string) => {
  if (unit === 'years') return duration * 365
  if (unit === 'months') return duration * 30
  return duration
}

// 1. Нормализация дат: сбрасываем часы, минуты и секунды для точного подсчета дней
const getDaysBetween = (start: Date, end: Date) => {
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const endMidnight = new Date(end.getFullYear(), end.getMonth(), end.getDate())

  const diffTime = endMidnight.getTime() - startMidnight.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  return diffDays >= 0 ? diffDays : 0
}

// 2. Универсальная функция агрегации транзакций
const buildTransactionMap = (
  transactions: { date: Date | string; amount: number }[],
  startDate: Date
) => {
  const map = new Map<number, number>()

  for (const t of transactions) {
    if (!t.amount || !t.date) continue // Защита от пустых полей в массиве

    const dateObj = typeof t.date === 'string' ? new Date(t.date) : t.date
    const diff = getDaysBetween(startDate, dateObj)
    const day = diff <= 0 ? 1 : diff

    map.set(day, (map.get(day) || 0) + Number(t.amount))
  }
  return map
}

export const calculateSavings = (data: SavingsFormOutPut): SavingsResult => {
  const startDate = new Date()
  let currentBalance = Number(data.depositAmount) || 0
  const totalDays = getDaysFromUnit(Number(data.duration) || 0, data.durationUnit)
  const rate = Number(data.interestRate) || 0
  const limit = Number(data.limit) || 0
  const dailyRate = rate / 100 / 365

  let totalInterest = 0
  let accumulatedInterest = 0
  let totalReplenishments = 0
  let totalWithdrawals = 0

  // 3. Используем редьюсер для сборки Map
  const replenishmentsMap = buildTransactionMap(data.replenishments, startDate)
  const withdrawalsMap = buildTransactionMap(data.withdrawals, startDate)

  // Цикл остается прежним
  for (let day = 1; day <= totalDays; day++) {
    if (replenishmentsMap.has(day)) {
      const amount = replenishmentsMap.get(day)!
      currentBalance += amount
      totalReplenishments += amount
    }

    if (withdrawalsMap.has(day)) {
      let amount = withdrawalsMap.get(day)!
      if (currentBalance - amount < limit) {
        amount = currentBalance - limit
      }
      if (amount > 0) {
        currentBalance -= amount
        totalWithdrawals += amount
      }
    }

    const dailyInterest = currentBalance * dailyRate
    accumulatedInterest += dailyInterest
    totalInterest += dailyInterest

    if (data.isCapitalization && day % 30 === 0) {
      currentBalance += accumulatedInterest
      accumulatedInterest = 0
    }
  }

  if (!data.isCapitalization || accumulatedInterest > 0) {
    currentBalance += accumulatedInterest
  }

  return {
    finalAmount: Math.round(currentBalance * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalReplenishments,
    totalWithdrawals,
  }
}
