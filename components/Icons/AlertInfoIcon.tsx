import Svg, { Defs, G, Path, ClipPath, Rect } from 'react-native-svg';
import { IconProps } from './';
import { colors } from '@/features/system/theme/configs/colors';

const AlertInfoIcon = (props: IconProps) => {
  const { color = colors.primary.main, width = 20, height = 20 } = props;
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_916_3008)">
        <Path
          d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M10 6.66669V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M10 13.3333H10.0083" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_916_3008">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default AlertInfoIcon;
