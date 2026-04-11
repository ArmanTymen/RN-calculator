import { TouchableOpacity, Text } from 'react-native'

interface CurrencyChipProps {
  code: string
  onPress: () => void
  isActive: boolean
}

export const CurrencyChip = ({ code, onPress, isActive }: CurrencyChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`mr-2 rounded-md px-2 py-1 ${isActive ? 'bg-blue-100' : 'bg-slate-100'}`}
  >
    <Text className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
      {code}
    </Text>
  </TouchableOpacity>
)
