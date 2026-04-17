import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Calculator, ArrowLeftRight, Settings as SettingsIcon } from 'lucide-react-native'
import { HomePage } from '@/pages/home-page'
import { Settings } from '@/pages/settings'
import { CalculatorStack } from './CalculatorStack'
import { RootParamList } from '@/shared/lib/navigation/types'
import { ConverterPage } from '@/pages/сonverter'

const Tab = createBottomTabNavigator<RootParamList>()

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#94a3b8',
    }}
  >
    <Tab.Screen
      name="HomePage"
      component={HomePage}
      options={{
        tabBarLabel: 'Главная',
        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Calculators"
      component={CalculatorStack}
      options={{
        tabBarLabel: 'Расчеты',
        tabBarIcon: ({ color, size }) => <Calculator color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="ConverterPage"
      component={ConverterPage}
      options={{
        tabBarLabel: 'Конвертер',
        tabBarIcon: ({ color, size }) => <ArrowLeftRight color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarLabel: 'Настройки',
        tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
)
