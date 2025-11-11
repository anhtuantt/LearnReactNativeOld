import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Typography from '@/components/Typography';
import { colors } from '@/features/system/theme/configs/colors';
import { compareObject } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import FastImage from 'react-native-fast-image';

interface IBotInfo {
  name: string;
  description: string;
  image: string;
}

const botList: IBotInfo[] = [
  {
    name: 'DeFi Notify Bot',
    description: 'Designed specifically for users of Defi lending protocols. It can help you track and receive notifications on the Position Health or Borrow Limit change in real-time. This helps you take timely actions to protect your assets from being liquidated.',
    image: 'https://www.cryptonotifycentral.com/wp-content/uploads/2024/07/definotify-thumb.jpg',
  },
  {
    name: 'CexNotify Bot',
    description:
      'Monitoring and notifying loan positions on Centralized Exchanges (CEX) such as Binance, Bitget, Bybit, etc. Monitoring and notifying margin and futures trading positions (both liquidation threshold and current profit) on CEXs.',
    image: 'https://www.cryptonotifycentral.com/wp-content/uploads/2024/07/cexnotify-thumb.jpg',
  },
];

const ListBot = () => {
  return (
    <FlashList
      data={botList}
      renderItem={({ item }: { item: IBotInfo; index: number }) => <BotItem botInfo={item} />}
      estimatedItemSize={440}
      keyExtractor={(data, index) => `${data.name}_${index}`}
    />
  );
};

export default ListBot;

interface IBotItemProps {
  botInfo: IBotInfo;
}
const BotItem = React.memo(
  (props: IBotItemProps) => {
    const { botInfo } = props;
    return (
      <Box backgroundColor={'white'} padding={12} gap={12} margin={24} borderRadius={12}>
        <FastImage
          source={{
            uri: botInfo.image,
          }}
          resizeMode={'contain'}
          style={{
            width: '100%',
            aspectRatio: 5/3
          }}
        />
        <Box>
          <Typography variant={'h3'} fontWeight={'800'}>
            {botInfo.name}
          </Typography>
        </Box>
        <Box>
          <Typography>{botInfo.description}</Typography>
        </Box>
        <ButtonSync onPress={() => {}} padding={14} backgroundColor={colors.primary.main} borderRadius={12} alignItems={'center'}>
          <Typography fontWeight={500} color={'white'}>How the bot works</Typography>
        </ButtonSync>
        <ButtonSync onPress={() => {}} padding={14} backgroundColor={'#f4b004'} borderRadius={12} alignItems={'center'}>
          <Typography fontWeight={500}>Add to Telegram</Typography>
        </ButtonSync>
      </Box>
    );
  },
  (prev, next) => compareObject(prev, next),
);
