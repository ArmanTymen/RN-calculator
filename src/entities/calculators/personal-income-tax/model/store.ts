import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersonalTaxIncomeFormInput, personalTaxIncomeTypeSchema } from './schema'

interface TaxPersistState {
  savedFormData: PersonalTaxIncomeFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: PersonalTaxIncomeFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

type PersistedStorage = Pick<TaxPersistState, 'savedFormData'>

const defaultValues: PersonalTaxIncomeFormInput = {
  incomeType: 'dividends',
  income: 0,
  incomeMode: 'gross',
  taxDeduction: 0,
  isNonResident: false,
  isSpecialCategory: false,
  hasDistrictCoefficient: false,
  districtCoefficient: 1,
  northernBonus: 0,
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
      name: 'tax-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      merge: (persistedState, currentState): TaxPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined
        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = personalTaxIncomeTypeSchema.safeParse(rawData)

        if (!result.success) {
          console.error('[TAX_STORE_VALIDATION_ERROR]', result.error)
          return currentState
        }

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
