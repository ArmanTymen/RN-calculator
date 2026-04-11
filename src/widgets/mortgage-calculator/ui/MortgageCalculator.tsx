import { ScrollView, Keyboard, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { FormProvider } from 'react-hook-form'
import { CalculatorActionGrid } from '@/shared/ui/calculator-action-grid'
import { ScheduleModal } from '@/shared/ui/schedule-modal'
import { EarlyRepaymentModal } from '@/shared/ui/early-repayment-modal'
import { DeductionsModal } from '@/shared/ui/deductions-modal'
import { LoanResultDisplay } from '@/entities/loan'
import { useMortgageForm } from '@/features/mortgage-form/model/useMortgageForm'
import { MortgageForm } from '@/features/mortgage-form'

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
    <FormProvider {...methods}>
      <ScrollView
        className="rounded-2xl bg-white p-6 shadow-md"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
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
        <TouchableOpacity
          onPress={handleReset}
          className="mb-4 mt-8 items-center justify-center py-2"
        >
          <Text className="text-sm font-semibold text-red-500 opacity-80">Сбросить расчеты</Text>
        </TouchableOpacity>
      </ScrollView>
    </FormProvider>
  )
}
