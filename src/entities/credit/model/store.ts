import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CreditFormValues } from './schema'

interface CreditPersistState {
  savedFormData: CreditFormValues | null
  _hasHydrated: boolean
  setSavedFormData: (data: CreditFormValues) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

const defaultValues: CreditFormValues = {
  annualRate: 0,
  paymentType: 'annuity',
  earlyRepayments: [],
  amount: 0,
  months: 0,
  refinance: {
    enabled: false,
    atMonth: 0,
    newRate: 0,
    newMonths: 0,
  },
}

export const useCreditPersistStore = create<CreditPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false, // Флаг окончания чтения из AsyncStorage

      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      // Паттерн: Версионирование кэша. Если схема данных (Zod) изменится,
      // меняем ключ на v2, чтобы избежать крашей от старых данных юзера.
      name: 'credit-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),

      // Паттерн: Partialize. Фильтруем то, что улетает в AsyncStorage.
      // Мы НЕ должны сохранять технический флаг _hasHydrated.
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      // Паттерн: Hydration Hook. AsyncStorage асинхронен.
      // При старте прилы данные не готовы. Этот коллбэк скажет, когда можно рендерить форму.
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    }
  )
)
