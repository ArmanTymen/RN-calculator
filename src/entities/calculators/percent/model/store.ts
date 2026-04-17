import { create } from 'zustand'
import { persist, createJSONStorage, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PercentFormInput, percentFormSchema } from './schema'

interface PercentPersistState {
  savedFormData: PercentFormInput | null
  isHydrated: boolean
  setSavedData: (data: PercentFormInput) => void
  setHydrated: (state: boolean) => void
  resetStore: () => void
}

type PersistedStorage = Pick<PercentPersistState, 'savedFormData'>

const DEFAULT_VALUES: PercentFormInput = {
  operationType: 'percent_of_number',
  val1: 0,
  val2: 0,
  decimals: 2,
}

export const usePercentStore = create<PercentPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      isHydrated: false,

      setSavedData: (data) => set({ savedFormData: data }),
      setHydrated: (state) => set({ isHydrated: state }),
      resetStore: () => set({ savedFormData: DEFAULT_VALUES }),
    }),
    {
      name: 'percent-calculator-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedData: state.savedFormData }),

      merge: (persistedState, currentState): PercentPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined

        const rawData = storageValue?.state?.savedFormData

        if (!rawData) return currentState

        const result = percentFormSchema.safeParse(rawData)
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
          state.setHydrated(true)
        }
      },
    }
  )
)
