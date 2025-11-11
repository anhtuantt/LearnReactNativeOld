import Box from '@/components/Box';
import Images from '@/components/Images';
import Typography from '@/components/Typography';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const Partner = () => {
  const { VenusImage, AAVEImage, JustlendImage, BinanceImage } = Images;
  const style = StyleSheet.create({
    image: {
      width:'100%', height:120
    }
  });
  return (
    <Box paddingHorizontal={24} marginBottom={12} flexDirection={'column'} gap={32}>
      <Box>
        <Typography variant={'h2'} color='white' textAlign='center' fontWeight={800}>Trusted Partner for Top Protocol Users</Typography>
      </Box>
      <Box backgroundColor={'white'} borderRadius={12} padding={32} >
        <BoxTitle title={'Decentralized Exchange (DeFi)'} />
        <FastImage source={VenusImage} style={style.image} resizeMode={'contain'} />
        <FastImage source={AAVEImage} style={style.image} resizeMode={'contain'} />
        <FastImage source={JustlendImage} style={style.image} resizeMode={'contain'} />
        <BoxTitle title={'Centralized Exchange'} />
        <FastImage source={BinanceImage} style={style.image} resizeMode={'contain'} />
      </Box>
    </Box>
  );
};

export default Partner;

interface IBoxTitleProps{
    title: string;
}
const BoxTitle = ({title}: IBoxTitleProps) => {
  return (
    <Box flexDirection='row' justifyContent='center' alignItems='center' gap={4}>
      <Box flex={1} height={1} backgroundColor={'#4E4E624D'}/>
      <Typography variant={'body1'} textAlign={'center'} fontWeight={700}>{ title}</Typography>
      <Box flex={1} height={1} backgroundColor={'#4E4E624D'}/>
    </Box>
  );
};