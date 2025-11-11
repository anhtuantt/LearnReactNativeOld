import Svg, { Path } from 'react-native-svg';
import { IconProps } from './';
const SettingIcon = (props: IconProps) => {
  const { color = 'white', width = 24, height = 24 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M16.125 7C16.125 9.20914 14.3341 11 12.125 11C9.91586 11 8.125 9.20914 8.125 7C8.125 4.79086 9.91586 3 12.125 3C14.3341 3 16.125 4.79086 16.125 7Z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M12.125 14C8.25901 14 5.125 17.134 5.125 21H19.125C19.125 17.134 15.991 14 12.125 14Z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
};

export default SettingIcon;
