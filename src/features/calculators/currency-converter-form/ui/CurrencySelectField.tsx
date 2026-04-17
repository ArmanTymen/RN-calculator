//src/features/converter-form/ui
import { CURRENCIES, CurrencyCode } from '@/entities/calculators/currency'
import { CurrencyChip } from '@/shared/ui/currency-chip'
import { FieldValues, Path, Control, Controller } from 'react-hook-form'
import { Text, View } from 'react-native'

interface CurrencySelectFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  currentValue: CurrencyCode
}

export const CurrencySelectField = <T extends FieldValues>({
  name,
  control,
  currentValue,
}: CurrencySelectFieldProps<T>) => (
  <View>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <View>
          <View className="h-12 flex-row items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
            <Text className="text-base font-bold text-slate-900">
              {CURRENCIES.find((c) => c.code === currentValue)?.flag} {currentValue}
            </Text>
          </View>
          <View className="mt-2 flex-row justify-center">
            {CURRENCIES.map((c) => (
              <CurrencyChip
                key={c.code}
                code={c.code}
                isActive={currentValue === c.code}
                onPress={() => onChange(c.code)}
              />
            ))}
          </View>
        </View>
      )}
    />
  </View>
)
