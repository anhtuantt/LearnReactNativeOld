import Svg, { Path } from 'react-native-svg';
import { IconProps } from './';
const AlertSuccessIcon = (props: IconProps) => {
  const { color = '#419E6A', width = 20, height = 20 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 20 20' fill='none'>
      <Path
        d='M7.5 10L9.16667 11.6667L12.5 8.33334M17.1816 4.98695C17.011 4.9956 16.8394 4.99998 16.6667 4.99998C14.1055 4.99998 11.7691 4.03711 9.99994 2.45361C8.23076 4.03705 5.89449 4.99987 3.33333 4.99987C3.16065 4.99987 2.98898 4.9955 2.81844 4.98685C2.61059 5.78986 2.5 6.63202 2.5 7.50001C2.5 12.1596 5.68693 16.0749 10 17.185C14.3131 16.0749 17.5 12.1596 17.5 7.50001C17.5 6.63206 17.3894 5.78993 17.1816 4.98695Z'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default AlertSuccessIcon;
