import Svg, { G, Path, Defs, LinearGradient, Stop, RadialGradient, ClipPath } from 'react-native-svg';
import { IconProps } from './';
const TelegramIconV2 = (props: IconProps) => {
  const { width = 50, height = 50 } = props;
  return (
    <Svg width={width} height={height} viewBox='0 0 50 50' fill='none' {...props}>
      <G clipPath='url(#clip0_4502_1181)'>
        <Path
          d='M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25z'
          fill='url(#paint0_linear_4502_1181)'
        />
        <Path
          opacity={0.2}
          d='M25 45.544c11.346 0 20.544-9.198 20.544-20.544S36.346 4.456 25 4.456C13.653 4.456 4.454 13.654 4.454 25S13.653 45.544 25 45.544z'
          fill='url(#paint1_radial_4502_1181)'
          fillOpacity={0.6}
        />
        <Path
          d='M34.926 16.002l-3.924 18.67c-.296 1.317-1.068 1.645-2.165 1.025l-5.978-4.445-2.885 2.8c-.32.322-.586.591-1.201.591l.43-6.143 11.08-10.102c.482-.433-.105-.674-.749-.24l-13.698 8.703-5.897-1.863c-1.282-.403-1.306-1.294.268-1.915l23.065-8.966c1.068-.404 2.002.24 1.654 1.886z'
          fill='#F7F7F7'
        />
      </G>
      <Defs>
        <LinearGradient
          id='paint0_linear_4502_1181'
          x1={11.8082}
          y1={3.66861}
          x2={39.5}
          y2={48}
          gradientUnits='userSpaceOnUse'>
          <Stop offset={0.344639} stopColor='#16D0F9' />
          <Stop offset={1} stopColor='#002BC2' />
        </LinearGradient>
        <RadialGradient
          id='paint1_radial_4502_1181'
          cx={0}
          cy={0}
          r={1}
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(25 25) scale(20.544)'>
          <Stop stopColor='#1B57F2' />
          <Stop offset={0.1167} stopColor='#1B55EE' />
          <Stop offset={0.2444} stopColor='#1951E0' />
          <Stop offset={0.3774} stopColor='#1749CA' />
          <Stop offset={0.5139} stopColor='#133EAC' />
          <Stop offset={0.6533} stopColor='#0F3084' />
          <Stop offset={0.7951} stopColor='#091E54' />
          <Stop offset={0.9361} stopColor='#030A1C' />
          <Stop offset={1} />
        </RadialGradient>
        <ClipPath id='clip0_4502_1181'>
          <Path fill='#fff' d='M0 0H50V50H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default TelegramIconV2;
