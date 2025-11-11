import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';
const WebSiteIcon = (props: IconProps) => {
  const { color = '#1562F8', width = 32, height = 32 } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63619 23.3638 2.66666 16 2.66666C8.63616 2.66666 2.66663 8.63619 2.66663 16C2.66663 23.3638 8.63616 29.3333 16 29.3333Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.66663 16H29.3333"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2.66666C19.335 6.31779 21.2303 11.056 21.3333 16C21.2303 20.9439 19.335 25.6822 16 29.3333C12.6649 25.6822 10.7696 20.9439 10.6666 16C10.7696 11.056 12.6649 6.31779 16 2.66666V2.66666Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default WebSiteIcon;
