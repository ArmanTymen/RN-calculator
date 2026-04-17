import Big from 'big.js'

Big.DP = 20
Big.RM = Big.roundHalfUp

export type CalcOperator = '+' | '-' | '×' | '÷'

export const calculate = (a: string, b: string, operator: CalcOperator): string => {
  const numA = new Big(a || '0')
  const numB = new Big(b || '0')

  switch (operator) {
    case '+':
      return numA.plus(numB).toString()
    case '-':
      return numA.minus(numB).toString()
    case '×':
      return numA.times(numB).toString()
    case '÷':
      if (numB.eq(0)) throw new Error('DIVISION_BY_ZERO')
      return numA.div(numB).toString()
    default:
      return b
  }
}
