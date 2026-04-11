import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { Alert } from 'react-native'
import { ActiveModal } from '@/entities/mortgage'
import {
  calculateSchedule,
  CreditFormInput,
  CreditFormOutPut,
  creditFormSchema,
  CreditFormValues,
  EarlyRepayment,
  useCreditPersistStore,
} from '@/entities/credit'

const DEFAULT_FORM_VALUES: CreditFormValues = {
  amount: 0,
  annualRate: 0,
  months: 0,
  paymentType: 'annuity',
  earlyRepayments: [],
  refinance: {
    enabled: false,
    atMonth: 1,
    newRate: 0,
    newMonths: 0,
  },
}

export const useCreditForm = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)
  const [isReady, setIsReady] = useState<boolean>(false)
  const savedFormData = useCreditPersistStore((state) => state.savedFormData)
  const _hasHydrated = useCreditPersistStore((state) => state._hasHydrated)
  const setSavedFormData = useCreditPersistStore((state) => state.setSavedFormData)
  const clearStorage = useCreditPersistStore((state) => state.clearStorage)

  const methods = useForm<CreditFormInput, undefined, CreditFormOutPut>({
    resolver: zodResolver(creditFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const { control, getValues, setValue, reset } = methods
  const formValues = useWatch({ control })
  const validation = useMemo(() => creditFormSchema.safeParse(formValues), [formValues])
  const handleReset = () => {
    Alert.alert('Сбросить данные?', 'Все введенные параметры и досрочные платежи будут удалены.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Очистить',
        style: 'destructive',
        onPress: () => {
          clearStorage()
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
      setSavedFormData(formValues as CreditFormValues)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [formValues, isReady, setSavedFormData])

  const addEarlyRepayment = (data: Omit<EarlyRepayment, 'id'>) => {
    const newRepayment: EarlyRepayment = { ...data, id: uuidv4() }
    const current = getValues('earlyRepayments') || []
    setValue('earlyRepayments', [...current, newRepayment])
  }

  const removeEarlyRepayment = (id: string) => {
    const current = getValues('earlyRepayments') || []
    setValue(
      'earlyRepayments',
      current.filter((item) => item.id !== id)
    )
  }

  const scheduleData = useMemo(() => {
    if (!isReady || !validation.success) return []
    return calculateSchedule(validation.data)
  }, [isReady, validation])

  return {
    ...methods,
    handleReset,
    activeModal,
    setActiveModal,
    addEarlyRepayment,
    removeEarlyRepayment,
    scheduleData,
    isHydrated: isReady,
    // Теперь берем данные либо из валидного объекта, либо из сырых значений
    earlyRepayments: validation.success
      ? validation.data.earlyRepayments
      : (formValues.earlyRepayments as EarlyRepayment[]) || [],
    currentMonths: validation.success ? validation.data.months : 0,
    isRefinanceEnabled: formValues.refinance?.enabled,
  }
}
