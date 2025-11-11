import Box from '@/components/Box';
import Typography from '@/components/Typography';
import CountNotification from '@/containers/Notification/CountNotification';
import React from 'react';

const Header = () => {
  return (
    <>
      <Box justifyContent='center' alignItems='center' padding={24}>
        <Typography color='#FFFFFF' fontSize={18} fontWeight={'500'}>DefiNotify</Typography>
        <Box position={'absolute'} right={12} top={24}>
          <CountNotification/>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Header);