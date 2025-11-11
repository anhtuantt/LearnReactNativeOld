import Box from '@/components/Box';
import Typography from '@/components/Typography';
import React from 'react';

const Services = () => {
  return (
    <Box paddingHorizontal={12} gap={48}>
      <Box>
        <Typography variant={'h2'} color={'white'} textAlign={'center'}>
        Minimize Risk &amp; Maximize Profit with Our Services
        </Typography>
      </Box>
      <Box>
        <Typography variant={'body1'} color={'white'} textAlign={'center'}>
        Stay informed about your crypto assets with our Telegram bot service, providing real-time monitoring, health
        position updates, and borrow limit changes.
        </Typography>
      </Box>
    </Box>
  );
};

export default Services;
