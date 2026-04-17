import { Pressable, ScrollView, Text, View } from 'react-native'
import { BottomSheetModal } from '../../bottom-sheet-modal'
import { UnitDefinition, UnitId } from '@/entities/converters/converter/model/schema'

interface UnitSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  units: UnitDefinition[]
  currentUnitId: UnitId
  onSelect: (id: UnitId) => void
}

export const UnitSelectorModal = ({
  isOpen,
  onClose,
  units,
  currentUnitId,
  onSelect,
}: UnitSelectorModalProps) => {
  return (
    <BottomSheetModal isOpen={isOpen} onClose={onClose} title="Выберите меру">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {units.map((unit) => {
          const isSelected = currentUnitId === unit.id

          return (
            <Pressable
              key={unit.id}
              onPress={() => onSelect(unit.id as UnitId)}
              className={`flex-row items-center justify-between border-b border-slate-50 py-5 active:opacity-60 ${
                isSelected ? '-mx-2 rounded-xl border-b-0 bg-blue-50/30 px-2' : ''
              }`}
            >
              <View className="flex-1">
                <Text
                  className={`text-lg ${
                    isSelected ? 'font-bold text-blue-700' : 'font-medium text-slate-700'
                  }`}
                >
                  {unit.label}
                </Text>
                <Text className="mt-0.5 text-xs uppercase tracking-widest text-slate-400">
                  {unit.system === 'metric' ? 'Метрическая' : 'Имперская'}
                </Text>
              </View>

              <View
                className={`rounded-lg px-3 py-1 ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}`}
              >
                <Text className={`font-bold ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                  {unit.shortLabel}
                </Text>
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </BottomSheetModal>
  )
}
