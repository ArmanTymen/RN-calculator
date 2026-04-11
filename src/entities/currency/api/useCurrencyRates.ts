//src/entities/currency/api
import { useQuery } from '@tanstack/react-query'
import { fetchCurrencyRates } from './fetch-currency'
import { getLocalDateKey } from '../model'
import { CurrencyInfo } from '../model/schema'

export const useCurrencyRates = (date: Date) => {
  // Превращаем Date в строку YYYY-MM-DD для ключа кэша,
  // чтобы React Query понимал, когда дата реально изменилась
  const dateKey = getLocalDateKey(date)

  return useQuery<CurrencyInfo[], Error>({
    // Теперь ключ составной. Для каждой даты будет свой отдельный кэш
    queryKey: ['currencyRates', dateKey],
    queryFn: async () => {
      const res = await fetchCurrencyRates(date)
      const { USD, EUR, CNY } = res.Valute
      return [USD, EUR, CNY]
    },
    // Архивные данные не меняются, поэтому для прошлых дат можно ставить staleTime: Infinity.
    // Но для простоты оставим 5 минут (или можно настроить динамически).
    staleTime: 1000 * 60 * 5,
    // Важно: в выходные биржа закрыта, и /archive/.. может вернуть 404.
    // Выключаем бесконечные ретраи (по умолчанию их 3), чтобы приложение не висело
    retry: false,
  })
}
