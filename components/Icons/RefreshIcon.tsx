import Svg, { Path } from 'react-native-svg';
import { IconProps } from './';

const RefreshIcon = (props: IconProps) => {
  const { color = '#7B7B82', width = 20, height = 20 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 20 20' fill='none'>
      <Path
        d='M0.833313 3.33325V8.33325H5.83331'
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M19.1667 16.6667V11.6667H14.1667'
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M17.075 7.49998C16.6523 6.30564 15.934 5.23782 14.9871 4.39616C14.0401 3.55451 12.8954 2.96645 11.6597 2.68686C10.4241 2.40727 9.13768 2.44527 7.92065 2.79729C6.70362 3.14932 5.5956 3.80391 4.69998 4.69998L0.833313 8.33331M19.1666 11.6666L15.3 15.3C14.4044 16.1961 13.2963 16.8506 12.0793 17.2027C10.8623 17.5547 9.5759 17.5927 8.34022 17.3131C7.10453 17.0335 5.95981 16.4455 5.01287 15.6038C4.06592 14.7621 3.34762 13.6943 2.92498 12.5'
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default RefreshIcon;
