import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from '.';
const CloseIcon = (props: IconProps) => {
  const { width = 24, height = 24, color = '#292D32' } = props;
  return (
    <>
      <Svg
        width={width}
        height={height}
        viewBox='0 0 24 24'
        fill='none'
        //@ts-ignore
        xmlns='http://www.w3.org/2000/svg'
        {...props}>
        <G id='SVGRepo_bgCarrier' strokeWidth={0} />
        <G id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
        <G id='SVGRepo_iconCarrier'>
          <Path
            d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M9.16998 14.83L14.83 9.17004'
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M14.83 14.83L9.16998 9.17004'
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </G>
      </Svg>
    </>
  );
};
export default CloseIcon;
