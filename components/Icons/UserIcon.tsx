import Svg, { Path } from 'react-native-svg';
import { IconProps } from './';

const UserIcon = (props: IconProps) => {
  const { color = '#7B7B82', width = 20, height = 20 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 20 20' fill='none'>
      <Path
        d='M16.6666 17.5V15.8333C16.6666 14.9493 16.3155 14.1014 15.6903 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.6845 14.1014 3.33331 14.9493 3.33331 15.8333V17.5'
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M10 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10 2.5C8.15907 2.5 6.66669 3.99238 6.66669 5.83333C6.66669 7.67428 8.15907 9.16667 10 9.16667Z'
        stroke={color}
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default UserIcon;
