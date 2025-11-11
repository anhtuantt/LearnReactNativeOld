import * as React from 'react';
import DeviceInfo from 'react-native-device-info';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './';
import { colors } from '@/features/system/theme/configs/colors';
const isTablet = DeviceInfo.isTablet();

const CheckBoxIcon = (props: IconProps) => {
  const { color = colors.text.stTropaz, color2 = colors.text.regalBlue } = props;
  const size = isTablet ? 24 : 14;

  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M12.333 0H1.667A1.667 1.667 0 000 1.667v10.666A1.666 1.666 0 001.667 14h10.666A1.666 1.666 0 0014 12.333V1.667A1.667 1.667 0 0012.333 0zm-1.097 3.902l-6 6a.333.333 0 01-.472 0l-2-2a.333.333 0 01.472-.471L5 9.195l5.764-5.764a.333.333 0 01.472.471z"
        fill={color2}
      />
      <Path
        d="M12.333 0H1.667A1.667 1.667 0 000 1.667v10.666A1.666 1.666 0 001.667 14h10.666A1.666 1.666 0 0014 12.333V1.667A1.667 1.667 0 0012.333 0zM13 12.333a.666.666 0 01-.667.667H1.667A.666.666 0 011 12.333V1.667A.667.667 0 011.667 1h10.666a.667.667 0 01.667.667v10.666z"
        fill={color}
      />
    </Svg>
  );
};
export default CheckBoxIcon;
