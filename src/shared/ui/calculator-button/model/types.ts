export type ButtonVariant = 'number' | 'operator' | 'action'

export interface VariantSettings {
  container: string
  text: string
  haptic: 'impactLight' | 'impactMedium'
}

export const VARIANTS: Record<ButtonVariant, VariantSettings> = {
  number: {
    container: 'bg-[#333333] active:bg-zinc-700',
    text: 'text-white',
    haptic: 'impactLight',
  },
  operator: {
    container: 'bg-[#FF9F0A] active:bg-orange-400',
    text: 'text-white',
    haptic: 'impactMedium',
  },
  action: {
    container: 'bg-[#A5A5A5] active:bg-zinc-300',
    text: 'text-black',
    haptic: 'impactLight',
  },
}

export interface CalcButtonProps {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  className?: string
}
