import { UNITS_DATA, useConverterPersistStore } from '@/entities/converters/converter'
import {
  convertUnits,
  getUnitsByCategory,
} from '@/entities/converters/converter/lib/converterStore'
import {
  ConverterFormInput,
  ConverterFormOutput,
  converterFormSchema,
  UnitId,
} from '@/entities/converters/converter/model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useConverter = () => {
  const { savedFormData, _hasHydrated, setSavedFormData } = useConverterPersistStore()
  const [isReady, setIsReady] = useState(false)

  const methods = useForm<ConverterFormInput, undefined, ConverterFormOutput>({
    resolver: zodResolver(converterFormSchema),
    defaultValues: {
      inputValue: 1,
      category: 'volume',
      fromUnit: 'barrel_oil',
    },
  })

  const { control, reset, watch, setValue } = methods
  const formValues = watch()

  const updateField = (patch: Partial<ConverterFormOutput>) => {
    if (patch.category && patch.category !== formValues.category) {
      const newUnits = getUnitsByCategory(patch.category)
      const firstUnit = newUnits[0]

      if (firstUnit) {
        setValue('category', patch.category)
        setValue('fromUnit', firstUnit.id as UnitId)
        return
      }
    }

    Object.entries(patch).forEach(([key, value]) => {
      setValue(key as keyof ConverterFormOutput, value)
    })
  }

  useEffect(() => {
    if (_hasHydrated && !isReady) {
      if (savedFormData) reset(savedFormData)
      setIsReady(true)
    }
  }, [_hasHydrated, isReady, reset, savedFormData])

  useEffect(() => {
    if (!isReady) return
    const timer = setTimeout(() => {
      setSavedFormData(formValues as ConverterFormOutput)
    }, 500)
    return () => clearTimeout(timer)
  }, [formValues, isReady, setSavedFormData])

  const availableUnits = getUnitsByCategory(formValues.category)

  const bulkResults = useMemo(() => {
    const fromUnitData = UNITS_DATA[formValues.fromUnit as UnitId]

    if (!fromUnitData || fromUnitData.category !== formValues.category) {
      return []
    }

    return availableUnits.map((unit) => ({
      ...unit,
      convertedValue: convertUnits(
        Number(formValues.inputValue) || 0,
        formValues.fromUnit as UnitId,
        unit.id as UnitId
      ),
    }))
  }, [formValues.inputValue, formValues.fromUnit, formValues.category, availableUnits])

  return {
    methods,
    control,
    bulkResults,
    updateField,
    category: formValues.category,
    fromUnit: formValues.fromUnit,
    availableUnits,
  }
}
