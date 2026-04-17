import { ButtonConfig } from './types'

export const BUTTONS_CONFIG: ButtonConfig[][] = [
  [
    {
      label: (s) => (s.display === '0' ? 'AC' : 'C'),
      action: { type: 'CLEAR' },
      containerClass: 'bg-slate-200',
      textClass: 'text-slate-700 text-2xl font-bold',
    },
    {
      label: '±',
      action: { type: 'NEGATE' },
      containerClass: 'bg-slate-200',
      textClass: 'text-slate-700 text-3xl',
    },
    {
      label: '%',
      action: { type: 'PERCENT' },
      containerClass: 'bg-slate-200',
      textClass: 'text-slate-700 text-2xl',
    },
    {
      label: '÷',
      action: { type: 'OPERATOR', payload: '÷' },
      containerClass: 'bg-blue-600',
      textClass: 'text-white text-4xl',
    },
  ],
  [
    {
      label: '7',
      action: { type: 'DIGIT', payload: '7' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '8',
      action: { type: 'DIGIT', payload: '8' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '9',
      action: { type: 'DIGIT', payload: '9' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '×',
      action: { type: 'OPERATOR', payload: '×' },
      containerClass: 'bg-blue-600',
      textClass: 'text-white text-4xl',
    },
  ],
  [
    {
      label: '4',
      action: { type: 'DIGIT', payload: '4' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '5',
      action: { type: 'DIGIT', payload: '5' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '6',
      action: { type: 'DIGIT', payload: '6' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '−',
      action: { type: 'OPERATOR', payload: '-' },
      containerClass: 'bg-blue-600',
      textClass: 'text-white text-4xl',
    },
  ],
  [
    {
      label: '1',
      action: { type: 'DIGIT', payload: '1' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '2',
      action: { type: 'DIGIT', payload: '2' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '3',
      action: { type: 'DIGIT', payload: '3' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
    },
    {
      label: '+',
      action: { type: 'OPERATOR', payload: '+' },
      containerClass: 'bg-blue-600',
      textClass: 'text-white text-4xl',
    },
  ],
  [
    {
      label: '0',
      action: { type: 'DIGIT', payload: '0' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl font-medium',
      colSpan: 2,
    },
    {
      label: ',',
      action: { type: 'DOT' },
      containerClass: 'bg-white border border-slate-100',
      textClass: 'text-slate-900 text-3xl',
    },
    {
      label: '=',
      action: { type: 'EQUALS' },
      containerClass: 'bg-blue-600',
      textClass: 'text-white text-4xl',
    },
  ],
]
