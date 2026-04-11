import { NdflForm } from '@/features/ndfl-form'
import { ScrollView, View } from 'react-native'

export const NdflCalculator = () => {
  return (
    <ScrollView
      className="rounded-2xl bg-white p-6 shadow-md"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-col gap-5">
        <NdflForm />
      </View>
    </ScrollView>
  )
}
