// shared/ui/bottom-sheet-modal/BottomSheetModal.tsx
import React, { useRef, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native'
import { X } from 'lucide-react-native'

interface BottomSheetModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  /** Дополнительные элементы в шапку (например, кнопка сброса) */
  headerRight?: React.ReactNode
  /** Включает обработку клавиатуры для модалок с инпутами */
  enableKeyboardHandling?: boolean
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const BottomSheetModal = ({
  isOpen,
  onClose,
  title,
  children,
  headerRight,
  enableKeyboardHandling = false,
}: BottomSheetModalProps) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const keyboardHeight = useRef(new Animated.Value(0)).current

  // Анимация открытия
  useEffect(() => {
    if (isOpen) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 25,
        stiffness: 100,
      }).start()
    }
  }, [isOpen, translateY])

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose)
  }

  // Обработка клавиатуры (только если включен флаг)
  useEffect(() => {
    if (!enableKeyboardHandling || Platform.OS !== 'ios') return

    const showSub = Keyboard.addListener('keyboardWillShow', (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: e.duration,
        useNativeDriver: false,
      }).start()
    })
    const hideSub = Keyboard.addListener('keyboardWillHide', (e) => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: false,
      }).start()
    })

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [enableKeyboardHandling, keyboardHeight])

  // Механика свайпа
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) translateY.setValue(gestureState.dy)
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) handleClose()
        else Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start()
      },
    })
  ).current

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleClose}>
      <View className="flex-1 justify-end bg-slate-900/50">
        <Pressable className="absolute inset-0" onPress={handleClose} />

        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="h-[85%] w-full rounded-t-[32px] bg-white shadow-2xl"
        >
          <View className="flex-1 overflow-hidden rounded-t-[32px]">
            {/* Зона захвата (handle) */}
            <View {...panResponder.panHandlers} className="w-full items-center py-4">
              <View className="h-1.5 w-12 rounded-full bg-slate-200" />
            </View>

            {/* Шапка, общая для всех */}
            <View className="flex-row items-center justify-between border-b border-slate-100 px-6 pb-4">
              <Text className="text-xl font-bold text-slate-900">{title}</Text>
              <View className="flex-row gap-2">
                {headerRight}
                <Pressable
                  onPress={handleClose}
                  className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 active:bg-slate-200"
                >
                  <X color="#64748b" size={20} />
                </Pressable>
              </View>
            </View>

            {/* Контент, переданный извне (ScrollView, FlatList или View) */}
            <View className="flex-1">{children}</View>

            {enableKeyboardHandling && Platform.OS === 'ios' && (
              <Animated.View style={{ height: keyboardHeight }} />
            )}
            {enableKeyboardHandling && Platform.OS === 'ios' && <View className="h-6" />}
          </View>

          {/* Заплатка снизу */}
          <View
            style={{
              position: 'absolute',
              bottom: -1000,
              left: 0,
              right: 0,
              height: 1000,
              backgroundColor: 'white',
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  )
}
