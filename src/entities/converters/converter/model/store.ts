import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ConverterFormOutput, converterFormSchema } from './schema' // Используем Output!

interface ConverterPersistState {
  savedFormData: ConverterFormOutput | null
  _hasHydrated: boolean
  setSavedFormData: (data: ConverterFormOutput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

const defaultValues: ConverterFormOutput = {
  inputValue: 1,
  category: 'volume',
  fromUnit: 'barrel_oil',
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

      // Исправленный merge, как в VacationStore
      merge: (
        persistedState: unknown,
        currentState: ConverterPersistState
      ): ConverterPersistState => {
        const typedPersistedState = persistedState as Partial<ConverterPersistState>
        const rawData = typedPersistedState?.savedFormData

        if (!rawData) return currentState

        const result = converterFormSchema.safeParse(rawData)
        if (!result.success) {
          console.error('[CONVERTER_STORE_HYDRATION_ERROR]', result.error)
          return currentState
        }

        return {
          ...currentState,
          savedFormData: result.data, // Теперь типы идеально совпадают
        }
      },

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
