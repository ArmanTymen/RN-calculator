import { VacationForm } from '@/features/calculators/vacation-form'
import { useVacationCalculator } from '@/features/calculators/vacation-form/model/useVacationCalculator'
import { VacationResults } from '@/features/calculators/vacation-form/ui/VacationResults'
import { InfoModal } from '@/shared/ui/info-modal'
import { FormProvider } from 'react-hook-form'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const VacationCalculator = () => {
  const methods = useVacationCalculator()
  const {
    showInfo,
    control,
    infoContent,
    setInfoContent,
    fields,
    addPeriod,
    removePeriod,
    results,
  } = useVacationCalculator()

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <VacationForm
            showInfo={showInfo}
            control={control}
            fields={fields}
            addPeriod={addPeriod}
            removePeriod={removePeriod}
          />

          <VacationResults results={results} />
        </ScrollView>
        <InfoModal
          visible={!!infoContent}
          title={infoContent?.title || ''}
          content={infoContent?.text || ''}
          onClose={() => setInfoContent(null)}
        />
      </FormProvider>
    </SafeAreaView>
  )
}
