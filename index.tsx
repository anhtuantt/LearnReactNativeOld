import NotificationProvider from '@/features/notification/NotificationProvider';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { LogBox, PermissionsAndroid, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainNavigator from './app/routes/MainNavigator';
import store, { persistor } from './app/store';
import { toastConfig } from './components/Toast';
import i18n from './features/language';
import AppProvider from './features/system/providers/appProvider';
import { getFCMToken } from './utils/pushNotificationHelper';
// import { StripeProvider } from '@stripe/stripe-react-native'; "@stripe/stripe-react-native": "^0.42.0",
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { GOMARKETME_APIKEY, STRIPE_PUBLISHABLE_KEY } from './configs/envConfigs';
import GoMarketMe from 'gomarketme-react-native';

if (!__DEV__) {
  LogBox.ignoreAllLogs();
} else {
  LogBox.ignoreLogs(['Require cycle:']);
}
LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    
    void GoMarketMe.initialize(GOMARKETME_APIKEY);

    if (Platform.OS === 'android') {
      SplashScreen.hide(); // Hide the splash screen on Android
    }

    const requestUserPermission = async () => {
      try {
        if (Platform.OS === 'ios') {
          await PushNotificationIOS.requestPermissions();
        } else {
          await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        }

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await getFCMToken();
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Permission request error:', error);
      }
    };

    void requestUserPermission();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <I18nextProvider i18n={i18n}>
            <AppProvider>
              <MainNavigator />
              <Toast config={toastConfig} />
            </AppProvider>
          </I18nextProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};
export default () => {
  return (
    <NotificationProvider>
      {/* <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}> */}
      <App />
      {/* </StripeProvider> */}
    </NotificationProvider>
  );
};
