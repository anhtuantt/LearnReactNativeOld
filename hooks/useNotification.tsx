import { RouteName } from '@/app/routes/routeConfigs';
import { ToastShow } from '@/components/Toast';
import { EINotificationType, INotification, Notification } from '@/features/database/model/Notification';
import { schemas } from '@/features/database/Schema';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import Sound from 'react-native-sound';
import { useRef } from 'react';
import { Platform } from 'react-native';

const useNotification = () => {
  const realm = useRealm();
  const navigation = useNavigation();
  const openedFromNotification = useRef(false);

  const notificationListener = () => {
    // Check if the app was opened from a quit state due to a notification
    void messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.notification) {
          openedFromNotification.current = true;
          navigation.navigate(RouteName.NotifyList as never);
          console.log('Notification opened from quit state:', remoteMessage.notification);
        }
      });

    // Listener for foreground messages
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        if (Platform.OS === 'android' || !openedFromNotification.current) {
          const sound = new Sound('new_alert.wav', Sound.MAIN_BUNDLE, error => {
            if (!error) {
              sound.play(() => sound.release());
            }
          });
        }
        console.log('Notification onMessage:', JSON.stringify(remoteMessage));

        ToastShow({
          title: remoteMessage?.notification?.body ?? '',
          type: 'info',
          position: 'bottom',
          autoHide: false,
        });

        const type: EINotificationType =
          Number(remoteMessage?.data?.type) in EINotificationType
            ? Number(remoteMessage?.data?.type)
            : EINotificationType.Alert;

        const newData: INotification = {
          title: remoteMessage?.notification?.title ?? '',
          message: remoteMessage?.notification?.body ?? '',
          type: type,
          orderNo: remoteMessage?.data?.order_no ?? '',
        };

        realm.write(() => {
          realm.create(schemas.Notification, Notification.generate(newData));
        });
      }
    });

    // Another listener for when app is opened by tapping on a notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        openedFromNotification.current = true;
        navigation.navigate(RouteName.NotifyList as never);
        console.log('Notification opened:', JSON.stringify(remoteMessage));
      }
    });
  };

  return { notificationListener };
};

export default useNotification;
