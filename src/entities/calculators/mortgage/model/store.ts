import { MortgageFormValues } from './types'
import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mortgageFormSchema } from './schema'

interface MortgagePersistState {
  savedFormData: MortgageFormValues | null
  _hasHydrated: boolean
  setSavedFormData: (data: MortgageFormValues) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

type PersistedStorage = Pick<MortgagePersistState, 'savedFormData'>

const defaultValues: MortgageFormValues = {
  propertyPrice: 0,
  downPayment: 0,
  annualRate: 0,
  years: 0,
  earlyRepayments: [],
  deductions: { isMarried: false },
}

export const useMortgagePersistStore = create<MortgagePersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false,
      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      name: 'mortgage-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),
      merge: (persistedState, currentState): MortgagePersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined

        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = mortgageFormSchema.safeParse(rawData)
        if (!result.success) {
          console.error('[SAVINGS_STORE_HYDRATION_ERROR]', result.error)
          return currentState
        }
        return {
          ...currentState,
          savedFormData: result.success ? result.data : currentState.savedFormData,
        }
      },

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    }
  )
)
