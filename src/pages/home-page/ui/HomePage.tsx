import { InfoDashboard } from '@/widgets/info-dashboard'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-4 pb-24">
          <View className="mb-8 items-center">
            <Text className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              Официальные данные
            </Text>
            <Text className="text-2xl font-black tracking-tight text-slate-900">Данные ЦБ на</Text>
          </View>

          <View className="mx-auto w-full max-w-md">
            <InfoDashboard />
          </View>
        </View>

        <View className="items-center py-6">
          <Text className="text-xs text-slate-400">Приложение MyMeds • 2026</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
