import { calculateExchange, isSameDay, TODAY, useCurrencyRates } from '@/entities/currency'
import {
  CurrencyConverterFormInput,
  CurrencyConverterFormOutPut,
  currencyConverterFormSchema,
} from '@/entities/currency/model/schema'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

const DEFAULT_FORM_VALUES: CurrencyConverterFormInput = {
  amount: 0,
  sourceCurrency: 'USD',
  targetCurrency: 'RUB',
  rateDate: new Date(),
}
export const useCurrencyConverter = () => {
  const [result, setResult] = useState<number | null>(null)
  const { control, setValue, watch, handleSubmit } = useForm<
    CurrencyConverterFormInput,
    undefined,
    CurrencyConverterFormOutPut
  >({
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const formValues = watch()
  const validation = useMemo(() => currencyConverterFormSchema.safeParse(formValues), [formValues])

  // 2. Безопасно извлекаем дату (если форма битая — берем TODAY)
  const safeDate = validation.success ? validation.data.rateDate : TODAY

  // 3. Используем только валидированную дату в хуках
  const selectedDateQuery = useCurrencyRates(safeDate)
  const todayQuery = useCurrencyRates(TODAY)

  // 4. Логика сравнения дат (тоже через safeDate)
  const isDifferentDate = !isSameDay(TODAY, safeDate)

  // 5. Обработчик расчета (данные приходят уже провалидированные через handleSubmit)
  const onCalculate = (data: CurrencyConverterFormOutPut) => {
    if (!selectedDateQuery.data) return

    const calculatedValue = calculateExchange(
      data.amount,
      data.sourceCurrency,
      data.targetCurrency,
      selectedDateQuery.data
    )
    setResult(calculatedValue)
  }

  const swapCurrencies = () => {
    if (validation.success) {
      setValue('sourceCurrency', validation.data.targetCurrency)
      setValue('targetCurrency', validation.data.sourceCurrency)
      setResult(null)
    }
  }

  return {
    result,
    control,
    handleSubmit,
    todayQuery,
    isDifferentDate,
    onCalculate,
    swapCurrencies,
    formValues,
    selectedDateQuery,
    safeDate,
  }
}
