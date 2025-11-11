import { RouteName } from '@/app/routes/routeConfigs';
import Box from '@/components/Box';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Images from '@/components/Images';
import Typography from '@/components/Typography';
import { compareObject } from '@/utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';

interface IDefiLogoAndMessageProps {
  isExpired: boolean;
  isRegistered: boolean;
  orderNoExpired?: string;
}
const DefiLogoAndMessage = (props: IDefiLogoAndMessageProps) => {
  const { isExpired, isRegistered, orderNoExpired } = props;
  const navigation: NavigationProp<any, any> = useNavigation();

  const { DefiIcon } = Images;
  const message = 'Protect Your DeFi assets \nfrom Liquidation!';
  const messageProtected = 'You\'re protected!';
  const renderMessageContent = () => {
    if (isRegistered && isExpired) {
      return (
        <Box gap={24}>
          <Box justifyContent='center'>
            <Typography textAlign='center' color='white' fontSize={20}>
                Registration expired
            </Typography>
          </Box>
          <ButtonPrimary
            title='Renew now!'
            backgroundColor='white'
            textColor='#CD3304'
            fontWeight={500}
            borderRadius={24}
            onPressCustom={() => navigation.navigate(RouteName.Payment, {order_no: orderNoExpired})}
          />
        </Box>
      );
    } else if (isRegistered) {
      return (
        <Box justifyContent='center'>
          <Typography textAlign='center' color='white' fontSize={20}>
            {messageProtected}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box justifyContent='center'>
          <Typography textAlign='center' color='white' fontSize={20}>
            {message}
          </Typography>
        </Box>
      );
    }
  };
  return (
    <>
      <Box justifyContent='center' alignItems='center' gap={32} paddingVertical={24}>
        <FastImage source={DefiIcon} style={{ width: 64, height: 64 }} resizeMode={'contain'} />
        {renderMessageContent()}
      </Box>
    </>
  );
};

export default React.memo(DefiLogoAndMessage, compareObject);
