// src/features/currency-converter-form/model/useCurrencyConverter.ts
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  calculateExchange,
  isSameDay,
  TODAY,
  useCurrencyRates,
} from '@/entities/calculators/currency'
import {
  CurrencyConverterFormInput,
  CurrencyConverterFormOutPut,
  currencyConverterFormSchema,
} from '@/entities/calculators/currency/model/schema'
import { useCurrencyConverterPersistStore } from '@/entities/calculators/currency/model/store'

const DEFAULT_FORM_VALUES: CurrencyConverterFormInput = {
  amount: 0,
  sourceCurrency: 'USD',
  targetCurrency: 'RUB',
  rateDate: TODAY,
}

export const useCurrencyConverter = () => {
  const [isReady, setIsReady] = useState(false)

  // Достаем данные и методы из стора (Zustand)
  const { savedFormData, _hasHydrated, setSavedFormData } = useCurrencyConverterPersistStore()

  const methods = useForm<CurrencyConverterFormInput, undefined, CurrencyConverterFormOutPut>({
    resolver: zodResolver(currencyConverterFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
  })

  const { control, reset, setValue } = methods

  // Следим за всеми полями формы
  const formValues = useWatch({ control })

  // 1. Гидрация: Загружаем сохраненные данные, когда стор готов
  useEffect(() => {
    if (_hasHydrated && !isReady) {
      if (savedFormData) {
        reset(savedFormData)
      }
      setIsReady(true)
    }
  }, [_hasHydrated, isReady, reset, savedFormData])

  // 2. Автосохранение: С задержкой (debounce) в 1 секунду
  useEffect(() => {
    if (!isReady) return

    const timer = setTimeout(() => {
      // Приводим к типу, так как useWatch может вернуть Partial
      setSavedFormData(formValues as CurrencyConverterFormInput)
    }, 1000)

    return () => clearTimeout(timer)
  }, [formValues, isReady, setSavedFormData])

  // 3. Валидация для расчетов (гарантирует наличие Date и number)
  const validation = useMemo(() => {
    return currencyConverterFormSchema.safeParse(formValues)
  }, [formValues])

  // Безопасные данные для запросов и логики
  const safeDate = validation.success ? validation.data.rateDate : TODAY
  const amount = validation.success ? validation.data.amount : 0

  // Запросы к API
  const selectedDateQuery = useCurrencyRates(safeDate)
  const todayQuery = useCurrencyRates(TODAY)
  const isDifferentDate = !isSameDay(TODAY, safeDate)

  // 4. Реактивный расчет результата
  const result = useMemo(() => {
    if (!isReady || !validation.success || !selectedDateQuery.data || amount <= 0) {
      return null
    }

    return calculateExchange(
      validation.data.amount,
      validation.data.sourceCurrency,
      validation.data.targetCurrency,
      selectedDateQuery.data
    )
  }, [isReady, validation, selectedDateQuery.data, amount])

  const swapCurrencies = () => {
    // Используем текущие значения из формы для свапа
    const currentSource = formValues.sourceCurrency
    const currentTarget = formValues.targetCurrency

    if (currentSource && currentTarget) {
      setValue('sourceCurrency', currentTarget)
      setValue('targetCurrency', currentSource)
    }
  }

  return {
    methods, // для FormProvider
    control,
    result,
    todayQuery,
    isDifferentDate,
    selectedDateQuery,
    safeDate,
    swapCurrencies,
    isHydrated: isReady,
    // Прокидываем текущие значения для UI (например, для флагов в селекте)
    formValues: {
      sourceCurrency: formValues.sourceCurrency || 'USD',
      targetCurrency: formValues.targetCurrency || 'RUB',
    },
  }
}
