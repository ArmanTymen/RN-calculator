import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware' // Добавлен StorageValue
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VacationFormInput, vacationTypeSchema } from './schema' // Импорт схемы обязателен

interface VacationPersistState {
  savedFormData: VacationFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: VacationFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

// 1. Типизируем то, что конкретно мы сохраняем (из partialize)
type PersistedStorage = Pick<VacationPersistState, 'savedFormData'>

const defaultValues: VacationFormInput = {
  hiringDate: new Date(),
  calculationDate: new Date(),
  excludedDays: 0,
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

      // 2. КЛЮЧЕВОЙ ЭЛЕМЕНТ: Безопасное слияние
      merge: (persistedState, currentState): VacationPersistState => {
        // Приводим к типу хранилища
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined
        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        // 3. Валидация через Zod.
        // Именно здесь z.coerce.date() превратит строку из хранилища обратно в объект Date!
        const result = vacationTypeSchema.safeParse(rawData)

        if (!result.success) {
          console.error('VACATION_STORAGE_CORRUPTION:', result.error)
          return currentState // Если данные битые, оставляем дефолт
        }

        return {
          ...currentState,
          savedFormData: result.data, // Здесь уже чистые, провалидированные данные
        }
      },

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
