import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CalculatorState, CalculatorAction } from './types'
import { calculatorReducer, initialState } from './reducer'

interface CalculatorStore extends CalculatorState {
  dispatch: (action: CalculatorAction) => void
}

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set) => ({
      ...initialState,
      dispatch: (action: CalculatorAction) => set((state) => calculatorReducer(state, action)),
    }),
    {
      name: 'calculator-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ history: state.history }),
    }
  )
)
