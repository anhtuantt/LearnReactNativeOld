import Box from '@/components/Box';
import Images from '@/components/Images';
import Typography from '@/components/Typography';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePaymentSelector } from '../../context';
import { EPaymentMethod } from '../../types';

const PaymentSelect = () => {
  //const [activePayment, setActivePayment] = useState(0);
  const [activePayment, setActivePayment] = useState(1);
  const paymentMethod = usePaymentSelector('paymentMethod');
  const { Paypal, Wallet } = Images;

  //useEffect(() => {}, []);
  useEffect(() => {
    paymentMethod.set(EPaymentMethod.CRYPTO);
  }, []);

  return (
    <Box flexDirection={'column'} gap={24} flex={1}>
      <Typography fontSize={16} color='#070707' fontWeight={700}>
        Choose your payment method
      </Typography>
      <Box>
        <TouchableOpacity onPress={() => {
          setActivePayment(1);
          paymentMethod.set(EPaymentMethod.CRYPTO);
        }}>
          <Box
            height={86}
            borderWidth={activePayment == 0 ? 1 : 2}
            borderColor={activePayment == 1 ? '#1766FF' : '#ADB1C3'}
            borderRadius={8}
            marginBottom={8}>
            <Box flex={1} flexDirection='row' paddingHorizontal={17} paddingVertical={23} gap={10}>
              <Box height={40} width={40}>
                <Image source={Wallet} />
              </Box>
              <Box height={40}>
                <Typography fontWeight={700}>CRYPTO</Typography>
                <Typography color='#5A6689'>Fastest and secured</Typography>
              </Box>
            </Box>
            <Box
              backgroundColor={'green'}
              position='absolute'
              top={1}
              right={1}
              paddingLeft={32}
              paddingRight={10}
              paddingTop={0}
              paddingBottom={10}
              borderBottomLeftRadius={32}
              borderTopRightRadius={6}>
              <Typography fontSize={14} color='white'>
                Recommended
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setActivePayment(2);
          paymentMethod.set(EPaymentMethod.PAYPAL);
        }}
        disabled={false} //  This disables the button
        activeOpacity={1} // Prevents any click feedback effect
        >
          <Box
            height={86}
            borderWidth={activePayment == 0 ? 1 : 2}
            borderColor={activePayment == 2 ? '#1766FF' : '#ADB1C3'}
            borderRadius={8}
            marginBottom={8}>
            <Box flex={1} flexDirection='row' paddingHorizontal={17} paddingVertical={23} gap={10}>
              <Box height={40} width={40}>
                <Image source={Paypal} />
              </Box>
              <Box height={40}>
                <Typography fontWeight={700}>PAYPAL/CREDIT CARD</Typography>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default PaymentSelect;
