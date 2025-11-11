import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
const HowToUseIcon = (props: IconProps) => {
  const { color = '#1562F8', width = 32, height = 32 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M10.9702 12C11.7024 10.4464 13.6779 9.33333 16.0001 9.33333C18.9456 9.33333 21.3334 11.1242 21.3334 13.3333C21.3334 15.1993 19.6299 16.7668 17.3257 17.2088C16.6025 17.3475 16.0001 17.9303 16.0001 18.6667M16 22.6667H16.0133M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HowToUseIcon;
