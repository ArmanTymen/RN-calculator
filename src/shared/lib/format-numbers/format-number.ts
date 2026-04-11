// src/shared/lib/format/format-number.ts

const formatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 10,
  useGrouping: true,
})

export const formatDisplay = (value: string): string => {
  if (value === 'Error') return 'Ошибка'

  // Если пользователь вводит дробь, не форматируем хвост, пока он в процессе
  if (value.endsWith('.')) {
    return formatter.format(parseFloat(value)) + ','
  }

  const num = parseFloat(value)
  return isNaN(num) ? '0' : formatter.format(num)
}
