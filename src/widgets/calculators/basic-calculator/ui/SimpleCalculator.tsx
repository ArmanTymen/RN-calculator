import React from 'react'
import { View, useWindowDimensions, Text, ScrollView } from 'react-native'
import { CalculatorButton, CalculatorDisplay } from '@/features/calculators/simple-calculator-form'
import { BUTTONS_CONFIG } from '@/entities/calculators/simple-calculator/model/config'
import { useCalculatorStore } from '@/entities/calculators/simple-calculator/model/store'

export const SimpleCalculator = () => {
  const state = useCalculatorStore()
  const dispatch = useCalculatorStore((s) => s.dispatch)
  const { width } = useWindowDimensions()

  const paddingHorizontal = 16 * 4
  const gap = 12
  const buttonSize = (width - paddingHorizontal - gap * 3) / 4

  return (
    <View className="flex-1 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200">
      <View style={{ maxHeight: '20%', minHeight: 80 }} className="border-b border-slate-50 pb-4">
        <Text className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          История вычислений
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          {state.history.length === 0 ? (
            <Text className="py-1 text-right text-sm italic text-slate-200">История пуста</Text>
          ) : (
            state.history.map((item) => (
              <View key={item.id} className="flex-row items-center gap-2 py-1">
                <Text className="text-base text-slate-400">{item.equation} =</Text>
                <Text className="text-base font-bold text-slate-600">{item.result}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <View className="flex-1 justify-end pt-4">
        <CalculatorDisplay equation={state.equation} display={state.display} />

        <View className="flex-col gap-y-3 pt-4">
          {BUTTONS_CONFIG.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-between">
              {row.map((btn, btnIndex) => (
                <CalculatorButton
                  key={btnIndex}
                  label={typeof btn.label === 'function' ? btn.label(state) : btn.label}
                  onClick={() => dispatch(btn.action)}
                  textClass={btn.textClass}
                  containerClass={btn.containerClass}
                  colSpan={btn.colSpan}
                  size={buttonSize}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
