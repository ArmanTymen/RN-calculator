import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  percentFormSchema,
  PercentFormInput,
  PercentFormOutput,
} from '@/entities/percent/model/schema'
import { usePercentStore } from '@/entities/percent/model/store'
import { PERCENT_OPERATIONS } from '@/entities/percent/lib/percent-logic'

const DEFAULT_FORM_VALUES: PercentFormInput = {
  operationType: 'percent_of_number',
  val1: 0,
  val2: 0,
  decimals: 2,
}

export const usePercentForm = () => {
  const { savedData, setSavedData, isHydrated } = usePercentStore()

  // 1. Строгая передача трех дженериков: Input, Context, Output. Никаких any.
  const methods = useForm<PercentFormInput, undefined, PercentFormOutput>({
    resolver: zodResolver(percentFormSchema),
    // Если savedData в сторе типизирован строго, TypeScript пропустит это без проблем
    defaultValues: savedData || DEFAULT_FORM_VALUES,
  })

  // 2. useWatch возвращает DeepPartial от TFieldValues (то есть от PercentFormInput)
  const formValues = useWatch({ control: methods.control })

  // 3. Автосохранение
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Приводим к PercentFormInput, так как в процессе ввода форма может содержать
      // неполные или строковые данные (до того как отработает coerce)
      setSavedData(formValues as PercentFormInput)
    }, 500)
    return () => clearTimeout(timeout)
  }, [formValues, setSavedData])

  // 4. Математика
  const currentConfig = PERCENT_OPERATIONS[formValues.operationType || 'percent_of_number']

  const result = useMemo(() => {
    return currentConfig.calculate(
      Number(formValues.val1) || 0, // Приводим к Number для безопасности расчетов в реальном времени
      Number(formValues.val2) || 0,
      Number(formValues.decimals) || 2
    )
  }, [currentConfig, formValues.val1, formValues.val2, formValues.decimals])

  return {
    ...methods,
    result,
    currentConfig,
    isHydrated,
    decimals: Number(formValues.decimals) || 2,
  }
}
