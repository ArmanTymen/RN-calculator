import { View, Text } from 'react-native'
import { ActionButton } from '@/shared/ui/action-button/ui/ActionButton'
import { getCalculatorActions } from '../model/getActions'

interface Props {
  type: 'mortgage' | 'credit'
  onScheduleOpen: () => void
  onEarlyOpen: () => void
  onExtraOpen: () => void
}

export const CalculatorActionGrid = (props: Props) => {
  const actions = getCalculatorActions(props)

  return (
    <View className="mt-6">
      <Text className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Дополнительные возможности
      </Text>

      <View className="flex-row flex-wrap items-stretch justify-between gap-y-3">
        {actions.map((btn) => (
          <View key={btn.label} style={{ width: '31%' }}>
            <ActionButton
              icon={btn.icon}
              label={btn.label}
              description={btn.description}
              variant={btn.variant}
              onPress={btn.onClick}
            />
          </View>
        ))}
      </View>
    </View>
  )
}
