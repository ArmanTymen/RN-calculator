import { useState, useMemo } from 'react'

interface UseDatePickerProps {
  currentDate: Date
  onClose: () => void
}

export const useDatePicker = ({ currentDate, onClose }: UseDatePickerProps) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'picker'>('calendar')
  const [navDate, setNavDate] = useState<Date>(currentDate)

  const months = useMemo(
    () => [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    []
  )

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 100 }, (_, i) => currentYear - 80 + i)
  }, [])

  const handleNavDateChange = (type: 'year' | 'month', value: number) => {
    const newDate = new Date(navDate)
    if (type === 'year') newDate.setFullYear(value)
    else newDate.setMonth(value)
    setNavDate(newDate)
  }

  const toggleMode = () => setViewMode((prev) => (prev === 'calendar' ? 'picker' : 'calendar'))

  const resetAndClose = () => {
    setViewMode('calendar')
    setNavDate(currentDate)
    onClose()
  }

  return {
    viewMode,
    setViewMode,
    navDate,
    setNavDate,
    months,
    years,
    handleNavDateChange,
    toggleMode,
    resetAndClose,
  }
}
