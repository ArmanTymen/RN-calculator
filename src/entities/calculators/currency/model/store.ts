import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CurrencyConverterFormInput, currencyConverterFormSchema } from './schema'

interface CurrencyConverterPersistState {
  savedFormData: CurrencyConverterFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: CurrencyConverterFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

type PersistedStorage = Pick<CurrencyConverterPersistState, 'savedFormData'>

const defaultValues: CurrencyConverterFormInput = {
  amount: 0,
  sourceCurrency: 'USD',
  targetCurrency: 'RUB',
  rateDate: new Date(),
}

export const useCurrencyConverterPersistStore = create<CurrencyConverterPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false,

      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      name: 'currency-converter-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      merge: (persistedState, currentState): CurrencyConverterPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined

        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = currencyConverterFormSchema.safeParse(rawData)
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
        state?.setHasHydrated(true)
      },
    }
  )
)
