import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
const CloseModalIcon = (props: IconProps) => {
  const { width = 24, height = 24, color = '#9199B1' } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <Path d='M6 18L18 6M6 6L18 18' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </Svg>
  );
};
export default CloseModalIcon;
