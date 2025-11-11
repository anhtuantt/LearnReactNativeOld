import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';

interface IRadioIcon extends IconProps{
  isActive? : boolean
}

const RadioIcon = (props: IRadioIcon) => {
  const { color = '#1E3D61', isActive } = props;
  const color2 = isActive ? color : 'none';

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.5 1C6.152 1 1 6.152 1 12.5S6.152 24 12.5 24 24 18.848 24 12.5 18.848 1 12.5 1zm0 20.7a9.197 9.197 0 01-9.2-9.2c0-5.083 4.117-9.2 9.2-9.2 5.083 0 9.2 4.117 9.2 9.2 0 5.083-4.117 9.2-9.2 9.2z"
        fill={color}
      />
      <Path d="M12.5 18.25a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z" fill={color2} />
    </Svg>
  );
};
export default RadioIcon;
