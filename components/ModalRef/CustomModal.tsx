import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Modal from 'react-native-modal';
import Box from '../Box';
import ModalController, { CustomModalRef } from './ModalController';

const CustomModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState<JSX.Element>();

  const modalRef = useRef<CustomModalRef>();

  useLayoutEffect(() => {
    ModalController.setModalRef(modalRef);
  }, []);
    
  useImperativeHandle(
    modalRef,
    () => ({
      show: (message?: JSX.Element) => {
        setModalVisible(true);
        if(message) {
          setContent(message);
        }
      },
      hide: () => {
        setModalVisible(false);
        setContent(undefined);
      },
    }),
    []
  );
    
  const handleCloseModal = () => {
    ModalController.hideModal();
  };

  return (
    <Modal
      coverScreen={true}
      isVisible={modalVisible}
      backdropOpacity={0.3}
      style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}
      statusBarTranslucent={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onDismiss={handleCloseModal}
      onBackdropPress={handleCloseModal}
    >
      <Box flex={1} justifyContent={'center'} alignItems={'center'} marginTop={22}>
        <Box
          minWidth={200}
          minHeight={200}
          margin={20}
          backgroundColor={'white'}
          borderRadius={20}
          padding={35}
          alignItems={'center'}
          shadowColor={'#000'}
          shadowOffset={{
            width: 0,
            height: 2,      
          }}
          shadowOpacity={0.25}
          shadowRadius={4}
          elevation={5}>
          {content}
        </Box>
      </Box>
    </Modal>
  );
};

export default forwardRef(CustomModal);