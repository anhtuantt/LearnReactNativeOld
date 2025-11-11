import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
import { colors } from '@/features/system/theme/configs/colors';
const SearchCustomerIcon = (props: IconProps) => {
  const { width = 24, height = 24, stroke = colors.primary.main } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};
export default SearchCustomerIcon;
