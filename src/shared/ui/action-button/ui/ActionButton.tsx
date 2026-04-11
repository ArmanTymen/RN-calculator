import { View, Text, Pressable } from 'react-native'
import { ActionButtonProps, VARIANTS } from '../model/types'

export const ActionButton = ({
  icon: Icon,
  label,
  description,
  onPress,
  variant = 'primary',
  className = '',
}: ActionButtonProps) => {
  const config = VARIANTS[variant]

  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border p-4 active:scale-95 ${config.container} ${className}`}
    >
      <View className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/50">
        <Icon color={config.icon} size={24} />
      </View>

      <View className="items-center">
        <Text numberOfLines={1} className={`text-center text-[11px] font-bold ${config.text}`}>
          {label}
        </Text>
        <Text numberOfLines={2} className="mt-1 text-center text-[9px] opacity-70">
          {description}
        </Text>
      </View>
    </Pressable>
  )
}
