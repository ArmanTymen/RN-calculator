// src/entities/vacation-form/model/calculations.ts
import { VacationFormData } from './schema'

const MS_PER_DAY = 1000 * 60 * 60 * 24

/**
 * Вспомогательная функция для получения разницы в годах/месяцах/днях
 */
const getDuration = (start: Date, end: Date) => {
  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
    days += prevMonthLastDay
  }
  if (months < 0) {
    years--
    months += 12
  }
  return { years, months, days }
}

// Указываем строгий тип VacationFormData
export const calculateVacationResults = (data: VacationFormData) => {
  const {
    hiringDate,
    calculationDate,
    excludedPeriods = [],
    annualVacationDays,
    usedDays,
    averageEarnings,
  } = data

  if (!hiringDate || !calculationDate) return null

  const start = new Date(hiringDate)
  const end = new Date(calculationDate)

  // 1. Общая продолжительность (г/мес/дн)
  const total = getDuration(start, end)

  // 2. Сумма исключаемых дней
  const excludedDaysCount = excludedPeriods.reduce((acc, period) => {
    if (period.startDate && period.endDate) {
      const diff =
        (new Date(period.endDate).getTime() - new Date(period.startDate).getTime()) / MS_PER_DAY
      return acc + Math.max(0, Math.ceil(diff))
    }
    return acc
  }, 0)

  // 3. Отпускной стаж (сдвигаем дату начала вперед на сумму исключенных дней)
  const adjustedStart = new Date(start)
  adjustedStart.setDate(adjustedStart.getDate() + excludedDaysCount)

  const seniority = getDuration(adjustedStart, end)

  // 4. Расчет положенных месяцев (правило 15 дней)
  // Считаем полные месяцы
  let fullMonths =
    (end.getFullYear() - adjustedStart.getFullYear()) * 12 +
    (end.getMonth() - adjustedStart.getMonth())
  const tempDate = new Date(adjustedStart)
  tempDate.setMonth(tempDate.getMonth() + fullMonths)

  // Если после добавления месяцев мы "перепрыгнули" расчетную дату, откатываем месяц
  if (tempDate > end) {
    fullMonths--
    tempDate.setMonth(tempDate.getMonth() - 1)
  }

  // Считаем остаток дней в последнем неполном месяце
  const remainingDays = Math.floor((end.getTime() - tempDate.getTime()) / MS_PER_DAY)
  const totalMonthsForCalc = remainingDays >= 15 ? fullMonths + 1 : fullMonths

  // 5. Итоговые цифры
  const daysPerMonth = annualVacationDays / 12
  const accruedDays = Number((totalMonthsForCalc * daysPerMonth).toFixed(2))
  const unusedDays = Math.max(0, Number((accruedDays - usedDays).toFixed(2)))
  const compensation = Math.round(unusedDays * averageEarnings)

  return {
    totalDurationStr: `${total.years}г ${total.months}мес ${total.days}дн`,
    seniorityStr: `${seniority.years}г ${seniority.months}мес`,
    accruedDays,
    unusedDays,
    compensation,
    formula: `(${annualVacationDays} ÷ 12) × ${totalMonthsForCalc}`,
    moneyFormula: `${averageEarnings.toLocaleString('ru-RU')} ₽ × ${unusedDays}`,
    unusedFormula: `${accruedDays} - ${usedDays}`,
  }
}
