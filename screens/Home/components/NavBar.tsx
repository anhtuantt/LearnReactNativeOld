import Box from '@/components/Box';
import Icons from '@/components/Icons';
import CountNotification from '@/containers/Notification/CountNotification';

const NavBar = () => {
  const { HeaderIcon } = Icons;
  return (
    <Box
      backgroundColor={'white'}
      padding={12}
      flexDirection={'row'}
      justifyContent={'space-between'}
      paddingHorizontal={16}
      alignItems={'center'}>
      <HeaderIcon />
      <Box flexDirection={'row'} gap={12}>
        <CountNotification/>
      </Box>
    </Box>
  );
};

export default NavBar;
