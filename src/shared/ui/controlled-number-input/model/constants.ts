export const formatSum = (value: number | undefined): string => {
  if (!value) return ''
  return new Intl.NumberFormat('ru-RU').format(value)
}

export const parseSum = (value: string): number => {
  return Number(value.replace(/\D/g, ''))
}

export const inputStyles =
  'w-full rounded-lg border border-slate-300 bg-white p-3 text-lg text-slate-900'
