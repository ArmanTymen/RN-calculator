import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VacationFormData, vacationTypeSchema } from './schema'

interface VacationPersistState {
  // Храним только ЧИСТЫЕ данные (infer/output)
  savedFormData: VacationFormData | null
  _hasHydrated: boolean
  setSavedFormData: (data: VacationFormData) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

const defaultValues: VacationFormData = {
  hiringDate: new Date(),
  calculationDate: new Date(),
  excludedPeriods: [],
  annualVacationDays: 0,
  usedDays: 0,
  averageEarnings: 0,
}

export const useVacationPersistStore = create<VacationPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false,
      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      name: 'vacation-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),
      merge: (
        persistedState: unknown,
        currentState: VacationPersistState
      ): VacationPersistState => {
        const typedPersistedState = persistedState as Partial<VacationPersistState>
        const rawData = typedPersistedState?.savedFormData

        if (!rawData) return currentState

        const result = vacationTypeSchema.safeParse(rawData)

        if (!result.success) {
          console.error('VACATION_STORAGE_CORRUPTION:', result.error)
          return currentState
        }

        // Теперь result.data — это VacationFormData, и TS доволен
        return {
          ...currentState,
          savedFormData: result.data,
        }
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
