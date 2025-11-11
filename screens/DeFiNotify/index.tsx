import { defiNotifyRequest } from '@/app/api';
import { RouteName } from '@/app/routes/routeConfigs';
import BottomSheetModal from '@/components/BottomSheetModal';
import Box from '@/components/Box';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Images from '@/components/Images';
import LayoutScreen from '@/components/LayoutScreen';
import { ToastShow } from '@/components/Toast';
import Typography from '@/components/Typography';
import { ACTIONS, STATUS } from '@/features/defiNotify/types';
import { colors } from '@/features/system/theme/configs/colors';
import { handleDeviceIdStorage, maskAddressCoin } from '@/utils/helpers';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, RefreshControl, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import ActionOrderForm from './CreateOrder/ActionOrderForm';
import IconPlatForm from './CreateOrder/IconPlatForm';
import Icons from '@/components/Icons';

const DeFiScreen = () => {
  //const realm = useRealm();
  const isFocused = useIsFocused();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenChangeOrder, setIsOpenChangeOrder] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [orderItemInfo, setOrderItemInfo] = useState<any>();
  const { NoDataFound } = Images;
  const navigation: NavigationProp<any, any> = useNavigation();
  const { UserIcon, RefreshIcon, TrashIcon, ThreeDotIcon } = Icons;
  useEffect(() => {
    void getOrderData();
  }, [isFocused]);

  const getOrderData = async () => {
    setLoading(true);
    const device_id = await handleDeviceIdStorage();
    const res = await defiNotifyRequest.getOrderList({ device_id });
    if (res) {
      setOrderData(res.data);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    await getOrderData();
  };

  const handleNotify = async (notify_enabled: string, order_no: string) => {
    try {
      const id = await handleDeviceIdStorage();
      const notify = notify_enabled === 'off' ? 1 : 0;

      await defiNotifyRequest.notify({ onoff: notify, device_id: id, order_no: order_no });

      const resOrder = await defiNotifyRequest.getOrderList({ device_id: id });
      if (resOrder) {
        setOrderData(resOrder.data);
      }
    } catch (error) {
      ToastShow({ title: 'Error!', type: 'error' });
    }
  };

  const handleDeleteOrder = (order_no: string) => {
    defiNotifyRequest
      .deleteOrder({ order_no })
      .then(res => {
        setIsOpenSetting(false);
        setIsDelete(false);
        ToastShow({ title: res?.error ? res?.error : res?.message, type: res?.error ? 'error' : 'success' });
        void getOrderData();
      })
      .catch(x => {
        console.log(x);
        ToastShow({ title: 'error!', type: 'error' });
      });
  };

  const handleRenew = async (order_no: string) => {
    navigation.navigate(RouteName.Payment, { order_no: order_no });
    // const id = await handleDeviceIdStorage();
    // defiNotifyRequest
    //   .renewOrder({ device_id: id, order_no: order_no })
    //   .then(res => {
    //     if (!res?.error) {
    //       const newData: INotification = {
    //         title: 'Renew',
    //         message: res?.message ?? '',
    //         type: EINotificationType.ReNew,
    //         orderNo : ''
    //       };
    //       realm.write(() => {
    //         realm.create('Notification', Notification.generate(newData));
    //       });
    //     }
    //     ToastShow({ title: res?.error ? res?.error : res?.message, type: res?.error ? 'error' : 'success' });
    //     void onRefresh();
    //   })
    //   .catch(() => {
    //     ToastShow({ title: 'error!', type: 'error' });
    //   });
  };

  const handleAction = async (action: string, item: any) => {
    switch (action) {
      case ACTIONS.RENEW:
        await handleRenew(item?.order_no);
        break;

      case ACTIONS.CHANGE:
        setOrderItemInfo(item);
        setIsOpenChangeOrder(true);
        break;

      case ACTIONS.NOTIFY_ON:
      case ACTIONS.NOTIFY_OFF:
        await handleNotify(item?.notify_enabled, item?.order_no);
        break;

      default:
        // Handle default or unknown action
        break;
    }
  };
  interface IRegisterItemProps {
    item: any;
  }
  const renderItem = ({ item }: { item: any }) => <RegisterItem item={item} />;

  const RegisterItem = ({ item }: IRegisterItemProps) => {
    const [isOn, setIsOn] = useState(item.notify_enabled === 'on');
    useEffect(() => {
      setIsOn(item.notify_enabled === 'on');
    }, [item.notify_enabled]);

    const handleLocalToggle = () => {
      setIsOn(prev => !prev);
      void handleAction(ACTIONS.NOTIFY_ON, item);
    };
    return (
      <Box
        padding={16}
        marginBottom={16}
        marginHorizontal={10}
        borderRadius={16}
        borderWidth={1}
        backgroundColor={item?.notify_enabled == 'on' ? colors.background.main : '#3c3c44'}
        borderColor={item?.status === STATUS.EXPIRED ? '#D73232' : ''}
        flexDirection='row'
        gap={8}>
        <Box marginTop={2}>
          <IconPlatForm name={item.platform} />
        </Box>
        <Box flex={1}>
          <Box flexDirection='row' justifyContent='space-between'>
            <Typography color='white' fontSize={14} fontWeight={500}>
              {item?.platform?.toUpperCase()}{' '}
              {item?.pool_name == 'nopool' || item?.pool_name == '' ? '' : '- ' + item?.pool_name.toUpperCase()}
            </Typography>
            <Box flexDirection='row' gap={16}>
              <ToggleSwitch
                isOn={isOn}
                onColor='#1562F8'
                offColor='#4E4E5A'
                size={'medium'}
                onToggle={handleLocalToggle}
                useNativeDriver={true}
                animationSpeed={50}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsOpenSetting(true);
                  setOrderItemInfo(item);
                }}>
                <ThreeDotIcon />
              </TouchableOpacity>
            </Box>
          </Box>
          <Typography color='#9197B0'>
            No <Typography color='#fff'>{item?.order_no}</Typography>
          </Typography>
          <Typography color='#9197B0'>
            Wallet <Typography color='#fff'>{maskAddressCoin(item?.wallet)}</Typography>
          </Typography>
          <Typography color='#9197B0'>
            Service <Typography color='#fff'>{item?.service}</Typography>
          </Typography>
          <Typography color='#9197B0'>
            Chain <Typography color='#fff'>{item?.chain?.toUpperCase()}</Typography>
          </Typography>
          <Typography color='#9197B0'>
            Created date <Typography color='#fff'>{item?.created_date}</Typography>
          </Typography>
          <Typography color='#9197B0'>
            Expired date <Typography color='#fff'>{item?.expired_date}</Typography>
          </Typography>
          <Typography color='#9197B0'>
            Last updated <Typography color='#fff'>{item?.lastupdate}</Typography>
          </Typography>
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
              <TouchableOpacity onPress={() => handleAction(ACTIONS.RENEW, item)}>
                <Typography fontSize={13} color='#1562F8' style={{ lineHeight: 18 }}>
                  {item?.status === STATUS.TRIAL ? 'Pay now' : 'Renew'}
                </Typography>
              </TouchableOpacity>
            )}
          </Box>

          <Box marginTop={12} paddingTop={12} borderTopColor={'#333743'} borderTopWidth={1}></Box>
          <Typography color='#9197B0'>
            Alert frequency <Typography color='#fff'>{item?.frequency}</Typography>
          </Typography>
          <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
            <Box flexDirection='row' gap={4}>
              <Typography color='#9197B0'>Alert threshold</Typography>
              <Typography color='#fff'>{item?.alert_threshold}</Typography>

              <Typography
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
              <TouchableOpacity onPress={() => handleAction(ACTIONS.CHANGE, item)}>
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

  return (
    <LayoutScreen flex={1} paddingHeader={10} screenName={'Your alerts'} isShowBackBtn hasNotifyIcon>
      <Box flex={1} position='relative'>
        {loading ? (
          <Box flex={1} justifyContent='center' alignItems='center'>
            <ActivityIndicator size='large' />
          </Box>
        ) : orderData?.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={false} />}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground
              source={NoDataFound}
              style={{ width: 70, height: 70, alignSelf: 'center' }}></ImageBackground>
            <Typography color='#fff'>{'No data found!'}</Typography>
          </ScrollView>
        ) : (
          <Box flex={1} paddingBottom={48}>
            <FlashList
              data={orderData}
              renderItem={renderItem}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
              keyExtractor={(data, index) => `${index}_${data.order_no}`}
              estimatedItemSize={316}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        )}
        {isOpenChangeOrder && (
          <BottomSheetModal isOpen={isOpenChangeOrder} onCloseModal={() => setIsOpenChangeOrder(false)} isShowCloseIcon>
            <ActionOrderForm
              onClose={() => setIsOpenChangeOrder(!isOpenChangeOrder)}
              onRefresh={onRefresh}
              orderItemInfo={orderItemInfo}
            />
          </BottomSheetModal>
        )}
        {isOpenSetting && (
          <BottomSheetModal isOpen={isOpenSetting} onCloseModal={() => setIsOpenSetting(false)} isShowCloseIcon>
            <Box>
              <Typography variant='h3'>Options</Typography>
              <Box marginTop={12} marginBottom={12} borderTopColor={'#9197B0'} borderTopWidth={1}></Box>
              <TouchableOpacity onPress={() => handleAction(ACTIONS.RENEW, orderItemInfo)}>
                <Box flexDirection='row' alignItems='center' gap={10} marginBottom={16}>
                  <UserIcon />
                  <Box>
                    <Typography color='#4E4E62'>Renew alert</Typography>
                  </Box>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsOpenSetting(false);
                  void handleAction(ACTIONS.CHANGE, orderItemInfo);
                }}>
                <Box flexDirection='row' alignItems='center' gap={10} marginBottom={16}>
                  <RefreshIcon />
                  <Box>
                    <Typography color='#4E4E62'>Change alert threshold</Typography>
                  </Box>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsOpenSetting(false);
                  setIsDelete(true);
                }}>
                <Box flexDirection='row' alignItems='center' gap={10} marginBottom={16}>
                  <TrashIcon />
                  <Box>
                    <Typography color='#4E4E62'>Delete alert</Typography>
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
          </BottomSheetModal>
        )}
        {isDelete && (
          <BottomSheetModal isOpen={isDelete} onCloseModal={() => setIsDelete(false)} isShowCloseIcon>
            <Box>
              <Typography variant='h3'>Delete alert?</Typography>
              <Box marginTop={16} marginBottom={32}>
                <Typography color='#4E4E62'>
                  Are you sure you want to delete this alert? This action cannot be undone.
                </Typography>
              </Box>
              <Box flexDirection='row' gap={16}>
                <ButtonPrimary
                  borderColor={'#DBDDE5'}
                  backgroundColor='#fff'
                  textColor={colors.text.main}
                  borderRadius={6}
                  flex={1}
                  title='Cancel'
                  onPressCustom={() => setIsDelete(false)}
                  borderWidth={1}
                />
                <ButtonPrimary
                  borderRadius={6}
                  flex={1}
                  backgroundColor='#FF3B30'
                  title='Delete'
                  onPressCustom={() => handleDeleteOrder(orderItemInfo?.order_no)}
                />
              </Box>
            </Box>
          </BottomSheetModal>
        )}
        <Box
          position='absolute'
          bottom={0}
          backgroundColor={colors.background.main}
          flex={1}
          width={'100%'}
          padding={4}>
          <ButtonPrimary
            position='relative'
            width={'100%'}
            paddingHorizontal={28}
            justifyContent='center'
            alignItems='center'
            onPressCustom={() => navigation.navigate(RouteName.CreateOrder)}
            title='New Alert'
          />
        </Box>
      </Box>
    </LayoutScreen>
  );
};

export default DeFiScreen;
