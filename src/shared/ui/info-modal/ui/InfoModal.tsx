import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { X } from 'lucide-react-native'

interface Props {
  visible: boolean
  title: string
  content: string
  onClose: () => void
}

export const InfoModal = ({ visible, title, content, onClose }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 items-center justify-center bg-black/50 p-6">
      <View className="w-full rounded-3xl bg-white p-6 shadow-xl">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-slate-900">{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#64748b" />
          </TouchableOpacity>
        </View>
        <Text className="text-base leading-6 text-slate-600">{content}</Text>
      </View>
    </View>
  </Modal>
)

{
  /* <Text>
        Периоды, не включаемые в отпускной стаж В стаж работы, дающий право на ежегодный основной
        оплачиваемый отпуск, не включаются следующие периоды: время отсутствия на работе без
        уважительных причин; время отпусков по уходу за ребёнком до достижения им установленного
        законом возраста; время отпусков за свой счёт свыше 14 календарных дней в течение рабочего
        года.(модалку для этой инфы может сделать, я хз)
      </Text>

      <Text>
              Продолжительность ежегодного оплачиваемого отпуска Стандартная продолжительность отпуска –
              28 календарных дней. Некоторым категориям работников положен более длинный отпуск: инвалиды
              30 работники моложе 18 лет, работники с ненормированным рабочим днём 31 работники, занятые
              на работах с вредными (2, 3 или 4 степени) и/или опасными условиями труда 35 работники,
              трудящиеся в местности, приравненной к районам Крайнего Севера 44 работники, трудящиеся в
              районах Крайнего Севера 52 педагогические работники 42 / 56 (Это тоже по идее как информация
              больше, поэтому я хз может в модалку такое пихать чтобы много места не занимало, или как
              лучше в мобилке делать?)
            </Text> */
}
