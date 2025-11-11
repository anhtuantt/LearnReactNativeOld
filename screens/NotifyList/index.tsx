import Box from '@/components/Box';
import Icons from '@/components/Icons';
import Images from '@/components/Images';
import LayoutScreen from '@/components/LayoutScreen';
import Typography from '@/components/Typography';
import { EINotificationType, Notification } from '@/features/database/model/Notification';
import { schemas } from '@/features/database/Schema';
import { useQuery, useRealm } from '@realm/react';
import { FlashList } from '@shopify/flash-list';
import { useEffect } from 'react';
import { ImageBackground, RefreshControl } from 'react-native';

interface INotifyInfo {
  title: string;
  message: string;
  time: Date;
  type: EINotificationType;
  orderNo?: string;
}
const NotifyList = () => {
  const realm = useRealm();
  const { NoDataFound } = Images;

  const notifyListDataSort = useQuery(
    {
      type: Notification,
      query: collection => collection.sorted('createdAt', true),
    },
    [],
  );

  const listData = notifyListDataSort.map(item => {
    const res: INotifyInfo = {
      title: item.title,
      message: item.message,
      time: item.createdAt,
      type: item.type,
      orderNo: item.orderNo
    };
    return res;
  });

  useEffect(() => {
    markAllNotificationsRead();
    limit100Rows();
  }, []);

  const markAllNotificationsRead = () => {
    realm.write(() => {
      realm.objects(schemas.Notification).forEach(notification => {
        notification.isRead = true;
      });
    });
  };

  const limit100Rows = () => {
    const allItems = realm.objects(schemas.Notification).sorted('createdAt', true); // Sort by createdAt in descending order
    const excessRows = allItems.slice(100); // Get rows beyond the latest 100
    if (excessRows.length > 0) {
      realm.write(() => {
        excessRows.forEach(item => {
          realm.delete(item); // Delete excess rows
        });
      });
    }
  };

  return (
    <LayoutScreen screenName={'Notifications'} isShowBackBtn={true} flex={1} paddingHeader={10} hasThreeDotIcon>
      <Box backgroundColor={'#0C0C16'} flex={1}>
        {listData?.length === 0 ? (
          <Box flex={1} justifyContent='center' alignItems='center'>
            <ImageBackground
              source={NoDataFound}
              style={{ width: 70, height: 70, alignSelf: 'center' }}></ImageBackground>
            <Typography color='#fff'>{'No data found!'}</Typography>
          </Box>
        ) : (
          <Box flex={1}>
            <FlashList
              data={listData}
              renderItem={({ item }: { item: INotifyInfo }) => <NotifyItem item={item} />}
              ItemSeparatorComponent={() => <Box height={16} />}
              refreshControl={<RefreshControl refreshing={false} />}
              estimatedItemSize={163}
              keyExtractor={(data, index) => `${index}_${data.message}`}
            />
          </Box>
        )}
      </Box>
    </LayoutScreen>
  );
};

export default NotifyList;

interface INotifyItemProps {
  item: INotifyInfo;
}
const NotifyItem = (props: INotifyItemProps) => {
  const { item } = props;
  const { AlertSuccessIcon, AlertErrorIcon, AlertWarningIcon } = Icons;

  const getIconComponent = (type: EINotificationType) => {
    switch (type) {
      case EINotificationType.Success:
        return <AlertSuccessIcon />;
      case EINotificationType.ReNew:
        return <AlertErrorIcon />;
      case EINotificationType.Alert:
        return <AlertWarningIcon />;
      default:
        return null;
    }
  };
  return (
    <Box borderRadius={12} backgroundColor={'#1D1D29'} padding={16} gap={8} flexDirection='row' marginHorizontal={10}>
      <Box marginTop={2}>{getIconComponent(item.type)}</Box>
      <Box flex={1} gap={8}>
        <Box flexDirection='row' justifyContent='space-between'>
          <Typography color='#fff' fontSize={14}>
            {item.title.toUpperCase()}
          </Typography>
          <Typography color='#767e9c' fontSize={10}>
            {item.time.toLocaleString('en-US')}
          </Typography>
        </Box>
        <Typography fontSize={13} color='#fff' style={{ lineHeight: 18 }}>
          {item.message}
        </Typography>
      </Box>
    </Box>
  );
};
