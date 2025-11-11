import { defiNotifyRequest } from '@/app/api';
import { RouteName } from '@/app/routes/routeConfigs';
import BottomSheetModal from '@/components/BottomSheetModal';
import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import { ToastShow } from '@/components/Toast';
import Typography from '@/components/Typography';
import { ACTIONS, STATUS } from '@/features/defiNotify/types';
import { colors } from '@/features/system/theme/configs/colors';
import ActionOrderForm from '@/screens/DeFiNotify/CreateOrder/ActionOrderForm';
import IconPlatForm from '@/screens/DeFiNotify/CreateOrder/IconPlatForm';
import { handleDeviceIdStorage, maskAddressCoin } from '@/utils/helpers';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

interface IOrderData {
  alert_threshold: number;
  chain: string;
  created_date: string;
  date_label: string;
  expired_date: string;
  frequency: number;
  lastupdate: string;
  notify_enabled: string;
  order_no: string;
  platform: string;
  aave_fork: number;
  pool_name: string;
  position: number;
  position_label: string;
  service: string;
  status: string;
  wallet: string;
}

interface IYourRegistrationProps {
  setIsExpired: (data: boolean) => void;
  setIsRegistered: (data: boolean) => void;
  isRefreshing: boolean;
  setOrderNoExpired: (data: string) => void;
}
const YourRegistration = (props: IYourRegistrationProps) => {
  const { setIsExpired, isRefreshing, setIsRegistered, setOrderNoExpired } = props;
  const [orderData, setOrderData] = useState<IOrderData[]>([]);
  const [isOpenChangeOrder, setIsOpenChangeOrder] = useState(false);
  const [orderItemInfo, setOrderItemInfo] = useState();
  const isFocused = useIsFocused();
  const navigation: NavigationProp<any, any> = useNavigation();

  useLayoutEffect(() => {
    void getOrderData();
  }, [isFocused]);

  useLayoutEffect(() => {
    if (isRefreshing) {
      void getOrderData();
    }
  }, [isRefreshing]);

  useEffect(() => {
    handleCheckStatusExpired();
    setIsRegistered(orderData.length > 0);
  }, [orderData]);

  const getOrderData = async () => {
    const device_id = await handleDeviceIdStorage();
    const res = await defiNotifyRequest.getOrderList({ device_id });
    if (res) {
      setOrderData(res.data);
    }
  };
  const handleChangeStatus = async (notify_enabled: string, order_no: string) => {
    const id = await handleDeviceIdStorage();
    const notify = notify_enabled == 'off' ? 1 : 0;
    defiNotifyRequest
      .notify({ onoff: notify, device_id: id, order_no: order_no })
      .then(res => {
        //ToastShow({ title: res?.error ? res?.error : res?.message, type: res?.error ? 'error' : 'success' });
        void getOrderData();
      })
      .catch(() => {
        ToastShow({ title: 'error!', type: 'error' });
      });
  };
  const handleAction = async (action: string, item: any) => {
    switch (action) {
      case ACTIONS.CHANGE:
        setOrderItemInfo(item);
        setIsOpenChangeOrder(true);
        break;
      case ACTIONS.NOTIFY_ON:
      case ACTIONS.NOTIFY_OFF:
        await handleChangeStatus(item?.notify_enabled, item?.order_no);
        break;

      default:
        break;
    }
  };
  const handleCheckStatusExpired = () => {
    const anyExpired = orderData.some(e => e.status == STATUS.EXPIRED);
    const firstOrderExpired = orderData
      .filter(x => x.status == STATUS.EXPIRED)
      .sort((a, b) => new Date(a.expired_date).getTime() - new Date(b.expired_date).getTime())
      .shift();
    setOrderNoExpired(firstOrderExpired?.order_no ?? '');
    setIsExpired(anyExpired);
  };
  if (orderData.length == 0) return <></>;
  const renderItem = ({ item }: { item: IOrderData }) => (
    <RegisterItem
      item={item}
      onToggle={() => handleAction(ACTIONS.NOTIFY_ON, item)}
      onChange={() => handleAction(ACTIONS.CHANGE, item)}
    />
  );
  return (
    <>
      <Box gap={12} marginBottom={12}>
        <Box flexDirection='row' justifyContent={'space-between'} alignItems='center'>
          <Typography color='white' fontSize={16} fontWeight={500}>
            Your alerts
          </Typography>
          <ButtonSync onPress={() => navigation.navigate(RouteName.DeFiScreen)}>
            <Typography color='#1562F8' fontSize={13} fontWeight={400}>
              See all
            </Typography>
          </ButtonSync>
        </Box>
        <FlashList
          data={orderData}
          estimatedItemSize={99}
          ItemSeparatorComponent={() => <Box height={12} />}
          renderItem={renderItem}
        />
      </Box>
      <BottomSheetModal isOpen={isOpenChangeOrder} onCloseModal={() => setIsOpenChangeOrder(false)} isShowCloseIcon>
        <ActionOrderForm
          onClose={() => setIsOpenChangeOrder(!isOpenChangeOrder)}
          onRefresh={getOrderData}
          orderItemInfo={orderItemInfo}
        />
      </BottomSheetModal>
    </>
  );
};

