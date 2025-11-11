import React, { useCallback, useEffect, useState, memo } from 'react';
import { Linking, Platform, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ToggleSwitch from 'toggle-switch-react-native';

import { defiNotifyRequest } from '@/app/api';
import Box from '@/components/Box';
import Icons from '@/components/Icons';
import LayoutScreen from '@/components/LayoutScreen';
import Typography from '@/components/Typography';
import ScrollAble from '../Home/components/ScrollAble';
import { handleDeviceIdStorage } from '@/utils/helpers';

interface SettingItemProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const SettingItem = memo(({ icon: Icon, title, subtitle, onPress }: SettingItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ opacity: onPress ? 1 : 0.5 }}
    disabled={!onPress}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    <Box flexDirection='row' alignItems='center' gap={10} marginBottom={16}>
      <Icon />
      <Box>
        <Typography color='white'>{title}</Typography>
        {subtitle && <Typography color='#9197B0'>{subtitle}</Typography>}
      </Box>
    </Box>
  </TouchableOpacity>
));

const SettingScreenNew: React.FC = () => {
  const { SubscriptionIcon, SpeechIcon, RateIcon, LanguageIcon, InfoVersionIcon, ContactIcon, ClearCacheIcon } = Icons;
  const versionName = DeviceInfo.getVersion();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTestnet, setIsTestnet] = useState(false);

  const getSettingData = useCallback(async () => {
    try {
      const deviceId = await handleDeviceIdStorage();
      const res = await defiNotifyRequest.getSettingInfo({ device_id: deviceId });
      if (res?.data) {
        setIsTestnet(res.data.is_testnet === 1);
      }
    } catch (error) {
      console.warn('Failed to load settings', error);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await getSettingData();
    } finally {
      setIsRefreshing(false);
    }
  }, [getSettingData]);

  const handleToggle = useCallback(async (nextValue: boolean) => {
    setIsTestnet(nextValue);
    try {
      const deviceId = await handleDeviceIdStorage();
      await defiNotifyRequest.updateSetting({ device_id: deviceId, is_testnet: nextValue ? 1 : 0 });
    } catch (error) {
      console.error('Toggle update failed', error);
      setIsTestnet(prev => !prev);
    }
  }, []);

  useEffect(() => {
    void getSettingData();
  }, [getSettingData]);

  return (
    <LayoutScreen screenName='Settings' isShowBackBtn flex={1} paddingHeader={10}>
      <Box backgroundColor='#0C0C16' flex={1} padding={10}>
        <ScrollAble handleRefresh={handleRefresh} isRefreshing={isRefreshing}>
          <Typography color='#1766FF'>General</Typography>
          <Box height={16} />

          <Box flexDirection='row' gap={16} marginBottom={16}>
            <Typography color='white'>Show all Testnets</Typography>
            <ToggleSwitch
              isOn={isTestnet}
              onColor='#1562F8'
              offColor='#4E4E5A'
              size='medium'
              useNativeDriver
              animationSpeed={50}
              trackOnStyle={{ borderWidth: 0 }}
              trackOffStyle={{ borderWidth: 0 }}
              thumbOnStyle={{ elevation: 2 }}
              thumbOffStyle={{ elevation: 2 }}
              onToggle={handleToggle}
            />
          </Box>

          {/* Removed disabled settings that caused compliance issues */}

          <Box height={1} backgroundColor='#333743' marginVertical={8} />

          <Typography color='#1766FF'>Information</Typography>
          <Box height={16} />

          {/* Version should be shown as a label */}
          <Box flexDirection='row' alignItems='center' gap={10} marginBottom={16}>
            <InfoVersionIcon />
            <Box>
              <Typography color='white'>Version</Typography>
              <Typography color='#9197B0'>DefiNotify v.{versionName}</Typography>
            </Box>
          </Box>

          <SettingItem
            icon={ContactIcon}
            onPress={() => Linking.openURL('https://www.cryptonotifycentral.com/contact/')}
            title='Contact'
            subtitle='CryptoNotifyCentral'
          />
          <SettingItem
            icon={RateIcon}
            title='Rate us'
            subtitle={Platform.OS === 'ios' ? 'on Apple Store' : 'on Google Play'}
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.app.noticryp')}
          />
        </ScrollAble>
      </Box>
    </LayoutScreen>
  );
};

export default SettingScreenNew;
