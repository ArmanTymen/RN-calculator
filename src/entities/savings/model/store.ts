import { create } from 'zustand'
import { createJSONStorage, persist, StorageValue } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SavingsFormInput, savingsFormValuesSchema } from './schema' // Импортируем схему

interface SavingsPersistState {
  savedFormData: SavingsFormInput | null
  _hasHydrated: boolean
  setSavedFormData: (data: SavingsFormInput) => void
  setHasHydrated: (state: boolean) => void
  clearStorage: () => void
}

// 1. Типизируем структуру сохраняемых данных
type PersistedStorage = Pick<SavingsPersistState, 'savedFormData'>

const defaultValues: SavingsFormInput = {
  depositAmount: 0,
  currency: 'RUB',
  duration: 0,
  durationUnit: 'days',
  interestRateType: 'depends_on_amount',
  interestRate: 0,
  isCapitalization: false,
  payoutFrequency: 'daily',
  limit: 0,
}

export const useSavingsPersistStore = create<SavingsPersistState>()(
  persist(
    (set) => ({
      savedFormData: null,
      _hasHydrated: false,

      setSavedFormData: (data) => set({ savedFormData: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clearStorage: () => set({ savedFormData: defaultValues }),
    }),
    {
      name: 'savings-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),

      // Сохраняем только саму форму
      partialize: (state) => ({ savedFormData: state.savedFormData }),

      // 2. Метод merge — это фильтр/валидатор между AsyncStorage и твоим State
      merge: (persistedState, currentState): SavingsPersistState => {
        const storageValue = persistedState as StorageValue<PersistedStorage> | undefined
        const rawData = storageValue?.state?.savedFormData

        // Если в памяти пусто — работаем с дефолтным null
        if (!rawData) return currentState

        // 3. Пытаемся распарсить данные старой версии под новую схему
        const result = savingsFormValuesSchema.safeParse(rawData)

        if (!result.success) {
          // Если пользователь обновил приложение и схема изменилась —
          // сбрасываем данные, чтобы избежать краша
          console.error('[SAVINGS_STORE_HYDRATION_ERROR]', result.error)
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
