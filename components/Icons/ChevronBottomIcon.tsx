import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
import { colors } from '@/features/system/theme/configs/colors';
const ChevronBottomIcon = (props: IconProps) => {
  const { color = colors.primary.main, width = 12, height = 6 } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 12 6" fill="none">
      <Path d="M11 1L6.88384 4.67453C6.39773 5.10849 5.60227 5.10849 5.11616 4.67453L1 1"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </Svg>

  );
};
export default ChevronBottomIcon;
