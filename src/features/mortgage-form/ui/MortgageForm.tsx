import { View } from 'react-native'
import { Control } from 'react-hook-form'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { MortgageFormInput } from '@/entities/mortgage'

interface MortgageFormProps {
  control: Control<MortgageFormInput>
}

export const MortgageForm = ({ control }: MortgageFormProps) => {
  return (
    <View className="flex-col gap-4">
      <ControlledNumberInput
        name="propertyPrice"
        control={control}
        label="Стоимость недвижимости"
        limit={1000000000}
        isFormatted
      />

      <ControlledNumberInput
        name="downPayment"
        control={control}
        label="Первоначальный взнос"
        limit={1000000000}
        isFormatted
      />

      <View className="flex-row gap-4">
        <View className="flex-1">
          <ControlledNumberInput
            name="annualRate"
            control={control}
            label="Ставка (%)"
            limit={50}
            step="0.1"
          />
        </View>
        <View className="flex-1">
          <ControlledNumberInput name="years" control={control} label="Срок (лет)" limit={50} />
        </View>
      </View>
    </View>
  )
}
