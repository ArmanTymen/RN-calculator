import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware' // ДОБАВЛЕН StorageValue
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ConverterFormInput, converterFormSchema } from './schema'

interface ConverterPersistState {
  savedFormData: ConverterFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: ConverterFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

// ДОБАВЛЕНО: Вспомогательный тип для безопасного парсинга
type PersistedStorage = Pick<ConverterPersistState, 'savedFormData'>

const defaultValues: ConverterFormInput = {
  inputValue: 0,
  conversionType: 'mi_to_km', // ДОБАВЛЕНО: дефолтное значение должно быть валидным enum
}

export const useConverterPersistStore = create<ConverterPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false,

      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      name: 'converter-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      // ДОБАВЛЕНО: Каноничный метод merge без any/unknown костылей
      merge: (persistedState, currentState): ConverterPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined

        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = converterFormSchema.safeParse(rawData)

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
