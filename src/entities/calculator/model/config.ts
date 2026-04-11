import { type CalculatorAction, type CalculatorState } from './types'

interface ButtonConfig {
  label: string | ((state: CalculatorState) => string)
  action: CalculatorAction
  containerClass: string
  textClass: string
  colSpan?: number
}

export const BUTTONS_CONFIG: ButtonConfig[][] = [
  [
    {
      label: (s) => (s.display === '0' ? 'AC' : 'C'),
      action: { type: 'CLEAR' },
      containerClass: 'bg-[#A5A5A5]',
      textClass: 'text-3xl font-bold',
    },
    {
      label: '±',
      action: { type: 'NEGATE' },
      containerClass: 'bg-[#A5A5A5]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '%',
      action: { type: 'PERCENT' },
      containerClass: 'bg-[#A5A5A5]',
      textClass: 'text-3xl font-medium',
    },
    {
      label: '÷',
      action: { type: 'OPERATOR', payload: '÷' },
      containerClass: 'bg-[#FF9F0A]',
      textClass: 'text-5xl font-medium',
    },
  ],
  [
    {
      label: '7',
      action: { type: 'DIGIT', payload: '7' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '8',
      action: { type: 'DIGIT', payload: '8' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '9',
      action: { type: 'DIGIT', payload: '9' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '×',
      action: { type: 'OPERATOR', payload: '×' },
      containerClass: 'bg-[#FF9F0A]',
      textClass: 'text-5xl font-medium',
    },
  ],
  [
    {
      label: '4',
      action: { type: 'DIGIT', payload: '4' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '5',
      action: { type: 'DIGIT', payload: '5' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '6',
      action: { type: 'DIGIT', payload: '6' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '−',
      action: { type: 'OPERATOR', payload: '-' },
      containerClass: 'bg-[#FF9F0A]',
      textClass: 'text-5xl font-medium',
    },
  ],
  [
    {
      label: '1',
      action: { type: 'DIGIT', payload: '1' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '2',
      action: { type: 'DIGIT', payload: '2' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '3',
      action: { type: 'DIGIT', payload: '3' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '+',
      action: { type: 'OPERATOR', payload: '+' },
      containerClass: 'bg-[#FF9F0A]',
      textClass: 'text-5xl font-medium',
    },
  ],
  [
    {
      label: '0',
      action: { type: 'DIGIT', payload: '0' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
      colSpan: 2,
    },
    {
      label: ',',
      action: { type: 'DOT' },
      containerClass: 'bg-[#333333]',
      textClass: 'text-4xl font-medium',
    },
    {
      label: '=',
      action: { type: 'EQUALS' },
      containerClass: 'bg-[#FF9F0A]',
      textClass: 'text-5xl font-medium',
    },
  ],
]
