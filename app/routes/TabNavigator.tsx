import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icons from '@/components/Icons';
import { HomeScreen, DeFiScreen, NotifyListScreen } from '@/screens';
import SettingScreenNew from '@/screens/Setting';
import { RouteName } from './routeConfigs';
import { colors } from '@/features/system/theme/configs/colors';

type TabParamList = {
  [RouteName.HomeScreen]: undefined;
  [RouteName.DeFiScreen]: undefined;
  [RouteName.NotifyList]: undefined;
  [RouteName.Setting]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<TabParamList, keyof TabParamList>;
      }) => {
        let IconComponent: React.FC<{ color: string }>;
        let label: string;

        switch (route.name) {
          case RouteName.HomeScreen:
            IconComponent = Icons.HomeIcon;
            label = 'Home';
            break;
          case RouteName.DeFiScreen:
            IconComponent = Icons.RegisterIcon;
            label = 'Alerts';
            break;
          case RouteName.NotifyList:
            IconComponent = Icons.NotifyIcon;
            label = 'Notifications';
            break;
          case RouteName.Setting:
            IconComponent = Icons.SettingIcon;
            label = 'Setting';
            break;
          default:
            throw new Error(`Unhandled route: ${route.name}`);
        }

        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            ...styles.tabBar,
            height: styles.tabBar.height + insets.bottom,
            paddingBottom: styles.tabBar.paddingVertical + insets.bottom,
          },
          tabBarIcon: ({ focused }) => {
            const tintColor = focused
              ? colors.text.mainHomeActive
              : colors.text.mainHome;
            return (
              <View style={styles.tabItem}>
                <IconComponent color={tintColor} />
                <Text style={[styles.label, { color: tintColor }]}>{label}</Text>
              </View>
            );
          },
        };
      }}
    >
      <Tab.Screen name={RouteName.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={RouteName.DeFiScreen} component={DeFiScreen} />
      <Tab.Screen name={RouteName.NotifyList} component={NotifyListScreen} />
      <Tab.Screen name={RouteName.Setting} component={SettingScreenNew} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    paddingVertical: 6,
    backgroundColor: colors.background.main,
    borderTopWidth: 0,
    elevation: 0,      // remove Android shadow
    shadowOpacity: 0,  // remove iOS shadow
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    minWidth: 70,     // ensures enough room
    textAlign: 'center',
  },
});
