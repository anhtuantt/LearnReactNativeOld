import { LinkingOptions } from '@react-navigation/native';
import { Platform, StatusBar } from 'react-native';
import { enableFreeze } from 'react-native-screens';

enableFreeze();

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
}

export enum RouteName {
  HomeScreen = 'HomeScreen',
  DashBoard = 'DashBoard',
  DeFiScreen = 'DeFiNotify',
  CreateOrder = 'CreateOrder',
  NotifyList = 'NotifyList',
  Setting = 'Setting',
  Payment = 'Payment',
  HelpCenterScreen = 'HelpCenterScreen',
  OtherFeatures = 'OtherFeatures',
}

export const initialRouteName = RouteName.DashBoard;
export interface ModalScreenProps {
  screen?: RouteName;
}
export type RootStackParamList = {
  [RouteName.DashBoard]: undefined;
  [RouteName.DeFiScreen]: undefined;
  [RouteName.HomeScreen]: undefined;
  [RouteName.CreateOrder]: undefined;
  [RouteName.NotifyList]: undefined;
  [RouteName.Payment]: undefined;
  [RouteName.HelpCenterScreen]: undefined;
  [RouteName.OtherFeatures]: undefined;
  [RouteName.Setting]: undefined;
};
export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['/'],
  config: {
    screens: {
      [RouteName.DashBoard]: 'dashboard',
      [RouteName.HomeScreen]: 'home',
      [RouteName.DeFiScreen]: 'defi',
      [RouteName.CreateOrder]: 'create-order',
      [RouteName.NotifyList]: 'notifyList',
      [RouteName.Payment]: 'payment',
      [RouteName.HelpCenterScreen]: 'help-center-screen',
      [RouteName.OtherFeatures]: 'other-features',
      [RouteName.Setting]: 'setting',
    },
  },
};
