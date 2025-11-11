import { defiNotifyRequest } from '@/app/api';
import Box from '@/components/Box';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import CloseModalIcon from '@/components/Icons/CloseModalIcon';
import LayoutScreen from '@/components/LayoutScreen';
import TextInput from '@/components/TextInput';
import { ToastShow } from '@/components/Toast';
import Typography from '@/components/Typography';
import { EINotificationType, INotification, Notification } from '@/features/database/model/Notification';
import { IRegisterRequest } from '@/features/defiNotify/defiNotifyClient';
import { colors } from '@/features/system/theme/configs/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Pressable, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownChain from './DropdownChain';
import DropdownFrequency from './DropdownFrequency';
import DropdownPlatform, { IPlatformData } from './DropdownPlatform';
import DropdownServices from './DropdownServices';
import RegisterFromControl from './RegisterFromControl';
import Sound from 'react-native-sound';
import { handleDeviceIdStorage } from '@/utils/helpers';

const CreateOrderScreen = () => {
  const realm = useRealm();
  const [alertThreshold, setAlertThreshold] = useState<string>();
  const [platformData, setPlatformData] = useState<IPlatformData[]>([]);
  const navigation: NavigationProp<any, any> = useNavigation();

  // Initialize useForm hook
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegisterRequest>({ defaultValues: {} });

  const platform = useWatch({ control, name: 'platform' });
  const chain = useWatch({ control, name: 'chain' });

  const onSubmit = async (data: IRegisterRequest) => {
    try {
      const device_id = await handleDeviceIdStorage();
      const fcm_token = (await AsyncStorage.getItem('fcm_token')) || '';
      const response = await defiNotifyRequest.register({ ...data, device_id, fcm_token });
      if (!response?.error) {
        const sound = new Sound('registration_complete.wav', Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('Failed to load the sound');
          }
          // Play the sound
          sound.play(success => {
            if (success) {
              console.log('Sound played successfully');
            } else {
              console.log('Playback failed');
            }
            // Release the sound when it's done
            sound.release();
          });
        });
        const newData: INotification = {
          title: 'Registration',
          message: response?.message ?? '',
          type: EINotificationType.Success,
          orderNo: '',
        };
        realm.write(() => {
          realm.create('Notification', Notification.generate(newData));
        });
        navigation.goBack();
      }
      ToastShow({
        title: response?.message || '',
        type: response?.error ? 'error' : 'success',
      });
    } catch (error) {
      ToastShow({ title: 'Registration failed', type: 'error' });
    }
  };

  const getPlatformData = async (chain: string) => {
    const response = await defiNotifyRequest.getPlatformByChain({ chain });
    if (response) {
      setPlatformData(response.data.map((item: string) => ({ name: item, description: item })));
    }
  };

  const validateWalletAddress = (value: string) => {
    // Required field validation
    if (!value) return 'Wallet address is required';

    // Platform-specific validation
    switch (chain) {
      case 'trx':
        return validateTronNetworkAddress(value);
      default:
        return validateEthereumAddress(value);
    }
  };

  const validateEthereumAddress = (address: string) => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return 'Invalid Ethereum address';
    }
    return true; // Validation passes
  };

  const validateTronNetworkAddress = (address: string) => {
    if (!/^T[a-zA-Z0-9]{33}$/.test(address)) {
      return 'Invalid Tron address';
    }
    return true; // Validation passes
  };

  return (
    <Box flex={1} backgroundColor={'transparent'}>
      <Pressable onPress={() => navigation.goBack()}>
        <Box width={'100%'} height={120} />
      </Pressable>
      <LayoutScreen
        flex={1}
        padding={16}
        paddingTop={0}
        isShowBackBtn
        backgroundColor='#fff'
        borderTopLeftRadius={16}
        borderTopRightRadius={16}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 16, right: 16, zIndex: 100 }}
          onPress={() => navigation.goBack()}>
          <CloseModalIcon />
        </TouchableOpacity>
        <Typography fontSize={24}>New Alert</Typography>
        <Box marginBottom={8}></Box>
        <KeyboardAwareScrollView keyboardOpeningTime={500} showsVerticalScrollIndicator={false}>
          <Box flex={1} backgroundColor={'#fff'}>
            <RegisterFromControl label={'Chain'} required error={errors.chain?.message}>
              <Controller
                control={control}
                rules={{
                  required: 'Chain selection is required',
                }}
                render={({ field: { onChange, value } }) => (
                  <DropdownChain
                    onChange={value => {
                      onChange(value);
                      void getPlatformData(value);
                      setValue('platform', '');
                    }}
                    value={value}
                  />
                )}
                name='chain'
              />
            </RegisterFromControl>
            <Box marginBottom={8}></Box>

            <Controller
              control={control}
              name='wallet_address'
              rules={{
                validate: validateWalletAddress,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label='Wallet address *'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Enter wallet address'
                />
              )}
            />
            {errors.wallet_address && (
              <Typography fontSize={12} color='red'>
                {String(errors.wallet_address.message)}
              </Typography>
            )}
            <Box marginBottom={8}></Box>

            <RegisterFromControl label={'Services'} required error={errors.service?.message}>
              <Controller
                control={control}
                rules={{
                  required: 'Services selection is required',
                }}
                render={({ field: { onChange } }) => <DropdownServices onChange={onChange} />}
                name='service'
              />
            </RegisterFromControl>
            <Box marginBottom={8}></Box>

            <RegisterFromControl label={'Platform'} required error={errors.platform?.message}>
              <Controller
                control={control}
                rules={{
                  required: 'Platform selection is required',
                }}
                render={({ field: { onChange } }) => (
                  <DropdownPlatform
                    onChange={onChange}
                    platformData={platformData}
                    platform={platform}
                    setAlertThreshold={setAlertThreshold}
                  />
                )}
                name='platform'
              />
            </RegisterFromControl>
            <Box marginBottom={8}></Box>

            <Controller
              control={control}
              name='alert_threshold'
              rules={{ required: 'Alert threshold is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label='Alert threshold *'
                  onBlur={onBlur}
                  onChangeText={text => {
                    const decimalPattern = /^\d*\.?\d{0,2}$/;
                    if (decimalPattern.test(text)) {
                      onChange(text);
                    }
                  }}
                  value={value?.toString()}
                  keyboardType='numeric'
                  placeholder='Enter your alert threshold'
                />
              )}
            />
            {errors.alert_threshold && (
              <Typography fontSize={12} color='red'>
                {String(errors.alert_threshold.message)}
              </Typography>
            )}
            {alertThreshold && <Typography>{alertThreshold}</Typography>}
            <Box marginBottom={8}></Box>

            <RegisterFromControl label={'Frequency'} required error={errors.frequency?.message}>
              <Controller
                control={control}
                rules={{
                  required: 'Frequency selection is required',
                }}
                render={({ field: { onChange } }) => <DropdownFrequency onChange={onChange} />}
                name='frequency'
              />
            </RegisterFromControl>
            <Box marginBottom={8}></Box>

            <Box flexDirection='row' gap={16}>
              <ButtonPrimary
                borderColor={'#DBDDE5'}
                backgroundColor='#fff'
                borderRadius={6}
                textColor={colors.text.main}
                flex={1}
                title='Cancel'
                onPressCustom={() => navigation.goBack()}
                borderWidth={1}
              />
              <ButtonPrimary
                borderRadius={6}
                flex={1}
                title='Submit'
                isSubmit={true}
                onPressCustom={handleSubmit(onSubmit)}
                onSubmit={handleSubmit(onSubmit)}
              />
            </Box>
          </Box>
        </KeyboardAwareScrollView>
      </LayoutScreen>
    </Box>
  );
};

export default CreateOrderScreen;
