import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { Alert } from 'react-native'
import {
  ActiveModal,
  MortgageFormInput,
  MortgageFormOutPut,
  mortgageFormSchema,
  MortgageFormValues,
  useMortgagePersistStore,
} from '@/entities/mortgage'
import { calculateSchedule, EarlyRepayment } from '@/entities/credit'

const DEFAULT_FORM_VALUES: MortgageFormValues = {
  propertyPrice: 0,
  downPayment: 0,
  annualRate: 0,
  years: 0,
  earlyRepayments: [],
  deductions: {
    isMarried: false,
  },
}
export const useMortgageForm = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)
  const [isReady, setIsReady] = useState<boolean>(false)

  const savedFormData = useMortgagePersistStore((state) => state.savedFormData)
  const _hasHydrated = useMortgagePersistStore((state) => state._hasHydrated)
  const setSavedFormData = useMortgagePersistStore((state) => state.setSavedFormData)
  const clearStorage = useMortgagePersistStore((state) => state.clearStorage)

  const methods = useForm<MortgageFormInput, undefined, MortgageFormOutPut>({
    resolver: zodResolver(mortgageFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const { control, getValues, setValue, reset } = methods
  const formValues = useWatch({ control })

  const handleReset = () => {
    Alert.alert('Сбросить данные?', 'Все введенные параметры и досрочные платежи будут удалены.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Очистить',
        style: 'destructive',
        onPress: () => {
          // 1. Очищаем Zustand (AsyncStorage)
          clearStorage()
          // 2. Сбрасываем форму к дефолтным значениям
          reset(DEFAULT_FORM_VALUES)
        },
      },
    ])
  }

  useEffect(() => {
    if (_hasHydrated && savedFormData && !isReady) {
      reset(savedFormData)
      setIsReady(true) // Теперь это вызывает ре-рендер и уведомляет useMemo
    } else if (_hasHydrated && !savedFormData && !isReady) {
      // Если в сторе ничего нет, просто помечаем как "готово" с дефолтными значениями
      setIsReady(true)
    }
  }, [_hasHydrated, savedFormData, isReady, reset])

  // 2. Автосохранение: Form -> Storage
  useEffect(() => {
    if (!isReady) return

    const timeoutId = setTimeout(() => {
      setSavedFormData(formValues as MortgageFormValues)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [formValues, isReady, setSavedFormData])

  const scheduleData = useMemo(() => {
    if (!isReady) return []
    const propertyPrice = Number(formValues.propertyPrice) || 0
    const downPayment = Number(formValues.downPayment) || 0
    const annualRate = Number(formValues.annualRate) || 0
    const years = Number(formValues.years) || 0

    const loanAmount = propertyPrice - downPayment
    const totalMonths = years * 12

    if (loanAmount <= 0 || annualRate <= 0 || totalMonths <= 0) {
      return []
    }

    return calculateSchedule({
      amount: loanAmount,
      annualRate: annualRate,
      months: totalMonths,
      earlyRepayments: (formValues.earlyRepayments as EarlyRepayment[]) || [],
    })
  }, [
    formValues.propertyPrice,
    formValues.downPayment,
    formValues.years,
    formValues.annualRate,
    formValues.earlyRepayments,
    isReady,
  ])

  const addEarlyRepayment = (data: Omit<EarlyRepayment, 'id'>) => {
    const current = getValues('earlyRepayments') || []
    const newItem: EarlyRepayment = { ...data, id: uuidv4() }
    setValue('earlyRepayments', [...current, newItem])
  }

  const removeEarlyRepayment = (id: string) => {
    const current = methods.getValues('earlyRepayments') || []
    methods.setValue(
      'earlyRepayments',
      current.filter((item) => item.id !== id)
    )
  }

  return {
    ...methods,
    handleReset,
    scheduleData,
    activeModal,
    setActiveModal,
    addEarlyRepayment,
    isHydrated: isReady,
    removeEarlyRepayment,
    earlyRepayments: (formValues.earlyRepayments as EarlyRepayment[]) || [],
    currentMonths: (Number(formValues.years) || 0) * 12,
  }
}
