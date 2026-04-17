import { ScrollView, Keyboard, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { FormProvider } from 'react-hook-form'
import { CalculatorActionGrid } from '@/shared/ui/calculator-action-grid'
import { ScheduleModal } from '@/shared/ui/schedule-modal'
import { EarlyRepaymentModal } from '@/shared/ui/early-repayment-modal'
import { DeductionsModal } from '@/shared/ui/deductions-modal'
import { LoanResultDisplay } from '@/entities/calculators/loan'
import { useMortgageForm } from '@/features/calculators/mortgage-form/model/useMortgageForm'
import { MortgageForm } from '@/features/calculators/mortgage-form'
import { SafeAreaView } from 'react-native-safe-area-context'

export const MortgageCalculator = () => {
  const methods = useMortgageForm()
  const {
    control,
    scheduleData,
    activeModal,
    setActiveModal,
    addEarlyRepayment,
    removeEarlyRepayment,
    earlyRepayments,
    currentMonths,
    handleReset,
    isHydrated,
  } = methods

  if (!isHydrated) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <MortgageForm control={control} />
          <LoanResultDisplay scheduleData={scheduleData} />

          <CalculatorActionGrid
            type="mortgage"
            onScheduleOpen={() => {
              Keyboard.dismiss()
              setActiveModal('schedule')
            }}
            onEarlyOpen={() => {
              Keyboard.dismiss()
              setActiveModal('early')
            }}
            onExtraOpen={() => {
              Keyboard.dismiss()
              setActiveModal('deductions')
            }}
          />

          <TouchableOpacity
            onPress={handleReset}
            className="mb-4 mt-8 items-center justify-center py-2"
          >
            <Text className="text-sm font-semibold text-red-500 opacity-80">Сбросить расчеты</Text>
          </TouchableOpacity>
        </ScrollView>
        {activeModal === 'schedule' && (
          <ScheduleModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            schedule={scheduleData}
          />
        )}

        {activeModal === 'early' && (
          <EarlyRepaymentModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onAdd={addEarlyRepayment}
            onRemove={removeEarlyRepayment}
            items={earlyRepayments}
            maxMonths={currentMonths}
          />
        )}

        {activeModal === 'deductions' && (
          <DeductionsModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            scheduleData={scheduleData}
          />
        )}
      </FormProvider>
    </SafeAreaView>
  )
}
