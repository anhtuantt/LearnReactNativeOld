import { defiNotifyRequest } from '@/app/api';
import { EINotificationType, Notification } from '@/features/database/model/Notification';
import { IUpdateOrder } from '@/features/defiNotify/defiNotifyClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { handleDeviceIdStorage } from './helpers';

// Fetch and store FCM token
export const getFCMToken = async () => {
  try {
    let fcm_token = await AsyncStorage.getItem('fcm_token'); // Check if token is already stored
    if (!fcm_token) {
      fcm_token = await messaging().getToken(); // Fetch new FCM token
      if (fcm_token) {
        await AsyncStorage.setItem('fcm_token', fcm_token); // Store token in AsyncStorage
      }
    }
    const id = await handleDeviceIdStorage();

    const req: IUpdateOrder = {
      device_id: id,
      fcm_token: fcm_token,
    };
    void defiNotifyRequest.updateOrder(req);
  } catch (error) {
    console.error('FCM token error:', error);
  }
};

export const saveMessageBackground = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    const type: EINotificationType = Number(remoteMessage?.data?.type) in EINotificationType ? Number(remoteMessage?.data?.type) : EINotificationType.Alert;
    if (remoteMessage?.notification?.title?.trim()) {
      // Save message data to real
      await Realm.open({}).then(realm => {
        realm.write(() => {
          realm.create(
            'Notification',
            Notification.generate({
              title: remoteMessage?.notification?.title ?? '',
              message: remoteMessage?.notification?.body ?? '',
              type: type,
              orderNo: remoteMessage?.data?.order_no ?? '',
            }),
          );
        });
        realm.close();
      });
    }
  });
};
