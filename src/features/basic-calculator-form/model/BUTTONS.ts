//src/features/basic-calculator/model/BUTTONS
type ButtonVariant = 'action' | 'operator' | 'default'
type ButtonType = 'clear' | 'plusminus' | 'percent' | 'operator' | 'digit' | 'equal'

interface IButton {
  label: string
  variant?: ButtonVariant
  type?: ButtonType
  value?: string
  isWide?: boolean
}

export const BUTTONS: IButton[] = [
  { label: 'AC', variant: 'action', type: 'clear' },
  { label: '±', variant: 'action', type: 'plusminus' },
  { label: '%', variant: 'action', type: 'percent' },
  { label: '÷', variant: 'operator', type: 'operator', value: '÷' },

  { label: '7', type: 'digit' },
  { label: '8', type: 'digit' },
  { label: '9', type: 'digit' },
  { label: '×', variant: 'operator', type: 'operator', value: '×' },

  { label: '4', type: 'digit' },
  { label: '5', type: 'digit' },
  { label: '6', type: 'digit' },
  { label: '–', variant: 'operator', type: 'operator', value: '-' },

  { label: '1', type: 'digit' },
  { label: '2', type: 'digit' },
  { label: '3', type: 'digit' },
  { label: '+', variant: 'operator', type: 'operator', value: '+' },

  { label: '0', type: 'digit', isWide: true },
  { label: '.', type: 'digit' },
  { label: '=', variant: 'operator', type: 'equal' },
] as const
