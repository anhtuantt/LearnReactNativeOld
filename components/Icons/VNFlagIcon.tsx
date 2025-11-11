import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { IconProps } from '.';

const VNFlagIcon = (props: IconProps) => {
  const { width = 25, height = 24 } = props;
  return (
    <>
      <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
        <G clipPath="url(#clip0_5893_1331)">
          <Path
            d="M24.5 20C24.5 20.5525 24.0525 21 23.5 21H1.5C0.9475 21 0.5 20.5525 0.5 20V4C0.5 3.4475 0.9475 3 1.5 3H23.5C24.0525 3 24.5 3.4475 24.5 4V20Z"
            fill="#D82827"
          />
          <Path
            d="M16.6805 10.5205H13.735L12.5 7.842L11.2635 10.5205H8.319L10.4705 12.747L9.6755 15.9735L12.5 14.369L15.324 15.9735L14.529 12.747L16.6805 10.5205Z"
            fill="#FFFD38"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_5893_1331">
            <Rect width="24" height="24" fill="white" transform="translate(0.5)" />
          </ClipPath>
        </Defs>
      </Svg>
    </>
  );
};

export default VNFlagIcon;
