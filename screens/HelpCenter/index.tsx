import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import Images from '@/components/Images';
import LayoutScreen from '@/components/LayoutScreen';
import Typography from '@/components/Typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ImageBackground, Linking, ScrollView, TouchableOpacity } from 'react-native';

const HelpCenterScreen = () => {
  const { ArrowLeftIcon } = Icons;
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
            Help Center/FAQ
          </Typography>
        </Box>
        <Box flex={1} backgroundColor={'#E3E5EB'} padding={12}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Typography fontWeight={700}>Using the App</Typography>
            <Box marginTop={12} padding={12} backgroundColor={'#fff'} borderRadius={8}>
              <Typography fontWeight={700}>Q: How do I set up alerts for my positions?</Typography>
              <Typography>
                A: To set up an alert, tap &quot;New Alert,&quot; select your protocol and service, enter your wallet
                address, set threshold, and save.
              </Typography>
              <Typography></Typography>
              <Typography fontWeight={700}>Q: How can I monitor my DeFi positions in real-time?</Typography>
              <Typography>
                A: DefiNotify provides real-time updates on your positions, including health, borrowing limits, and
                liquidation risks. You&apos;ll receive alerts for critical changes, allowing you to take action promptly.
              </Typography>
            </Box>
            <Box marginBottom={24}></Box>
            <Typography fontWeight={700}>Troubleshooting</Typography>
            <Box marginTop={12} padding={12} backgroundColor={'#fff'} borderRadius={8}>
              <Typography fontWeight={700}>Q: What should I do if I encounter an issue with the app?</Typography>
              <Typography>
                A: If you encounter any issues, please contact our support team at
                <TouchableOpacity onPress={() => Linking.openURL('https://t.me/cryptonotifycentral')}>
                  <Typography color='#125AE4' textDecorationLine={'underline'} marginBottom={-4}>
                    https://t.me/cryptonotifycentral
                  </Typography>
                </TouchableOpacity>
                . You can also check our FAQ section or community forums for common solutions.
              </Typography>
              <Typography></Typography>
              <Typography fontWeight={700}>Q: Why am I not receiving notifications?</Typography>
              <Typography>
                A: Please ensure that notifications are enabled for the DefiNotify app on your device. Also, check your
                internet connection and device settings to ensure they are configured correctly.
              </Typography>
            </Box>
            <Box marginBottom={24}></Box>
            <Typography fontWeight={700}>Security and Privacy</Typography>
            <Box marginTop={12} padding={12} backgroundColor={'#fff'} borderRadius={8}>
              <Typography fontWeight={700}>Q: Is my wallet data safe with DefiNotify?</Typography>
              <Typography>
                A: Your privacy is our top priority. We only use your wallet address to calculate your position on
                lending platforms through read-only smart contract functions. This means we cannot access or control
                your funds. We do not store any sensitive information, such as your private keys or seed phrases.
              </Typography>
            </Box>
          </ScrollView>
        </Box>
      </ImageBackground>
    </LayoutScreen>
  );
};

export default HelpCenterScreen;
