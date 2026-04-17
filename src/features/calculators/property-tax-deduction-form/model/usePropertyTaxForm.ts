import {
  calculateYearlyIncomes,
  PropertyTaxFormInput,
  PropertyTaxFormOutput,
  propertyTaxFormSchema,
} from '@/entities/calculators/property-tax-form'
import { selectTaxResults } from '@/entities/calculators/property-tax-form/model/selectors'
import { useTaxPersistStore } from '@/entities/calculators/property-tax-form/model/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch, useFieldArray } from 'react-hook-form'

const DEFAULT_FORM_VALUES: PropertyTaxFormInput = {
  propertyValue: 0,
  purchaseYear: new Date().getFullYear().toString(),
  isPreviouslyUsed: false,
  alreadyReceivedAmount: 0,
  yearlyIncomes: [],
  updatePurchaseYear: new Date().getFullYear().toString(),
}

export const usePropertyTaxForm = () => {
  const [isReady, setIsReady] = useState<boolean>(false)

  const savedFormData = useTaxPersistStore((state) => state.savedFormData)
  const _hasHydrated = useTaxPersistStore((state) => state._hasHydrated)
  const setSavedFormData = useTaxPersistStore((state) => state.setSavedFormData)

  const methods = useForm<PropertyTaxFormInput, undefined, PropertyTaxFormOutput>({
    resolver: zodResolver(propertyTaxFormSchema),
    defaultValues: savedFormData || DEFAULT_FORM_VALUES,
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

  const handleYearChange = (newYear: string) => {
    // 1. Получаем текущие доходы из формы
    const currentIncomes = methods.getValues('yearlyIncomes') || []

    // 2. Генерируем новый список годов на основе выбранного
    const updatedIncomes = calculateYearlyIncomes(newYear, currentIncomes)

    // 3. Сразу обновляем форму, чтобы поля появились мгновенно
    setValue('purchaseYear', newYear, { shouldValidate: true })
    setValue('yearlyIncomes', updatedIncomes, { shouldValidate: true })

    // 4. Синхронизируем со стором принудительно, не дожидаясь дебаунса
    const currentData = methods.getValues()
    setSavedFormData({
      ...currentData,
      purchaseYear: newYear,
      yearlyIncomes: updatedIncomes,
    })
  }

  return {
    ...methods,
    fields,
    results,
    isHydrated: isReady,
    handleYearChange,
  }
}
