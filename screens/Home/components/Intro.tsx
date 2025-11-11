import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Typography from '@/components/Typography';
import { colors } from '@/features/system/theme/configs/colors';
import React from 'react';

const Intro = () => {
  return (
    <>
      <Box paddingHorizontal={20} marginTop={32}>
        <Typography
          color={'white'}
          variant={'h1'}
          textAlign={'center'}
          fontWeight={'bold'}>
              Real-time Telegram Alert Notification
        </Typography>
      </Box>
      <Box paddingHorizontal={18}>
        <Typography textAlign={'center'} color={'white'}>
              Protect your Crypto asset and no worry about getting liquidated!
        </Typography>
      </Box>
      <Box justifyContent={'center'} alignItems={'center'}>
        <ButtonSync onPress={() => {}} padding={12} backgroundColor={colors.primary.main} borderRadius={8}>
          <Typography fontWeight={800} color={'white'}>GET STARTED FREE!</Typography>
        </ButtonSync>
      </Box>
    </>
  );
};

export default Intro;