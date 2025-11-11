import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from './';

const ThreeDotIconV2 = (props: IconProps) => {
  const { color = '#9197B0', width = 24, height = 24 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <Rect width={24} height={24} rx={12} fill='white' fillOpacity={0.06} />
      <Path
        d='M12 7.33329L12 7.33996M12 12L12 12.0066M12 16.6666L12 16.6733M12 7.99996C11.6318 7.99996 11.3333 7.70148 11.3333 7.33329C11.3333 6.9651 11.6318 6.66663 12 6.66663C12.3682 6.66663 12.6667 6.9651 12.6667 7.33329C12.6667 7.70148 12.3682 7.99996 12 7.99996ZM12 12.6666C11.6318 12.6666 11.3333 12.3681 11.3333 12C11.3333 11.6318 11.6318 11.3333 12 11.3333C12.3682 11.3333 12.6667 11.6318 12.6667 12C12.6667 12.3681 12.3682 12.6666 12 12.6666ZM12 17.3333C11.6318 17.3333 11.3333 17.0348 11.3333 16.6666C11.3333 16.2984 11.6318 16 12 16C12.3682 16 12.6667 16.2984 12.6667 16.6666C12.6667 17.0348 12.3682 17.3333 12 17.3333Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default ThreeDotIconV2;
