import React, { useState, PropsWithChildren } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  PanResponder,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CountNotification from '@/containers/Notification/CountNotification';
import Box from '../Box';
import Icons from '../Icons';
import Typography from '../Typography';
import ButtonPrimary from '../Button/ButtonPrimary';
import { useRealm } from '@realm/react';
import { schemas } from '@/features/database/Schema';

interface ILayoutScreenProps extends ViewStyle, PropsWithChildren {
  screenName?: string;
  isShowBackBtn?: boolean;
  hasNotifyIcon?: boolean;
  hasThreeDotIcon?: boolean;
  backgroundColor?: string;
  paddingHeader?: number;
  paddingTopHeader?: number;
  nextScreen?: string;
}

function LayoutScreen(props: ILayoutScreenProps) {
  const {
    children,
    screenName = undefined,
    isShowBackBtn = false,
    backgroundColor = '#0C0C16',
    hasNotifyIcon = false,
    hasThreeDotIcon = false,
    paddingHeader,
    paddingTopHeader,
    nextScreen,
  } = props;

  const { ArrowLeftIcon, ThreeDotIconV2 } = Icons;
  const realm = useRealm();
  const [isShowClearAll, setIsShowClearAll] = useState(false);
  const navigation: NavigationProp<any, any> = useNavigation();
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx < -50; // Xác định ngưỡng vuốt qua trái
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          nextScreen && navigation.navigate(nextScreen);
        }
      },
    }),
  ).current;

  const deleteAllNotifications = () => {
    realm.write(() => {
      const allNotifications = realm.objects(schemas.Notification);
      realm.delete(allNotifications);
    });
    setIsShowClearAll(!isShowClearAll);
  };

  return (
    <>
      {Platform.OS == 'ios' && <SafeAreaView style={{ flex: 0, backgroundColor: '#0C0C16' }} />}
      <SafeAreaView style={{ flex: 1 }} {...panResponder.panHandlers}>
        <StatusBar barStyle='light-content' backgroundColor='#0C0C16' />
        <Box
          style={{
            ...props,
            backgroundColor: backgroundColor,
            paddingTop: paddingTopHeader ?? (Platform.OS == 'android' ? (StatusBar.currentHeight ?? 0) - 4 : 0), // - 4 fix StatusBar Height
          }}>
          <Box>
            <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
              <Box flexDirection='row' alignItems='center' gap={10} paddingHorizontal={paddingHeader}>
                {isShowBackBtn && (
                  <TouchableOpacity onPress={navigation.goBack}>
                    <ArrowLeftIcon />
                  </TouchableOpacity>
                )}
                {screenName && (
                  <Typography color='#fff' fontSize={20} style={{ lineHeight: 28, marginTop: 10, marginBottom: 16 }}>
                    {screenName}
                  </Typography>
                )}
              </Box>
              {hasNotifyIcon && (
                <Box paddingHorizontal={paddingHeader} paddingVertical={8}>
                  <CountNotification />
                </Box>
              )}
              {hasThreeDotIcon && (
                <TouchableOpacity onPress={() => setIsShowClearAll(!isShowClearAll)}>
                  <Box paddingHorizontal={paddingHeader} paddingVertical={8}>
                    <ThreeDotIconV2 />
                  </Box>
                </TouchableOpacity>
              )}
            </Box>
          </Box>
          {children}
        </Box>
      </SafeAreaView>

      <Modal visible={isShowClearAll} transparent onRequestClose={() => setIsShowClearAll(false)}>
        <TouchableWithoutFeedback onPress={() => setIsShowClearAll(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <ButtonPrimary
          borderRadius={6}
          flex={1}
          zIndex={2}
          backgroundColor='#35373D'
          title='Clear all'
          position='absolute'
          top={Platform.OS == 'android' ? 56 : 106}
          right={16}
          onPressCustom={deleteAllNotifications}
        />
      </Modal>
    </>
  );
}

export default LayoutScreen;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject, // you can also manually do top/left/right/bottom: 0
    //backgroundColor: 'rgba(0,0,0,0.3)', // optional dimming
  },
});
