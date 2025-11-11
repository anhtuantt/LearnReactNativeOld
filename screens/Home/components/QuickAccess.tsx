import { RouteName } from '@/app/routes/routeConfigs';
import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import Typography from '@/components/Typography';
import { colors } from '@/features/system/theme/configs/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Linking } from 'react-native';

interface IFeature {
  name: string;
  icon: JSX.Element;
  onPress: () => void;
}

const QuickAccess = () => {
  const { HowToUseIcon, OtherFeatureIcon, WebSiteIcon, TelegramIcon } = Icons;
  const navigation: NavigationProp<any, any> = useNavigation();

  const listQuickAccess: IFeature[] = [
    { name: 'Help Center/FAQ', icon: <HowToUseIcon />, onPress: () => navigation.navigate(RouteName.HelpCenterScreen) },
    { name: 'Other Feature', icon: <OtherFeatureIcon />, onPress: () => navigation.navigate(RouteName.OtherFeatures) },
    { name: 'Website', icon: <WebSiteIcon />, onPress: () => Linking.openURL('https://www.cryptonotifycentral.com/definotify-bot/') },
    { name: 'Telegram support', icon: <TelegramIcon />, onPress: () => Linking.openURL('https://t.me/cryptonotifycentral') },
  ];
  return (
    <>
      <Box gap={16} marginTop={32}>
        <Box>
          <Typography color='white' fontSize={16}>
            Quick Access
          </Typography>
        </Box>
        <Box>
          <FlatList
            data={listQuickAccess}
            numColumns={2}
            style={{
              gap: 12,
            }}
            renderItem={({ item }: { item: IFeature }) => {
              return (
                <>
                  <ButtonSync
                    margin={4}
                    flex={1}
                    gap={8}
                    backgroundColor={colors.background.main}
                    borderRadius={8}
                    padding={16}
                    onPress={item.onPress}>
                    <Box gap={8}>
                      {item.icon}
                      <Box flex={1}>
                        <Typography fontSize={16} color='white'>
                          {item.name}
                        </Typography>
                      </Box>
                    </Box>
                  </ButtonSync>
                </>
              );
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(QuickAccess);
