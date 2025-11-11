import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
import { colors } from '@/features/system/theme/configs/colors';
const CheckIcon = (props: IconProps) => {
  const { color = colors.success.main, width = 13, height = 9 } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 24 17" fill="none">
      <Path
        d="M22.319.431L8.499 14.249a1 1 0 01-1.416 0L1.739 8.9a1 1 0 00-1.635.325 1 1 0 00.218 1.092l5.346 5.345a3.008 3.008 0 004.25 0L23.736 1.847A1 1 0 1022.319.431z"
        fill={color}
      />
    </Svg>
  );
};
export default CheckIcon;
