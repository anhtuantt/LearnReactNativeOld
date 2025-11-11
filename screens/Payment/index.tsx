import Box from '@/components/Box';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import Images from '@/components/Images';
import LayoutScreen from '@/components/LayoutScreen';
import Typography from '@/components/Typography';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, Modal, ScrollView, View } from 'react-native';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import { PaymentFastContextProvider, usePaymentSelector } from './context';
import { EPaymentStep, EPaymentMethod } from './types';
import PaymentSelect from './components/PaymentSelect';
import paypalApi from '@/app/api/paypalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import { defiNotifyRequest } from '@/app/api';
import { ToastShow } from '@/components/Toast';
/*
import {
  PlatformPay,
  PlatformPayButton,
  usePlatformPay,
} from '@stripe/stripe-react-native';
*/
export interface IPaymentScreenParams {
  order_no: string;
}
export interface IPaymentData {
  order_no: string;
  platform: string;
  price: number;
  service: string;
  wallet: string;
  chain: string;
}
const PaymentScreen = () => {
  /*const {
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = usePlatformPay();
   */
  const { ArrowLeftIcon } = Icons;
  const { PaymentBackground } = Images;
  const currentStep = usePaymentSelector('currentStep');
  const paymentMethod = usePaymentSelector('paymentMethod');
  const duration = usePaymentSelector('duration');
  const [hasChoosePayment, setHasChoosePayment] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState<string | null>();
  const [accessToken, setAccessToken] = useState<string | null>();

  const handlePrev = () => {
    currentStep.set(EPaymentStep.STEP_ONE);
  };
  const handleNext = () => {
    currentStep.set(EPaymentStep.STEP_TWO);
  };
  const handleDone = () => {
    currentStep.set(EPaymentStep.STEP_TWO);
  };
  const navigation: NavigationProp<any, any> = useNavigation();
  const params = useRoute().params as IPaymentScreenParams;
  const order_no = params?.order_no;
  {/*
  React.useEffect(() => {
    void (async function () {
      if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
        ToastShow({ title: 'Google Pay is not supported!' });
        return;
      }
    })();
  }, []);
  */}

  const paymentStep = React.useMemo(() => {
    switch (currentStep.get) {
      case EPaymentStep.STEP_ONE:
        return <StepOne order_no={order_no} />;
      case EPaymentStep.STEP_TWO:
        return <StepTwo order_no={order_no} />;
      default:
        return <></>;
    }
  }, [currentStep.get]);

  const fetchPaymentIntentClientSecret = async () => {
    const result = await defiNotifyRequest.getPaymentByOrder({ order_no });
    if (result) {
      const totalValue = Number(
        (Math.round(Number(result?.data?.price) * Number(duration.get) * 100) / 100).toFixed(2),
      );
      const clientSecret = await defiNotifyRequest.googlePayCharge({
        payment_method: ['card'],
        amount: totalValue * 100,
      });
      if (clientSecret) {
        return clientSecret?.data?.client_secret;
      }
    }
  };
  /*
  const onPressPayStrip = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    if(clientSecret){
      const { error } = await confirmPlatformPayPayment(clientSecret, {
        googlePay: {
          testEnv: true,
          merchantName: 'My merchant name',
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      });
  
      if (error) {
        console.log("error: ", error);
        return;
      }
    }
  };
  */

  const onPressPaypal = async (): Promise<void> => {
    try {
      const token: string = await paypalApi.generateToken();
      const result = await defiNotifyRequest.getPaymentByOrder({ order_no });
      if (result) {
        const totalValue = Number(
          (Math.round(Number(result?.data?.price) * Number(duration.get) * 100) / 100).toFixed(2),
        );
        const periodValue = Number(duration.get) * 30;
        void defiNotifyRequest.updateLastAccessPayment({
          order_no: order_no,
          period: periodValue,
          total_value: totalValue,
        });
        const res: { links?: { rel?: string; href: string }[] } = await paypalApi.createOrder(
          token,
          totalValue.toFixed(2),
        );

        setAccessToken(token);
        console.log('res++++++', res);

        if (res?.links) {
          const findUrl = res.links.find(data => data?.rel === 'approve');
          if (findUrl) {
            setPaypalUrl(findUrl.href);
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(undefined);
    setAccessToken(undefined);
  };

  const onUrlChange = (webviewState: any) => {
    console.log('webviewStatewebviewState', webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      const { token } = urlValues.query;
      if (token) {
        void paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async (id: string | (string | null)[]) => {
    try {
      const validId = Array.isArray(id) ? id.find(i => i !== null) || '' : id;
      const res = paypalApi.capturePayment(validId, accessToken || '');
      console.log('capturePayment res++++', res);
      ToastShow({ title: 'Payment sucessfull!' });
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  const handleBack = () => {
    currentStep.get == 2
      ? handlePrev()
      : currentStep.get == 1 && hasChoosePayment
      ? setHasChoosePayment(false)
      : navigation.goBack();
  };

  return (
    <LayoutScreen flex={1}>
      <ImageBackground source={PaymentBackground} style={{ width: '100%', height: '100%' }}>
        <Box justifyContent='center' alignItems='center' padding={12}>
          <ButtonSync onPress={handleBack} position={'absolute'} left={12} top={12}>
            <ArrowLeftIcon />
          </ButtonSync>
          <Typography color='white' fontSize={20}>
            Payment
          </Typography>
        </Box>
        <Box flex={1} backgroundColor={'white'} padding={12}>
          <Modal visible={!!paypalUrl}>
            <View style={{ flex: 1 }}>
              <WebView source={{ uri: paypalUrl ?? '' }} onNavigationStateChange={onUrlChange} />
            </View>
            <ButtonPrimary
              borderRadius={6}
              textColor='#fff'
              margin={8}
              onPressCustom={clearPaypalState}
              backgroundColor='#1562F8'
              title='Cancel'></ButtonPrimary>
          </Modal>
          {!hasChoosePayment && (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>{<PaymentSelect />}</ScrollView>
              <Box gap={12}>
                <ButtonPrimary
                  borderRadius={6}
                  textColor='#fff'
                  onPressCustom={() => setHasChoosePayment(!hasChoosePayment)}
                  backgroundColor='#1562F8'
                  title='Next'></ButtonPrimary>
              </Box>
            </>
          )}
          {hasChoosePayment && (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>{paymentStep}</ScrollView>
              {/* button action */}
              {paymentMethod.get == EPaymentMethod.CRYPTO ? (
                <Box flexDirection='row' gap={16}>
                  <ButtonPrimary
                    flex={1}
                    title='Cancel'
                    borderRadius={12}
                    backgroundColor='white'
                    textColor='black'
                    borderWidth={1}
                    borderColor='#DBDDE5'
                    onPressCustom={() => navigation.goBack()}
                  />
                  {currentStep.get == 1 ? (
                    <ButtonPrimary onPressCustom={handleNext} flex={1} title='Next' borderRadius={12} />
                  ) : (
                    <ButtonPrimary onPressCustom={() => navigation.goBack()} flex={1} title='Done' borderRadius={12} />
                  )}
                </Box>
              ) : (
                <Box gap={12}>
                  {/*<PlatformPayButton
                    type={PlatformPay.ButtonType.Pay}
                    onPress={onPressPayStrip}
                    style={{
                      width: '100%',
                      height: 50,
                    }}
                  />*/}
                   <ButtonPrimary
                    borderRadius={6}
                    textColor='#fff'
                    onPressCustom={() => onPressPaypal()}
                    backgroundColor='#1562F8'
                    title='Next'></ButtonPrimary> 
                </Box>
              )}
            </>
          )}
        </Box>
      </ImageBackground>
    </LayoutScreen>
  );
};

export default () => {
  return (
    <PaymentFastContextProvider>
      <PaymentScreen />
    </PaymentFastContextProvider>
  );
};
