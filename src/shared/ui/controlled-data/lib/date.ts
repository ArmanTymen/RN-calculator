// shared/lib/date.ts

/** Конвертирует Date в формат 'YYYY-MM-DD' для календаря Wix */
export const getLocalYMD = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Форматирует дату для отображения пользователю (DD.MM.YYYY) */
export const formatDisplayDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU').format(date)
}
