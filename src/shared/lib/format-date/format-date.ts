// src/shared/lib/format-date/format-date.ts

/**
 * Генерирует массив опций для Select с датами, начиная с текущего месяца.
 * Формат: "Апр 2026 г."
 */
export const generateDateOptions = (maxMonths: number): { value: number; label: string }[] => {
  const startDate = new Date()

  return Array.from({ length: maxMonths }, (_, i) => {
    const date = new Date(startDate)
    date.setMonth(startDate.getMonth() + i)

    // Получаем короткое название месяца (апр, май, июн)
    const monthShort = new Intl.DateTimeFormat('ru-RU', { month: 'short' })
      .format(date)
      .replace('.', '') // Убираем точку только у месяца (например, "апр." -> "апр")

    const year = date.getFullYear()

    // Формируем красивую строку с заглавной буквы
    const capitalizedMonth = monthShort.charAt(0).toUpperCase() + monthShort.slice(1)
    const label = `${capitalizedMonth} ${year} г.` // Точка у "г." захардкожена для надежности

    return {
      value: i + 1,
      label: label,
    }
  })
}

/**
 * Преобразует индекс месяца (1, 2, 3...) в строковое представление даты.
 * Используется для отображения в списках досрочных платежей.
 */
export const formatMonthIndexToDate = (monthIndex: number): string => {
  const date = new Date()
  date.setMonth(date.getMonth() + monthIndex - 1)

  const monthShort = new Intl.DateTimeFormat('ru-RU', { month: 'short' })
    .format(date)
    .replace('.', '')

  const year = date.getFullYear()
  const capitalizedMonth = monthShort.charAt(0).toUpperCase() + monthShort.slice(1)

  return `${capitalizedMonth} ${year} г.`
}