export default YourRegistration;

interface IRegisterItemProps {
  item: IOrderData;
  onToggle: () => void;
  onChange: () => void;
}
const RegisterItem = ({ item, onToggle, onChange }: IRegisterItemProps) => {
  const [isOn, setIsOn] = useState(item.notify_enabled === 'on');
  const navigation: NavigationProp<any, any> = useNavigation();

  useEffect(() => {
    setIsOn(item.notify_enabled === 'on');
  }, [item.notify_enabled]);

  const handleLocalToggle = () => {
    setIsOn(prev => !prev);
    onToggle();
  };

  return (
    <Box
      width={'100%'}
      flexDirection='row'
      gap={16}
      borderRadius={12}
      padding={12}
      borderWidth={1}
      borderColor={item?.status === STATUS.EXPIRED ? '#D73232' : ''}
      backgroundColor={item?.notify_enabled == 'on' ? colors.background.main : '#3c3c44'}>
      {/* left */}
      <Box>
        <IconPlatForm name={item.platform} />
      </Box>
      {/* right */}
      <Box flex={1} gap={2}>
        {/* row */}
        <Box flexDirection='row' justifyContent={'space-between'} alignItems='center'>
          <Typography color='white' fontSize={14} fontWeight={500}>
            {item?.platform?.toUpperCase()}{' '}
            {item?.pool_name == 'nopool' || item?.pool_name == '' ? '' : '- ' + item?.pool_name.toUpperCase()}
          </Typography>
          <ToggleSwitch
            isOn={isOn}
            onColor='#1562F8'
            offColor='gray'
            size='medium'
            useNativeDriver
            animationSpeed={50}
            onToggle={handleLocalToggle}
          />
        </Box>
        {/* row */}
        <Box flexDirection='row' gap={8}>
          <Typography fontSize={13} fontWeight={400} color='#9197B0'>
            No
          </Typography>
          <Typography fontSize={13} fontWeight={400} color='white'>
            {item?.order_no}
          </Typography>
        </Box>
        {/* row */}
        <Box flexDirection='row' gap={8}>
          <Typography fontSize={13} fontWeight={400} color='#9197B0'>
            Wallet
          </Typography>
          <Typography fontSize={13} fontWeight={400} color='white'>
            {maskAddressCoin(item?.wallet)}
          </Typography>
        </Box>
        <Box
          marginTop={12}
          paddingTop={12}
          borderTopColor={'#333743'}
          borderTopWidth={1}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'>
          <Typography color='#9197B0'>
            Status <Typography color='#fff'>{item?.status}</Typography>
          </Typography>
          {(item?.status === STATUS.EXPIRED || item?.status === STATUS.UNPAID || item?.status === STATUS.TRIAL) && (
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.Payment, { order_no: item?.order_no })}>
              <Typography fontSize={13} color='#1562F8' style={{ lineHeight: 18 }}>
                {item?.status === STATUS.TRIAL ? 'Pay now' : 'Renew'}
              </Typography>
            </TouchableOpacity>
          )}
        </Box>
        {/* row */}
        <Box height={1} backgroundColor={'#333743'} marginVertical={8} />
        {/* row */}
        <Box flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
          <Box flexDirection='row' gap={8}>
            <Typography fontSize={13} fontWeight={400} color='#9197B0'>
              Alert threshold
            </Typography>
            <Typography fontSize={13} fontWeight={700} color='white'>
              {item?.alert_threshold}
              {item?.aave_fork==1 ? '' : '%'}
            </Typography>
            <Typography
              fontSize={13}
              fontWeight={700}
              color={
                item?.aave_fork==1
                  ? item?.alert_threshold < item?.position
                    ? 'green'
                    : 'red'
                  : item?.alert_threshold > item?.position
                    ? 'green'
                    : 'red'
              }>
              {item?.position?.toFixed(2)}
              {item?.aave_fork==1 ? '' : '%'}
            </Typography>
          </Box>
          {(item?.status === STATUS.TRIAL || item?.status === STATUS.PAID) && (
            <TouchableOpacity onPress={onChange}>
              <Typography fontSize={13} color='#1562F8' style={{ lineHeight: 18 }}>
                Change
              </Typography>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  );
};
