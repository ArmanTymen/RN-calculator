import { ViewStyle } from 'react-native'
import { Theme } from 'react-native-calendars/src/types'

export interface CustomCalendarTheme extends Theme {
  'stylesheet.calendar.header'?: {
    header?: ViewStyle
  }
}
