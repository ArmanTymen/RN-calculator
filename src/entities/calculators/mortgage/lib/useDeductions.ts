import { useMemo } from 'react'
import type { ScheduleRow } from '@/entities/calculators/credit/model/types'

interface UseDeductionsParams {
  propertyPrice: number
  scheduleData: ScheduleRow[]
  isMarried: boolean
}

interface DeductionsResult {
  propertyDeduction: number
  interestDeduction: number
  totalDeduction: number
}

export const useDeductions = ({
  propertyPrice,
  scheduleData,
  isMarried,
}: UseDeductionsParams): DeductionsResult => {
  return useMemo(() => {
    if (!propertyPrice) {
      return { propertyDeduction: 0, interestDeduction: 0, totalDeduction: 0 }
    }

    const multiplier = isMarried ? 2 : 1

    const maxPropertyLimit = 2_000_000 * multiplier
    const applicablePropertyPrice = Math.min(propertyPrice, maxPropertyLimit)
    const propertyDeduction = applicablePropertyPrice * 0.13

    const totalInterestPaid = scheduleData.reduce((sum, row) => sum + row.interest, 0)
    const maxInterestLimit = 3_000_000 * multiplier
    const applicableInterest = Math.min(totalInterestPaid, maxInterestLimit)
    const interestDeduction = applicableInterest * 0.13

    return {
      propertyDeduction,
      interestDeduction,
      totalDeduction: propertyDeduction + interestDeduction,
    }
  }, [propertyPrice, scheduleData, isMarried])
}
