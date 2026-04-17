// src/features/vacation-form/model/useVacationCalculator.ts
import { useMemo, useState, useEffect } from 'react'
import { useForm, useWatch, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  VacationFormData,
  VacationFormInput,
  vacationTypeSchema,
} from '@/entities/calculators/vacation-form'
import { useVacationPersistStore } from '@/entities/calculators/vacation-form/model/store'
import { calculateVacationResults } from '@/entities/calculators/vacation-form/model/calculations'

const DEFAULT_FORM_VALUES: VacationFormInput = {
  annualVacationDays: 28,
  excludedPeriods: [],
  hiringDate: new Date(),
  calculationDate: new Date(),
  usedDays: 0,
  averageEarnings: 0,
}

export const useVacationCalculator = () => {
  const [isReady, setIsReady] = useState(false)
  const [infoContent, setInfoContent] = useState<{ title: string; text: string } | null>(null)

  const { savedFormData, _hasHydrated, setSavedFormData } = useVacationPersistStore()

  const methods = useForm<VacationFormInput, undefined, VacationFormData>({
    resolver: zodResolver(vacationTypeSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
  })

  const { control, reset } = methods
  const formValues = useWatch({ control })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'excludedPeriods',
  })

  // Гидрация
  useEffect(() => {
    if (_hasHydrated && !isReady) {
      if (savedFormData) reset(savedFormData)
      setIsReady(true)
    }
  }, [_hasHydrated, isReady, reset, savedFormData])

  // Автосохранение
  useEffect(() => {
    if (!isReady) return
    const timer = setTimeout(() => {
      // Пытаемся провалидировать текущие значения перед сохранением
      const result = vacationTypeSchema.safeParse(formValues)
      if (result.success) {
        setSavedFormData(result.data)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [formValues, isReady, setSavedFormData])

  // Расчет результатов (Математика)
  const results = useMemo(() => {
    if (!isReady) return null
    const validation = vacationTypeSchema.safeParse(formValues)
    if (!validation.success) return null
    return calculateVacationResults(validation.data)
  }, [formValues, isReady])

  const addPeriod = () => {
    append({
      id: Math.random().toString(36).substring(7),
      startDate: new Date(),
      endDate: new Date(),
      comment: '',
    })
  }

  return {
    ...methods,
    fields,
    results,
    addPeriod,
    removePeriod: remove,
    isHydrated: isReady,
    infoContent,
    setInfoContent,
    showInfo: (title: string, text: string) => setInfoContent({ title, text }),
  }
}
