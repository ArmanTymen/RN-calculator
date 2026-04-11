import { PropertyTaxFormInput } from '@/entities/property-tax-form'
import { selectTaxResults } from '@/entities/property-tax-form/model/selectors'
import { useTaxPersistStore } from '@/entities/property-tax-form/model/store'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch, useFieldArray } from 'react-hook-form'

const DEFAULT_VALUES: PropertyTaxFormInput = {
  propertyValue: 0,
  purchaseYear: new Date().getFullYear().toString(),
  isPreviouslyUsed: false,
  alreadyReceivedAmount: 0,
  yearlyIncomes: [],
}

export const usePropertyTaxForm = () => {
  const [isReady, setIsReady] = useState<boolean>(false)

  const savedFormData = useTaxPersistStore((state) => state.savedFormData)
  const _hasHydrated = useTaxPersistStore((state) => state._hasHydrated)
  const setSavedFormData = useTaxPersistStore((state) => state.setSavedFormData)
  const updatePurchaseYearStore = useTaxPersistStore((state) => state.updatePurchaseYear)

  const methods = useForm<PropertyTaxFormInput>({
    defaultValues: DEFAULT_VALUES,
  })

  const { control, reset, setValue } = methods
  const formValues = useWatch({ control })

  const { fields } = useFieldArray({
    control,
    name: 'yearlyIncomes',
  })

  // 1. Гидрация (ОДИН В ОДИН как в кредитах)
  useEffect(() => {
    if (_hasHydrated && savedFormData && !isReady) {
      reset(savedFormData)
      setIsReady(true)
    } else if (_hasHydrated && !savedFormData && !isReady) {
      setIsReady(true)
    }
  }, [_hasHydrated, savedFormData, isReady, reset])

  // 2. Автосохранение (ОДИН В ОДИН как в кредитах)
  useEffect(() => {
    if (!isReady) return

    const timeoutId = setTimeout(() => {
      setSavedFormData(formValues as PropertyTaxFormInput)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [formValues, isReady, setSavedFormData])

  // 3. Расчеты (ОДИН В ОДИН как в кредитах)
  const results = useMemo(() => {
    if (!isReady) return null
    return selectTaxResults(formValues as PropertyTaxFormInput)
  }, [formValues, isReady])

  // Метод для смены года, который делает всё разом
  // Метод для смены года
  const handleYearChange = (year: string) => {
    // 1. Обновляем стор. Он отработает синхронно.
    updatePurchaseYearStore(year)

    // 2. Достаем ОБНОВЛЕННОЕ состояние из стора напрямую
    // Используем селектор getState(), чтобы получить актуальные данные формы
    const latestFormData = useTaxPersistStore.getState().savedFormData

    // 3. Если данные есть, пушим их в RHF
    if (latestFormData) {
      // Важно: setValue обновит purchaseYear
      setValue('purchaseYear', latestFormData.purchaseYear)

      // Важно: это заставит useFieldArray перерисовать список инпутов (добавить/удалить лишние)
      setValue('yearlyIncomes', latestFormData.yearlyIncomes)
    }
  }

  return {
    ...methods,
    fields,
    results,
    isHydrated: isReady,
    handleYearChange,
  }
}
