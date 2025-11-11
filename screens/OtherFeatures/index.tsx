import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import Images from '@/components/Images';
import LayoutScreen from '@/components/LayoutScreen';
import Typography from '@/components/Typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ImageBackground, ScrollView } from 'react-native';

const OtherFeatures = () => {
  const { ArrowLeftIcon, CexNotifyIcon, TelegramIconV2 } = Icons;
  const { PaymentBackground } = Images;
  const navigation: NavigationProp<any, any> = useNavigation();

  return (
    <LayoutScreen flex={1}>
      <ImageBackground source={PaymentBackground} style={{ width: '100%', height: '100%' }}>
        <Box justifyContent='center' alignItems='center' padding={12}>
          <ButtonSync onPress={() => navigation.goBack()} position={'absolute'} left={12} top={12}>
            <ArrowLeftIcon />
          </ButtonSync>
          <Typography color='white' fontSize={20}>
            OtherFeatures
          </Typography>
        </Box>
        <Box flex={1} backgroundColor={'#010E34'} padding={16}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box marginBottom={16} padding={12} backgroundColor={'#fff'} borderRadius={8} flexDirection='row' gap={16}>
              <Box>
                <CexNotifyIcon />
              </Box>
              <Box flex={1}>
                <Typography color='#125AE4'>Coming soon</Typography>
                <Typography fontWeight={'700'}>Cexnotify</Typography>
                <Typography>Monitoring and notifying loan positions on Centralized Exchanges (CEX) such as Binance, Bitget, Bybit, etc.Monitoring and notifying margin and futures trading positions (both liquidation threshold and current profit) on CEXs.</Typography>
              </Box>
            </Box>
            <Box padding={12} backgroundColor={'#fff'} borderRadius={8} flexDirection='row' gap={16}>
              <Box>
                <TelegramIconV2 />
              </Box>
              <Box flex={1}>
                <Typography color='#125AE4'>Coming soon</Typography>
                <Typography fontWeight={'700'}>Trading signal</Typography>
                <Typography>The trading signal bot leverages advanced algorithms to automatically trade cryptocurrencies and collect data from various sources, including major lending platforms&apos; APYs for stablecoins, funding rates, options trading max pain prices, DXY, CPI, and more, to predict short-term Bitcoin trends.</Typography>
                <Typography>For example, the bot monitors borrowing annual percentage yields (APYs) and on-chain minting of USDT on the Tron and Ethereum networks. If unusually high demand for stablecoins is detected, it generates a long signal for Bitcoin.</Typography>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </ImageBackground>
    </LayoutScreen>
  );
};

export default OtherFeatures;
