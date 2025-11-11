import { RouteName } from '@/app/routes/routeConfigs';
import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import { Notification } from '@/features/database/model/Notification';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@realm/react';
import { Text } from 'react-native';

const CountNotification = () => {
  const { NotifyIcon } = Icons;
  const navigation: NavigationProp<any, any> = useNavigation();
  const notifyListDataSort = useQuery(
    {
      type: Notification,
      query: collection => collection.filtered('isRead == false').sorted('createdAt', true),
    },
    [],
  );
  const countNewNotification = notifyListDataSort.length;
  const handleNavigate = () => {
    navigation.navigate(RouteName.NotifyList);
  };
  return (
    <ButtonSync onPress={handleNavigate}>
      {countNewNotification > 0 && (
        <Box
          position={'absolute'}
          right={-6}
          top={-6}
          zIndex={1}
          backgroundColor={'#FF8A00'}
          width={20}
          height={20}
          borderRadius={10}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text style={{ color: '#fff', fontSize: 10, fontFamily: 'PlusJakartaSans-Bold' }}>
            {countNewNotification > 9 ? '9+' : countNewNotification}
          </Text>
        </Box>
      )}

      <NotifyIcon width={24} height={24} color='#FFFFFF' />
    </ButtonSync>
  );
};

export default CountNotification;
