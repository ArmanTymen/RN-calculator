import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  percentFormSchema,
  PercentFormInput,
  PercentFormOutput,
} from '@/entities/calculators/percent/model/schema'
import { usePercentStore } from '@/entities/calculators/percent/model/store'
import { PERCENT_OPERATIONS } from '@/entities/calculators/percent/lib/percent-logic'

const DEFAULT_FORM_VALUES: PercentFormInput = {
  operationType: 'percent_of_number',
  val1: 0,
  val2: 0,
  decimals: 2,
}

export const usePercentForm = () => {
  const { savedFormData, setSavedData, isHydrated } = usePercentStore()

  const methods = useForm<PercentFormInput, undefined, PercentFormOutput>({
    resolver: zodResolver(percentFormSchema),
    defaultValues: savedFormData || DEFAULT_FORM_VALUES,
  })

  const formValues = useWatch({ control: methods.control })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSavedData(formValues as PercentFormInput)
    }, 500)
    return () => clearTimeout(timeout)
  }, [formValues, setSavedData])

  const currentConfig = PERCENT_OPERATIONS[formValues.operationType || 'percent_of_number']

  const result = useMemo(() => {
    return currentConfig.calculate(
      Number(formValues.val1) || 0,
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
