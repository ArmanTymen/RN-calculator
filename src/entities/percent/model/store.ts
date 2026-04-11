import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PercentFormInput } from './schema'

interface PercentState {
  savedData: PercentFormInput | null
  isHydrated: boolean
  setSavedData: (data: PercentFormInput) => void
  setHydrated: (state: boolean) => void
  resetStore: () => void
}

const DEFAULT_VALUES: PercentFormInput = {
  operationType: 'percent_of_number',
  val1: 0,
  val2: 0,
  decimals: 2,
}

export const usePercentStore = create<PercentState>()(
  persist(
    (set) => ({
      savedData: null,
      isHydrated: false,

      setSavedData: (data) => set({ savedData: data }),
      setHydrated: (state) => set({ isHydrated: state }),
      resetStore: () => set({ savedData: DEFAULT_VALUES }),
    }),
    {
      // Меняем ключ на v1. Если схема изменится — просто поменяем на v2
      name: 'percent-calculator-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),

      // КРИТИЧНО: Сохраняем только данные формы, а не технические флаги
      partialize: (state) => ({ savedData: state.savedData }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true)
        }
      },
    }
  )
)
