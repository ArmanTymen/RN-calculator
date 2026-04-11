import { NdflFormValues } from '@/entities/tax'
import { useForm, useWatch } from 'react-hook-form'

export const useNdflForm = () => {
  const methods = useForm<NdflFormValues>({
    defaultValues: {
      incomeType: 'salary',
      income: 0,
      incomeMode: 'gross',
      taxDeduction: 0,
      isNonResident: false,
      isSpecialCategory: false,
      hasDistrictCoefficient: false,
      districtCoefficient: 1,
      northernBonus: 0,
    },
  })

  const { control, reset, setValue } = methods

  const isNonResident = useWatch({ control, name: 'isNonResident' })
  const hasDistrictCoefficient = useWatch({ control, name: 'hasDistrictCoefficient' })
  const incomeMode = useWatch({ control, name: 'incomeMode' })
  const incomeType = useWatch({ control, name: 'incomeType' })
  const isSpecialCategory = useWatch({ control, name: 'isSpecialCategory' })
  const handleReset = () => {
    reset()
  }

  return {
    isNonResident,
    hasDistrictCoefficient,
    incomeMode,
    incomeType,
    isSpecialCategory,
    handleReset,
    setValue,
    control,
  }
}
