// // features/calculate-ndfl/model/calculate.ts

// /**
//  * Расчет НДФЛ по прогрессивной шкале 2026 года
//  * Принцип: Чистая функция (Pure Function)
//  */
// export const calculateNdfl = (income: number): TaxResult => {
//   let remainingIncome = income
//   let totalTax = 0
//   let previousLimit = 0

//   for (const step of NDFL_THRESHOLD) {
//     const range = step.limit - previousLimit
//     const taxableAmount = Math.min(remainingIncome, range)

//     if (taxableAmount <= 0) break

//     totalTax += taxableAmount * step.rate
//     remainingIncome -= taxableAmount
//     previousLimit = step.limit
//   }

//   return {
//     grossIncome: income,
//     taxAmount: totalTax,
//     netIncome: income - totalTax,
//     effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
//   }
// }
