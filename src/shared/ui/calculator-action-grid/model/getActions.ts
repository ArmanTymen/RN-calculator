import { Table, Zap, PiggyBank, Repeat, type LucideIcon } from 'lucide-react-native'

interface ActionConfig {
  icon: LucideIcon
  label: string
  description: string
  variant: 'primary' | 'secondary' | 'accent'
  onClick: () => void
}

interface Params {
  type: 'mortgage' | 'credit'
  onScheduleOpen: () => void
  onEarlyOpen: () => void
  onExtraOpen: () => void
}

export const getCalculatorActions = ({
  type,
  onScheduleOpen,
  onEarlyOpen,
  onExtraOpen,
}: Params): ActionConfig[] => [
  {
    icon: Table,
    label: 'График',
    description: 'По месяцам',
    variant: 'primary',
    onClick: onScheduleOpen,
  },
  {
    icon: Zap,
    label: 'Досрочно',
    description: 'Экономия',
    variant: 'secondary',
    onClick: onEarlyOpen,
  },
  type === 'mortgage'
    ? {
        icon: PiggyBank,
        label: 'Вычеты',
        description: 'Вернуть 13%',
        variant: 'accent',
        onClick: onExtraOpen,
      }
    : {
        icon: Repeat,
        label: 'Рефинанс',
        description: 'Снизить ставку',
        variant: 'accent',
        onClick: onExtraOpen,
      },
]
