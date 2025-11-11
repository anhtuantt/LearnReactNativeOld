import Box from '@/components/Box';
import Icons from '@/components/Icons';
import Typography from '@/components/Typography';
import { colors } from '@/features/system/theme/configs/colors';
import React from 'react';
import { FlatList } from 'react-native';

const DefiFeature = () => {
  const listFeature = [
    'Fast and Secure',
    'Integrate with Telegram',
    'Maximize your profit',
    'No wallet control',
    'Manage all in one app',
    'Instant voice alert',
  ];
  const { CheckIcon } = Icons;
  return (
    <>
      <Box gap={16}>
        <Box>
          <Typography color='white' fontSize={16} fontWeight={500} style={{letterSpacing: 0.2}}>Why DefiNotify</Typography>
        </Box>
        <Box backgroundColor={colors.background.main} borderRadius={12} padding={16}>
          <FlatList
            data={listFeature}
            numColumns={2}
            renderItem={({ item }: { item: string }) => {
              return (
                <>
                  <Box marginVertical={2} width={'50%'} flexDirection='row' alignItems='center' gap={8}>
                    <CheckIcon width={16} height={16} color='#28A8E9' />
                    <Box flex={1}>
                      <Typography fontSize={12} color='white'>{ item }</Typography>
                    </Box>
                  </Box>
                </>
              );
            }} />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(DefiFeature);