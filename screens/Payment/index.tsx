import React, { useMemo, useState } from 'react';
import { ImageBackground, Modal, ScrollView, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import queryString from 'query-string';

import LayoutScreen from '@/components/LayoutScreen';
import Box from '@/components/Box';
import Typography from '@/components/Typography';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import Images from '@/components/Images';

import { PaymentFastContextProvider, usePaymentSelector } from './context';
import { EPaymentMethod, EPaymentStep } from './types';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import PaymentSelect from './components/PaymentSelect';

import paypalApi from '@/app/api/paypalApi';
import { defiNotifyRequest } from '@/app/api';
import { ToastShow } from '@/components/Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// implement both IPA and Paypal
export interface IPaymentScreenParams {
  order_no: string;
}

const AFTER_PATH = '/paypal/after';

const PaymentScreen = () => {
  const navigation: NavigationProp<any> = useNavigation();
  const params = useRoute().params as IPaymentScreenParams;
  const order_no = params?.order_no;
  const insets = useSafeAreaInsets(); // NEW

  const { ArrowLeftIcon } = Icons;
  const { PaymentBackground } = Images;

  const currentStep = usePaymentSelector('currentStep');
  const paymentMethod = usePaymentSelector('paymentMethod');
  const duration = usePaymentSelector('duration');

  const [hasChoosePayment, setHasChoosePayment] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState<string | undefined>();

  // success snippet flag + values computed for backend update
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [periodDays, setPeriodDays] = useState<number>(0);
  const [finalizing, setFinalizing] = useState(false); // concurrency guard

  const handleBack = () => {
    currentStep.get == 2
      ? currentStep.set(EPaymentStep.STEP_ONE)
      : currentStep.get == 1 && hasChoosePayment
      ? setHasChoosePayment(false)
      : navigation.goBack();
  };

  const handleNext = () => currentStep.set(EPaymentStep.STEP_TWO);

  const goHome = () => {
    navigation.navigate('HomeScreen' as never);
    // Or hard reset:
    // navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' as never }] });
  };

  const paymentStep = useMemo(() => {
    switch (currentStep.get) {
      case EPaymentStep.STEP_ONE:
        return <StepOne order_no={order_no} />;
      case EPaymentStep.STEP_TWO:
        return <StepTwo order_no={order_no} />;
      default:
        return <></>;
    }
  }, [currentStep.get]);

  // ---- PayPal flow (backend owns secrets; frontend only calls our backend) ----
  const onPressPaypal = async (): Promise<void> => {
    try {
      setPaymentSuccess(false); // reset success snippet for new attempt
      setFinalizing(false);     // reset guard for this session

      const result = await defiNotifyRequest.getPaymentByOrder({ order_no });
      if (result) {
        const computedTotal = Number(
          (
            Math.round(Number(result?.data?.price) * Number(duration.get) * 100) /
            100
          ).toFixed(2),
        );
        const computedPeriod = Number(duration.get) * 30;

        setTotalValue(computedTotal);
        setPeriodDays(computedPeriod);
        // NEW: create order via backend (no client secrets)
        const create = await paypalApi.createOrder({
          order_no,
          months: Number(duration.get),
        });

        if (create?.approveUrl) {
          setPaypalUrl(create.approveUrl);
        } else {
          ToastShow({ title: 'Unable to start PayPal.', type: 'error' });
        }
      }
    } catch (error) {
      console.log('error', error);
      ToastShow({ title: 'Failed to start PayPal.', type: 'error' });
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(undefined);
  };

const onShouldStart = (req: any) => {
  const url: string = req?.url || '';

  // Only handle our backend return page, regardless of domain
  if (url.includes(AFTER_PATH)) {
    try {
      const { query } = queryString.parseUrl(url);
      const status = (query?.status as string) || '';
      const tokenParam = query?.token as string | string[] | undefined;

      if (status === 'approved') {
        const orderId = Array.isArray(tokenParam)
          ? (tokenParam.find((i) => i) as string)
          : tokenParam;
        if (orderId) void paymentSuccessHandler(orderId);
      } else {
        // status === 'cancel' (or anything else): just close the modal
        clearPaypalState();
      }
    } catch (e) {
      console.log('parse after url error', e);
      clearPaypalState();
    }
    // Prevent the WebView from rendering the /paypal/after page
    return false;
  }

  return true; // allow all other PayPal navigations
};

// Optional fallback if some platforms still fire it:
const onUrlChange = (nav: any) => {
  const url: string = nav?.url || '';
  if (!url.includes(AFTER_PATH)) return;

  try {
    const { query } = queryString.parseUrl(url);
    const status = (query?.status as string) || '';
    const tokenParam = query?.token as string | string[] | undefined;

    if (status === 'approved') {
      const orderId = Array.isArray(tokenParam)
        ? (tokenParam.find((i) => i) as string)
        : tokenParam;
      if (orderId) void paymentSuccessHandler(orderId);
    } else {
      clearPaypalState();
    }
  } catch (e) {
    console.log('parse after url error (fallback)', e);
    clearPaypalState();
  }
};

  const paymentSuccessHandler = async (id: string | (string | null)[]) => {
    if (finalizing) return;      // guard against double-fire
    setFinalizing(true);

    try {
      const orderId = Array.isArray(id)
        ? (id.find((i) => i !== null) as string) || ''
        : id;

      // NEW: capture via backend (server stores capture_id & marks paid)
      const cap = await paypalApi.captureOrder({
        orderId,
        order_no,
        months: Number(duration.get),
      });

      /* (Optional) still call your updater—pass capture_id for redundancy; backend is already authoritative
      try {
        await defiNotifyRequest.updateLastAccessPayment({
          order_no,
          period: periodDays,
          total_value: totalValue,
          months: Number(duration.get),
          mark_paid: true,
          paypal_capture_id: cap?.capture_id,
        });
      } catch (e) {
        console.log('order update error', e);
      }
      */
      setPaymentSuccess(true); // show success snippet + switch button to Done
      ToastShow({ title: 'Payment successful!', type: 'success' });
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
      ToastShow({ title: 'Payment failed to capture.', type: 'error' });
      clearPaypalState();
    } finally {
      setFinalizing(false);
    }
  };
  // ---- end PayPal flow ----

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
        <Box flex={1} backgroundColor={'white'} paddingBottom={insets.bottom + 6}>
          <Modal visible={!!paypalUrl}>
            <View style={{ flex: 1 }}>
              <WebView
                source={{ uri: paypalUrl ?? '' }}
                onShouldStartLoadWithRequest={onShouldStart}  // <— blocks return/cancel pages (no flash)
                onNavigationStateChange={onUrlChange}        // fallback
              />
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

              {/* Success snippet (unchanged look) */}
              {paymentSuccess && (
                <Box
                  borderWidth={1}
                  borderRadius={12}
                  borderColor='#34D399'
                  backgroundColor='#ECFDF5'
                  padding={12}
                  marginVertical={8}
                >
                  <Typography color='#065F46' fontWeight='700'>
                    Payment successful — your subscription is now active.
                  </Typography>
                </Box>
              )}

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
                  <ButtonPrimary
                    borderRadius={6}
                    textColor='#fff'
                    onPressCustom={() => (paymentSuccess ? goHome() : onPressPaypal())}
                    backgroundColor='#1562F8'
                    title={paymentSuccess ? 'Done' : 'Next'}
                  />
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
