import { CreditForm } from '@/features/credit-form'
import { LoanResultDisplay } from '@/entities/loan'
import { CalculatorActionGrid } from '@/shared/ui/calculator-action-grid'
import { useCreditForm } from '@/features/credit-form/model/useCreditForm'
import { FormProvider, useWatch } from 'react-hook-form'
import { ActivityIndicator, Keyboard, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ScheduleModal } from '@/shared/ui/schedule-modal'
import { EarlyRepaymentModal } from '@/shared/ui/early-repayment-modal'
import { RefinanceModal } from '@/shared/ui/refinance-modal'

export const CreditCalculator = () => {
  const methods = useCreditForm()
  const {
    control,
    handleReset,
    activeModal,
    setActiveModal,
    scheduleData,
    addEarlyRepayment,
    removeEarlyRepayment,
    currentMonths,
    isHydrated,
  } = methods
  const paymentType = useWatch({ control, name: 'paymentType' })
  const isRefinanceEnabled = useWatch({ control, name: 'refinance.enabled' })

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
        <CreditForm control={control} />

        <LoanResultDisplay
          scheduleData={scheduleData}
          paymentType={paymentType}
          isRefinanceEnabled={isRefinanceEnabled}
        />

        <CalculatorActionGrid
          type="credit"
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
            setActiveModal('extra')
          }}
        />

        {activeModal === 'schedule' && (
          <ScheduleModal isOpen onClose={() => setActiveModal(null)} schedule={scheduleData} />
        )}

        {activeModal === 'early' && (
          <EarlyRepaymentModal
            isOpen
            onClose={() => setActiveModal(null)}
            onAdd={addEarlyRepayment}
            onRemove={removeEarlyRepayment}
            items={methods.getValues('earlyRepayments')}
            maxMonths={currentMonths}
          />
        )}

        {activeModal === 'extra' && (
          <RefinanceModal isOpen onClose={() => setActiveModal(null)} maxMonths={currentMonths} />
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
