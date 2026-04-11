import { Modal, View, Text, Pressable, Switch } from 'react-native'
import { X } from 'lucide-react-native'
import { useFormContext, Controller } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { CreditFormValues } from '@/entities/credit'
import { generateDateOptions } from '@/shared/lib'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'

interface RefinanceModalProps {
  isOpen: boolean
  onClose: () => void
  maxMonths: number
}

export const RefinanceModal = ({ isOpen, onClose, maxMonths }: RefinanceModalProps) => {
  const { control, watch } = useFormContext<CreditFormValues>()
  const isEnabled = watch('refinance.enabled')
  const dateOptions = generateDateOptions(maxMonths || 120)

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-slate-900/50">
        <View className="w-full flex-col rounded-t-3xl bg-white px-6 pb-10 pt-6 shadow-xl">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-slate-900">Рефинансирование</Text>
            <Pressable onPress={onClose} className="rounded-full bg-slate-100 p-2">
              <X color="#64748b" size={20} />
            </Pressable>
          </View>

          <View className="flex-col gap-6">
            <Controller
              control={control}
              name="refinance.enabled"
              render={({ field: { onChange, value } }) => (
                <View className="flex-row items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <Text className="font-medium text-slate-700">Включить расчет</Text>
                  <Switch
                    trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
                    thumbColor="white"
                    onValueChange={onChange}
                    value={value}
                  />
                </View>
              )}
            />

            <View
              className={`flex-col gap-4 ${isEnabled ? 'opacity-100' : 'opacity-30'}`}
              pointerEvents={isEnabled ? 'auto' : 'none'}
            >
              <View className="flex-col gap-2">
                <Text className="text-sm font-medium text-slate-700">
                  Дата перехода на новые условия
                </Text>
                <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Controller
                    control={control}
                    name="refinance.atMonth"
                    render={({ field: { onChange, value } }) => (
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(Number(itemValue))}
                      >
                        {dateOptions.map((opt) => (
                          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                        ))}
                      </Picker>
                    )}
                  />
                </View>
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <ControlledNumberInput
                    name="refinance.newRate"
                    control={control}
                    label="Новая ставка (%)"
                    limit={50}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View className="flex-1">
                  <ControlledNumberInput
                    name="refinance.newMonths"
                    control={control}
                    label="Новый срок (мес)"
                    limit={480}
                  />
                </View>
              </View>
            </View>

            <Pressable
              onPress={onClose}
              className="mt-2 w-full items-center rounded-2xl bg-blue-600 py-4 active:bg-blue-700"
            >
              <Text className="font-bold text-white">Применить</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
