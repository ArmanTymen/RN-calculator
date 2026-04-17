import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { UnitSelectorModal } from '@/shared/ui/unit-selector-modal'
import { Converter } from '@/features/converter'
import { UnitId } from '@/entities/converters/converter/model/schema'
import { useConverter } from '@/features/converter/model/useConverter'

export const ConverterBlock = () => {
  const { control, bulkResults, category, fromUnit, updateField, availableUnits } = useConverter()
  const [isUnitSelectorOpen, setIsUnitSelectorOpen] = useState(false)

  const handleUnitSelect = (id: UnitId) => {
    updateField({ fromUnit: id }) // Теперь функция существует
    setIsUnitSelectorOpen(false)
  }

  return (
    <>
      <Text className="mb-8 text-base text-slate-500">Перевод метрических и имперских величин</Text>

      <Converter
        control={control}
        category={category}
        fromUnit={fromUnit as UnitId}
        updateField={updateField}
        availableUnits={availableUnits}
        setIsUnitSelectorOpen={setIsUnitSelectorOpen}
      />

      <View className="mb-12 mt-4">
        <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {bulkResults.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row items-center justify-between p-4 ${
                index !== bulkResults.length - 1 ? 'border-b border-slate-100' : ''
              } ${item.id === fromUnit ? 'bg-blue-50/40' : ''}`}
            >
              <View className="flex-1 pr-4">
                <Text
                  className={`text-base ${item.id === fromUnit ? 'font-bold text-blue-700' : 'text-slate-700'}`}
                >
                  {item.label}
                </Text>
                <Text className="mt-0.5 text-[10px] uppercase text-slate-400">
                  {item.system === 'metric' ? 'Метрическая' : 'Имперская'}
                </Text>
              </View>
              <Text
                className={`text-lg font-semibold ${item.id === fromUnit ? 'text-blue-700' : 'text-slate-900'}`}
              >
                {/* Форматируем вывод с пробелами */}
                {Number(item.convertedValue).toLocaleString('ru-RU')}
                <Text className="text-sm font-normal text-slate-400"> {item.shortLabel}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      <UnitSelectorModal
        isOpen={isUnitSelectorOpen}
        onClose={() => setIsUnitSelectorOpen(false)}
        units={availableUnits}
        currentUnitId={fromUnit as UnitId}
        onSelect={handleUnitSelect}
      />
    </>
  )
}
