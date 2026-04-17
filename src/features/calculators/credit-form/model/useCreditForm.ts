import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { Alert } from 'react-native'
import {
  calculateSchedule,
  creditFormSchema,
  CreditFormInput,
  CreditFormOutPut,
  CreditFormValues,
  EarlyRepayment,
  useCreditPersistStore,
} from '@/entities/calculators/credit'
import { ActiveModal } from '@/entities/calculators/mortgage'

const DEFAULT_FORM_VALUES: CreditFormValues = {
  amount: 0,
  annualRate: 0,
  months: 0,
  paymentType: 'annuity',
  earlyRepayments: [],
  refinance: { enabled: false, atMonth: 1, newRate: 0, newMonths: 0 },
}

export const useCreditForm = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)
  const [isReady, setIsReady] = useState(false)

  const { savedFormData, _hasHydrated, setSavedFormData, clearStorage } = useCreditPersistStore()

  const methods = useForm<CreditFormInput, undefined, CreditFormOutPut>({
    resolver: zodResolver(creditFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
  })

  const { control, reset, getValues, setValue } = methods
  const formValues = useWatch({ control })

  // Безопасная валидация
  const validation = useMemo(() => {
    return creditFormSchema.safeParse(formValues)
  }, [formValues])

  // 1. Гидрация: строго один раз при загрузке стора
  useEffect(() => {
    if (_hasHydrated && !isReady) {
      if (savedFormData) {
        reset(savedFormData)
      }
      setIsReady(true)
    }
  }, [_hasHydrated, isReady, reset, savedFormData])

  // 2. Автосохранение (debounce)
  useEffect(() => {
    if (!isReady) return
    const timer = setTimeout(() => setSavedFormData(formValues as CreditFormValues), 1000)
    return () => clearTimeout(timer)
  }, [formValues, isReady, setSavedFormData])

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

  const handleReset = () => {
    Alert.alert('Сброс', 'Удалить все данные?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          clearStorage()
          reset(DEFAULT_FORM_VALUES)
        },
      },
    ])
  }

  const isRefinanceReadyForCalc = useMemo(() => {
    return Boolean(
      formValues.refinance?.enabled &&
      Number(formValues.refinance?.newRate) > 0 &&
      Number(formValues.refinance?.newMonths) > 0
    )
  }, [
    formValues.refinance?.enabled,
    formValues.refinance?.newRate,
    formValues.refinance?.newMonths,
  ])

  const scheduleData = useMemo(() => {
    if (!isReady) return []

    const dataToCalculate = validation.success
      ? {
          ...validation.data,
          refinance: {
            ...validation.data.refinance,
            enabled: isRefinanceReadyForCalc,
          },
        }
      : {
          ...formValues,
          amount: Number(formValues.amount) || 0,
          annualRate: Number(formValues.annualRate) || 0,
          months: Number(formValues.months) || 0,
          earlyRepayments: formValues.earlyRepayments || [],
          paymentType: formValues.paymentType || 'annuity',
          refinance: {
            ...formValues.refinance,
            enabled: isRefinanceReadyForCalc,
            atMonth: Number(formValues.refinance?.atMonth) || 1,
            newRate: Number(formValues.refinance?.newRate) || 0,
            newMonths: Number(formValues.refinance?.newMonths) || 0,
          },
        }

    if (
      dataToCalculate.amount > 0 &&
      dataToCalculate.annualRate > 0 &&
      dataToCalculate.months > 0
    ) {
      return calculateSchedule(dataToCalculate as CreditFormOutPut)
    }

    return []
  }, [isReady, validation, formValues, isRefinanceReadyForCalc])

  return {
    ...methods,
    control,
    handleReset,
    activeModal,
    setActiveModal,
    addEarlyRepayment,
    removeEarlyRepayment,
    scheduleData,
    isHydrated: isReady,
    earlyRepayments:
      (validation.success ? validation.data.earlyRepayments : formValues.earlyRepayments) || [],
    currentMonths: validation.success ? validation.data.months : Number(formValues.months) || 1,
    isRefinanceEnabled: isRefinanceReadyForCalc,
  }
}
