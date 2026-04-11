import type { LucideIcon } from 'lucide-react-native'

export type ButtonVariant = 'primary' | 'secondary' | 'accent'

export interface VariantSettings {
  container: string
  icon: string
  text: string
}

export const VARIANTS: Record<ButtonVariant, VariantSettings> = {
  primary: {
    container: 'bg-blue-50 border-blue-100',
    icon: '#2563eb', // blue-600
    text: 'text-blue-600',
  },
  secondary: {
    container: 'bg-emerald-50 border-emerald-100',
    icon: '#059669', // emerald-600
    text: 'text-emerald-600',
  },
  accent: {
    container: 'bg-purple-50 border-purple-100',
    icon: '#9333ea', // purple-600
    text: 'text-purple-600',
  },
}

export interface ActionButtonProps {
  icon: LucideIcon
  label: string
  description: string
  onPress: () => void
  variant?: ButtonVariant
  className?: string
}
