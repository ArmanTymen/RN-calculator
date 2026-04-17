import {
  Calculator,
  CreditCard,
  Home,
  Percent,
  BadgeDollarSign,
  Briefcase,
  Landmark,
  Wallet,
} from 'lucide-react-native'
import { CalculatorGroup } from './types'

export const CALCULATOR_GROUPS: CalculatorGroup[] = [
  {
    id: 'daily',
    title: 'Повседневные расчеты',
    items: [
      {
        to: 'SimpleCalculatorPage',
        title: 'Калькулятор',
        description: 'Базовые арифметические операции',
        icon: Calculator,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      },
      {
        to: 'PercentagePage',
        title: 'Проценты',
        description: 'Скидки, наценки, доли',
        icon: Percent,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
      },
      {
        to: 'ExchangePage',
        title: 'Обменник',
        description: 'Конвертация валют по курсу ЦБ',
        icon: BadgeDollarSign,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
      },
    ],
  },
  {
    id: 'loans_investments',
    title: 'Кредиты и Сбережения',
    items: [
      {
        to: 'CreditPage',
        title: 'Кредит',
        description: 'Потребительский займ с досрочками',
        icon: CreditCard,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
      },
      {
        to: 'MortgagePage',
        title: 'Ипотека',
        description: 'Подробный расчет платежей',
        icon: Home,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
      },
      {
        to: 'SavingsPage',
        title: 'Вклады',
        description: 'Сложный процент и капитализация',
        icon: Landmark, // Лучше подходит для вкладов
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
      },
    ],
  },
  {
    id: 'work_taxes',
    title: 'Работа и Налоги',
    items: [
      {
        to: 'PersonalTaxIncomePage',
        title: 'НДФЛ',
        description: 'Расчет налогов с дохода',
        icon: Briefcase,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
      },
      {
        to: 'PropertyTaxDeductionPage',
        title: 'Имущественный вычет', // Исправлено название
        description: 'Возврат налогов за недвижимость',
        icon: Home,
        color: 'text-teal-600',
        bgColor: 'bg-teal-50',
      },
      {
        to: 'VacationPage',
        title: 'Отпускные',
        description: 'Расчет выплат для отпуска',
        icon: Wallet,
        color: 'text-sky-600',
        bgColor: 'bg-sky-50',
      },
    ],
  },
]
