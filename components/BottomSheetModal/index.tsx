import Icons from '@/components/Icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import Box from '../Box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetModalProps extends PropsWithChildren {
  isOpen: boolean;
  isCloseWithTapOutside?: boolean;
  onContinueWithoutSave?: () => void;
  header?: JSX.Element;
  isShowCloseIcon?: boolean;
  p?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  onCloseModal: () => void;
}

const BottomSheetModal = ({
  children,
  isOpen,
  isCloseWithTapOutside = true,
  isShowCloseIcon = false,
  onCloseModal,
  p = 16,
  topLeftRadius = 16,
  topRightRadius = 16,
}: BottomSheetModalProps) => {
  const RealScreenHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const { CloseModalIcon } = Icons;

  // State to manage keyboard visibility
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleOnBackdrop = () => {
    if (isCloseWithTapOutside) {
      onCloseModal();
    }
  };

  // Effect to listen to keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const additionalProps =
    Platform.OS === 'ios'
      ? {
        animationInTiming: 1,
        animationOutTiming: 1,
        backdropTransitionInTiming: 1,
        backdropTransitionOutTiming: 1,
      }
      : {
        animationInTiming: 50,
      };

  return (
    <Modal
      isVisible={isOpen}
      backdropOpacity={0.3}
      deviceHeight={RealScreenHeight}
      style={{ justifyContent: 'flex-end', margin: 0, marginBottom: insets.bottom }}
      onBackdropPress={handleOnBackdrop}
      statusBarTranslucent
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      useNativeDriver
      useNativeDriverForBackdrop
      {...additionalProps}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ paddingBottom: keyboardHeight }}>
        <Box
          padding={p}
          backgroundColor='#fff'
          borderTopLeftRadius={topLeftRadius}
          borderTopRightRadius={topRightRadius}>
          {isShowCloseIcon && (
            <TouchableOpacity style={{ position: 'absolute', top: 16, right: 16, zIndex: 100 }} onPress={onCloseModal}>
              <CloseModalIcon />
            </TouchableOpacity>
          )}
          {children}
        </Box>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomSheetModal;
