// entities/tax/model/store.ts
import { create } from 'zustand'
import { persist, createJSONStorage, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PropertyTaxFormInput, propertyTaxFormSchema } from './schema'

export interface TaxPersistState {
  savedFormData: PropertyTaxFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: PropertyTaxFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

type PersistedStorage = Pick<TaxPersistState, 'savedFormData'>

const defaultValues: PropertyTaxFormInput = {
  propertyValue: 0,
  purchaseYear: new Date().getFullYear().toString(),
  isPreviouslyUsed: false,
  alreadyReceivedAmount: 0,
  yearlyIncomes: [],
  updatePurchaseYear: new Date().getFullYear().toString(),
}

export const useTaxPersistStore = create<TaxPersistState>()(
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
      merge: (persistedState, currentState): TaxPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined

        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = propertyTaxFormSchema.safeParse(rawData)
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
