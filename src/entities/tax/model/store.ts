import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TaxFormInput, taxTypeSchema } from './schema' // Импортируем схему для валидации

interface TaxPersistState {
  savedFormData: TaxFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: TaxFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

// 1. Описываем структуру того, что реально сохраняется (из partialize)
type PersistedStorage = Pick<TaxPersistState, 'savedFormData'>

const defaultValues: TaxFormInput = {
  incomeType: 'dividends',
  income: 0,
  incomeMode: 'gross',
  taxDeduction: 0,
  isNonResident: false,
  isSpecialCategory: false,
  hasDistrictCoefficient: false,
  districtCoefficient: 0,
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

      // Сохраняем только данные формы
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      // 2. Добавляем каноничный merge
      merge: (persistedState, currentState): TaxPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined
        const rawData = storageValue?.state?.savedFormData

        // Если данных нет — возвращаем текущее состояние (null)
        if (!rawData) return currentState

        // 3. Валидация через Zod "на лету"
        const result = taxTypeSchema.safeParse(rawData)

        if (!result.success) {
          // Если данные в хранилище не соответствуют новой схеме — логируем и сбрасываем
          console.error('[TAX_STORE_VALIDATION_ERROR]', result.error)
          return currentState
        }

        return {
          ...currentState,
          savedFormData: result.data, // Данные гарантированно чистые и типизированные
        }
      },

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
