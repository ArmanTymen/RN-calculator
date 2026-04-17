import type { MortgageResult } from '../model/types'

export const calculateMortgage = (
  price?: number,
  downPayment?: number,
  rate?: number,
  years?: number
): MortgageResult => {
  const p = price || 0
  const dp = downPayment || 0
  const r = rate || 0
  const y = years || 0

  const principal = p - dp

  if (principal <= 0 || y <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalOverpayment: 0 }
  }

  const months = y * 12

  if (r === 0) {
    const monthly = principal / months
    return {
      monthlyPayment: Math.round(monthly * 100) / 100,
      totalPayment: principal,
      totalOverpayment: 0,
    }
  }

  const monthlyRate = r / 100 / 12
  const mathPower = Math.pow(1 + monthlyRate, months)

  const monthlyPaymentRaw = principal * ((monthlyRate * mathPower) / (mathPower - 1))

  const monthlyPayment = Math.round(monthlyPaymentRaw * 100) / 100
  const totalPayment = Math.round(monthlyPayment * months * 100) / 100
  const totalOverpayment = Math.round((totalPayment - principal) * 100) / 100

  return { monthlyPayment, totalPayment, totalOverpayment }
}
