import { RouteName } from '@/app/routes/routeConfigs';
import Box from '@/components/Box';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Images from '@/components/Images';
import LayoutScreen from '@/components/LayoutScreen';
import { colors } from '@/features/system/theme/configs/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import DefiFeature from './components/DefiFeature';
import DefiLogoAndMessage from './components/DefiLogoAndMessage';
import Header from './components/Header';
import QuickAccess from './components/QuickAccess';
import ScrollAble from './components/ScrollAble';
import YourRegistration from './components/YourRegistration';

const HomeScreen = () => {
  const { HomeScreen, HomeScreenExpired } = Images;
  const [isExpired, setIsExpired] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [orderNoExpired, setOrderNoExpired] = useState<string>();
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 100);
  };
  const navigation: NavigationProp<any, any> = useNavigation();

  return (
    <LayoutScreen padding={0} nextScreen={RouteName.DeFiScreen}>
      <ImageBackground source={isExpired ? HomeScreenExpired : HomeScreen} style={{ width: '100%', height: '100%' }}>
        <Box flex={1} paddingHorizontal={12}>
          <ScrollAble handleRefresh={handleRefresh} isRefreshing={isRefreshing}>
            <Header />
            <DefiLogoAndMessage isExpired={isExpired} isRegistered={isRegistered} orderNoExpired={orderNoExpired} />
            <YourRegistration
              setIsExpired={setIsExpired}
              isRefreshing={isRefreshing}
              setIsRegistered={setIsRegistered}
              setOrderNoExpired={setOrderNoExpired}
            />
            <DefiFeature />
            <QuickAccess />
          </ScrollAble>
        </Box>
        <Box
          width={'100%'}
          padding={4}
          paddingHorizontal={32}
          justifyContent='center'
          alignItems='center'
          backgroundColor={colors.background.main}>
          <ButtonPrimary
            borderRadius={24}
            width={'100%'}
            onPressCustom={() => navigation.navigate(RouteName.CreateOrder)}
            title='New Alert'
          />
        </Box>
      </ImageBackground>
    </LayoutScreen>
  );
};

export default HomeScreen;
