import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
import { colors } from '@/features/system/theme/configs/colors';
const InfoIcon = (props: IconProps) => {
  const { color, width } = props;
  const newColor = color ?? colors.secondary.main;
  const size = width ?? 12;
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path
        d="M5 10A5 5 0 115 0a5 5 0 010 10zM5 .833a4.167 4.167 0 100 8.334A4.167 4.167 0 005 .833z"
        fill={newColor}
      />
      <Path
        d="M5.833 7.917H5V5h-.833v-.833H5A.833.833 0 015.833 5v2.917zM5 3.333a.625.625 0 100-1.25.625.625 0 000 1.25z"
        fill={newColor}
      />
    </Svg>
  );
};
export default InfoIcon;
