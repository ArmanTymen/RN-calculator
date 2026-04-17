import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { Alert } from 'react-native'
import {
  SavingsFormInput,
  SavingsFormOutPut,
  savingsFormValuesSchema,
  SavingsTransaction,
} from '@/entities/calculators/savings/model/schema'
import { useSavingsPersistStore } from '@/entities/calculators/savings/model/store'
import { calculateSavings } from '@/entities/calculators/savings/lib/calculate-savings'

const DEFAULT_FORM_VALUES: SavingsFormInput = {
  depositAmount: 0,
  currency: 'RUB',
  duration: 0,
  durationUnit: 'months',
  interestRateType: 'fixed',
  interestRate: 0,
  isCapitalization: false,
  payoutFrequency: 'monthly',
  limit: 0,
  replenishments: [],
  withdrawals: [],
}

export const useSavingsForm = () => {
  const [isReady, setIsReady] = useState(false)

  const { savedFormData, _hasHydrated, setSavedFormData, clearStorage } = useSavingsPersistStore()

  const methods = useForm<SavingsFormInput, undefined, SavingsFormOutPut>({
    resolver: zodResolver(savingsFormValuesSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const { control, reset, getValues, setValue } = methods
  const formValues = useWatch({ control })

  // 1. Гидратация (загрузка данных из AsyncStorage)
  useEffect(() => {
    if (_hasHydrated && savedFormData && !isReady) {
      reset(savedFormData)
      setIsReady(true)
    } else if (_hasHydrated && !savedFormData && !isReady) {
      setIsReady(true)
    }
  }, [_hasHydrated, savedFormData, isReady, reset])

  // 2. Автосохранение
  useEffect(() => {
    if (!isReady) return
    const timeoutId = setTimeout(() => {
      setSavedFormData(formValues as SavingsFormInput)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [formValues, isReady, setSavedFormData])

  // 3. Расчет в реальном времени
  const calculationResult = useMemo(() => {
    if (!isReady) return null

    const deposit = Number(formValues.depositAmount) || 0
    const duration = Number(formValues.duration) || 0
    const rate = Number(formValues.interestRate) || 0

    if (deposit <= 0 || duration <= 0 || rate <= 0) return null

    return calculateSavings(formValues as SavingsFormOutPut)
  }, [formValues, isReady])

  // 4. Управление транзакциями
  const handleAddReplenishment = () => {
    const current = getValues('replenishments') || []
    setValue('replenishments', [...current, { id: uuidv4(), date: new Date(), amount: 0 }])
  }

  const handleAddWithdrawal = () => {
    const current = getValues('withdrawals') || []
    setValue('withdrawals', [...current, { id: uuidv4(), date: new Date(), amount: 0 }])
  }

  const handleRemoveTransaction = (type: 'replenishments' | 'withdrawals', id: string) => {
    const current = getValues(type) || []
    setValue(
      type,
      current.filter((t) => t.id !== id)
    )
  }

  const handleReset = () => {
    Alert.alert('Сбросить данные?', 'Все параметры вклада будут удалены.', [
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

  return {
    ...methods,
    isReady,
    calculationResult,
    handleReset,
    handleAddReplenishment,
    handleAddWithdrawal,
    handleRemoveTransaction,
    replenishments: (formValues.replenishments as SavingsTransaction[]) || [],
    withdrawals: (formValues.withdrawals as SavingsTransaction[]) || [],
  }
}
