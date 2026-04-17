import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PersonalTaxIncomeFormInput,
  PersonalTaxIncomeFormOutPut,
  personalTaxIncomeTypeSchema,
  useTaxPersistStore,
} from '@/entities/calculators/personal-income-tax'
import { Alert } from 'react-native'
import { calculatePersonalTax } from '@/entities/calculators/personal-income-tax/model/calculate-tax'

const DEFAULT_FORM_VALUES: PersonalTaxIncomeFormInput = {
  incomeType: 'salary',
  income: 0,
  incomeMode: 'gross',
  taxDeduction: 0,
  isNonResident: false,
  isSpecialCategory: false,
  hasDistrictCoefficient: false,
  districtCoefficient: 1,
  northernBonus: 0,
}

export const usePersonalTaxIncomeForm = () => {
  const [isReady, setIsReady] = useState(false)
  const { savedFormData, _hasHydrated, setSavedFormData, clearStorage } = useTaxPersistStore()

  const methods = useForm<PersonalTaxIncomeFormInput, undefined, PersonalTaxIncomeFormOutPut>({
    resolver: zodResolver(personalTaxIncomeTypeSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
  })

  const { control, reset } = methods
  const formValues = useWatch({ control })

  // 1. Гидрация из Zustand
  useEffect(() => {
    if (_hasHydrated && !isReady) {
      if (savedFormData) {
        reset(savedFormData)
      }
      setIsReady(true)
    }
  }, [_hasHydrated, isReady, reset, savedFormData])

  // 2. Автосохранение в стор (debounce)
  useEffect(() => {
    if (!isReady) return
    const timer = setTimeout(() => {
      setSavedFormData(formValues as PersonalTaxIncomeFormInput)
    }, 1000)
    return () => clearTimeout(timer)
  }, [formValues, isReady, setSavedFormData])

  const handleReset = () => {
    Alert.alert('Сброс', 'Очистить все данные формы?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Сбросить',
        style: 'destructive',
        onPress: () => {
          clearStorage()
          reset(DEFAULT_FORM_VALUES)
        },
      },
    ])
  }

  const validation = useMemo(() => {
    return personalTaxIncomeTypeSchema.safeParse(formValues)
  }, [formValues])

  const results = useMemo(() => {
    if (!validation.success) return null
    return calculatePersonalTax(validation.data)
  }, [validation])

  return {
    ...methods,
    results,
    isReady,
    handleReset,
    values: {
      incomeType: formValues.incomeType || 'salary',
      isNonResident: !!formValues.isNonResident,
      hasDistrictCoefficient: !!formValues.hasDistrictCoefficient,
      isSpecialCategory: !!formValues.isSpecialCategory,
      incomeMode: formValues.incomeMode || 'gross',
    },
  }
}
