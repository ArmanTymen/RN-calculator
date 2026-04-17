import { IncomeType, IncomeMode } from './schema'

export const INCOME_TYPES: Record<IncomeType, { label: string; id: string }> = {
  salary: { label: 'Заработная плата', id: '1' },
  svo_payments: { label: 'Выплаты, связанные с СВО', id: '10' },
  property_sale: { label: 'Доход с продажи имущества', id: '6' },
  rental_income: { label: 'Доход с аренды', id: '7' },
  securities_ops: { label: 'Доход по операциям с ценными бумагами', id: '9' },
  dividends: { label: 'Дивиденды', id: '2' },
  deposit_interest: { label: 'Проценты по вкладам', id: '8' },
  prizes: { label: 'Приз/выигрыш', id: '4' },
  promo_prizes: { label: 'Приз/выигрыш в рекламных мероприятиях', id: '11' },
  manual_rate: { label: 'Указать ставку вручную', id: '5' },
}

export const INCOME_MODES: { label: string; value: IncomeMode }[] = [
  { label: 'до вычета налога', value: 'gross' },
  { label: 'после вычета налога', value: 'net' },
]
