import { linking, RootStackParamList, RouteName } from '@/app/routes/routeConfigs';
import useNotification from '@/hooks/useNotification';
import { CreateOrderScreen, HelpCenterScreen, NotifyListScreen, OtherFeatures, PaymentScreen } from '@/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useEffect } from 'react';
import { navigationRef } from './rootNavigation';
import TabNavigator from './TabNavigator';

const MainStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <NotificationListenerComponent />
      <MainStack.Navigator
        initialRouteName={RouteName.HomeScreen}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.SlideFromRightIOS, // Custom transitions
        }}>
        {/* Main screens */}
        <MainStack.Screen name={RouteName.DashBoard} component={TabNavigator} />
        <MainStack.Screen name={RouteName.NotifyList} component={NotifyListScreen} />
        <MainStack.Screen name={RouteName.Payment} component={PaymentScreen} />
        <MainStack.Screen name={RouteName.HelpCenterScreen} component={HelpCenterScreen} />
        <MainStack.Screen name={RouteName.OtherFeatures} component={OtherFeatures} />

        {/* Modal screens */}
        <MainStack.Group
          screenOptions={{
            presentation: 'transparentModal',
            ...TransitionPresets.BottomSheetAndroid,
            headerShown: false,
          }}>
          <MainStack.Screen name={RouteName.CreateOrder} component={CreateOrderScreen} />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const NotificationListenerComponent = () => {
  const { notificationListener } = useNotification();
  useEffect(() => {
    void notificationListener();
  }, []);
  return <></>;
};
