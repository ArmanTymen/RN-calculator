import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { creditFormSchema, CreditFormValues } from './schema'

interface CreditPersistState {
  savedFormData: CreditFormValues | null
  _hasHydrated: boolean
  setSavedFormData: (data: CreditFormValues) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

type PersistedStorage = Pick<CreditPersistState, 'savedFormData'>

const defaultValues: CreditFormValues = {
  annualRate: 1,
  paymentType: 'annuity',
  earlyRepayments: [],
  amount: 1,
  months: 1,
  refinance: {
    enabled: false,
    atMonth: 0,
    newRate: 0,
    newMonths: 0,
  },
}

export const useCreditPersistStore = create<CreditPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false,

      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      name: 'credit-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      merge: (persistedState, currentState): CreditPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined

        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = creditFormSchema.safeParse(rawData)
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
