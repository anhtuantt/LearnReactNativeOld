import Box from '@/components/Box';
import Typography from '@/components/Typography';
import { compareObject } from '@/utils';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import FastImage from 'react-native-fast-image';

interface ISpecificFeature {
  image: string;
  title: string;
  description: string;
}
const data: ISpecificFeature[] = [
  {
    image:'https://www.cryptonotifycentral.com/wp-content/uploads/2022/06/service6.png',
    title: 'All Tools in Telegram',
    description:
      'Access all your crypto monitoring tools within the familiar interface of Telegram, centralizing your alerts and updates in one convenient location.',
  },
  {
    image:'https://www.cryptonotifycentral.com/wp-content/uploads/2022/06/service7.png',
    title: 'Real-Time Bot Alerts',
    description:
      'Receive instant alerts to keep you informed of critical market changes and updates, enabling proactive decision-making.',
  },
  {
    image:'https://www.cryptonotifycentral.com/wp-content/uploads/2022/06/service4.png',
    title: 'Ease of Use',
    description:
      'Our bots are designed for simplicity, allowing you to easily customize settings with intuitive commands, ensuring a hassle-free experience.',
  },
  {
    image:'https://www.cryptonotifycentral.com/wp-content/uploads/2022/06/service2.png',
    title: 'Privacy and Safety',
    description:
      'Our commitment to your privacy and asset safety is unwavering. By utilizing read-only smart contracts and requiring only a wallet address, we ensure a secure and scam-free experience.',
  },
  {
    image:'https://www.cryptonotifycentral.com/wp-content/uploads/2022/06/service5.png',
    title: 'Simple Registration',
    description:
      'Start with a 7-day free trial, offering full access to our services with no initial payment required. Our simple registration process gets you set up and ready in moments.',
  },
  {
    image:'https://www.cryptonotifycentral.com/wp-content/uploads/2022/06/service3.png',
    title: 'Dedicated Support',
    description:
      'Get help 24/7, your way. Our friendly support team is available through live chat for quick answers or join our active Telegram group for discussions and community tips.',
  },
];

const SpecificFeature = () => {
  return (
    <>
      <Box>
        <Typography fontWeight={700} color='white' textAlign='center' fontSize={30} variant='h1'>
          Why People Love Using Us?
        </Typography>
      </Box>
      <Box padding={12}>
        <FlashList
          data={data}
          keyExtractor={(data, index) => `${data.title}_${index}`}
          renderItem={({ item }: { item: ISpecificFeature }) => <SpecificFeatureItem item={item} />}
          estimatedItemSize={310}
          ItemSeparatorComponent={() => <Box height={24}/>}
        />
      </Box>
    </>
  );
};

export default React.memo(SpecificFeature, compareObject);

interface ISpecificFeatureItemProps {
  item: ISpecificFeature;
}
const SpecificFeatureItem = ({ item }: ISpecificFeatureItemProps) => {
  return (
    <Box borderRadius={12} padding={24} backgroundColor={'white'} gap={12}>
      <Box justifyContent='center' alignItems='center'>
        <FastImage
          source={{ uri: item.image }}
          style={{width:50, height: 50, marginBottom: 32}}
          resizeMode={'contain'}
        />
      </Box>
      <Typography textAlign='center' color='black' fontSize={24} fontWeight={600}>{item.title}</Typography>
      <Typography fontSize={16} color='black' textAlign='center'>{item.description}</Typography>
    </Box>
  );
};
