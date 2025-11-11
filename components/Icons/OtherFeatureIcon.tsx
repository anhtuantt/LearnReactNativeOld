import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
const OtherFeatureIcon = (props: IconProps) => {
  const { color = '#1562F8', width = 32, height = 32 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 33 32"
      fill="none"
    >
      <Path
        d="M16.5 29.3333C16.5 29.3333 27.1667 24 27.1667 16V6.66666L16.5 2.66666L5.83337 6.66666V16C5.83337 24 16.5 29.3333 16.5 29.3333Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default OtherFeatureIcon;
