import { calculateVacationResults } from '@/entities/calculators/vacation-form/model/calculations'
import { Calendar, Clock, Wallet, Calculator, ArrowRightCircle } from 'lucide-react-native'
import React from 'react'
import { View, Text } from 'react-native'

// Извлекаем тип возвращаемого значения функции расчетов
type VacationResultsData = ReturnType<typeof calculateVacationResults>

interface VacationResultsProps {
  results: VacationResultsData | null
}

interface RowProps {
  label: string
  value: string | number
  subValue?: string
  isLast?: boolean
  icon: React.ElementType // Тип для Lucide-иконок
}

const Row = ({ label, value, subValue, isLast = false, icon: Icon }: RowProps) => (
  <View className={`py-4 ${!isLast ? 'border-b border-slate-100' : ''}`}>
    <View className="flex-row items-start">
      <View className="mr-3 mt-0.5 rounded-lg bg-slate-50 p-2">
        <Icon size={18} color="#64748b" />
      </View>

      <View className="flex-1">
        <View className="flex-row items-start justify-between">
          <Text className="mr-4 flex-1 text-sm font-medium text-slate-500">{label}</Text>
          <Text className="text-base font-bold text-slate-900">{value}</Text>
        </View>

        {subValue && (
          <View className="mt-1 flex-row items-center">
            <Calculator size={12} color="#94a3b8" />
            <Text className="ml-1 text-xs italic text-slate-400" numberOfLines={1}>
              {subValue}
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
)

export const VacationResults = ({ results }: VacationResultsProps) => {
  if (!results) return null

  return (
    <View className="mt-8">
      {/* Заголовок блока */}
      <View className="mb-4 flex-row items-center px-2">
        <ArrowRightCircle size={20} color="#3b82f6" />
        <Text className="ml-2 text-lg font-bold text-slate-900">Результаты расчета</Text>
      </View>

      <View className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-slate-200">
        <View className="p-4">
          <Row
            label="Общий период работы"
            value={results.totalDurationStr}
            subValue="За минусом исключаемых периодов"
            icon={Clock}
          />
          <Row label="Отпускной стаж" value={results.seniorityStr} icon={Calendar} />
          <Row
            label="Начислено дней отпуска"
            value={results.accruedDays}
            subValue={results.formula}
            icon={Calculator}
          />
          <Row
            label="Неиспользованные дни"
            value={results.unusedDays}
            subValue={results.unusedFormula}
            icon={Wallet}
            isLast={true}
          />
        </View>

        {/* Итоговый блок с компенсацией */}
        <View className="bg-blue-600 p-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-bold uppercase tracking-wider text-blue-100">
                Итоговая компенсация
              </Text>
              <Text className="mt-1 text-3xl font-black text-white">
                {results.compensation.toLocaleString('ru-RU')} ₽
              </Text>
            </View>
            <View className="rounded-2xl bg-white/20 p-3">
              <Wallet size={28} color="white" />
            </View>
          </View>

          <View className="mt-4 border-t border-white/20 pt-3">
            <Text className="text-right text-[10px] font-medium text-blue-100">
              Формула: {results.moneyFormula}
            </Text>
          </View>
        </View>
      </View>

      <Text className="mt-4 px-2 text-center text-[10px] leading-4 text-slate-400">
        * Расчет является предварительным. Точная сумма определяется бухгалтерией на основании
        среднего заработка за последние 12 месяцев.
      </Text>
    </View>
  )
}
