// entities/tax/model/store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { calculateYearlyIncomes } from './sync-years'
import { PropertyTaxFormInput } from './schema'

export interface TaxPersistState {
  savedFormData: PropertyTaxFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: PropertyTaxFormInput) => void
  // Экшен для обновления года с автоматическим пересчетом массива доходов
  updatePurchaseYear: (year: string) => void
  setHasHydrated: (state: boolean) => void
}

export const useTaxPersistStore = create<TaxPersistState>()(
  persist(
    (set, get) => ({
      savedFormData: null,
      _hasHydrated: false,

      setSavedFormData: (data) => set({ savedFormData: data }),

      updatePurchaseYear: (year) => {
        const currentData = get().savedFormData
        if (!currentData) return

        // Синхронизируем доходы прямо в сторе
        const newIncomes = calculateYearlyIncomes(year, currentData.yearlyIncomes)

        set({
          savedFormData: {
            ...currentData,
            purchaseYear: year,
            yearlyIncomes: newIncomes,
          },
        })
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'tax-deduction-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
