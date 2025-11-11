import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';
import { IconProps } from './';

const CexNotifyIcon = (props: IconProps) => {
  const { width = 50, height = 50 } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      {...props}
    >
      <Path
        d="M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25z"
        fill="url(#paint0_linear_4502_1170)"
      />
      <Path
        opacity={0.3}
        d="M36.477 34.076L21.63 49.19l-11.213-4.746L1.39 31.25l15.684-17.232 12.382.854L33.68 30.15l2.797 3.926z"
        fill="url(#paint1_linear_4502_1170)"
      />
      <Path
        opacity={0.3}
        d="M25 45.544c11.346 0 20.544-9.198 20.544-20.544S36.346 4.456 25 4.456C13.653 4.456 4.454 13.654 4.454 25S13.653 45.544 25 45.544z"
        fill="url(#paint2_radial_4502_1170)"
      />
      <Path
        opacity={0.24}
        d="M35.974 15.822l-6.545 6.546 4.425 4.425 4.455-.665.261.868 5.195-5.195.39-3.805s-1.562-2.865-1.736-2.922c-.174-.059-2.72-.492-2.72-.492l-2.517.636-1.208.604z"
        fill="url(#paint3_linear_4502_1170)"
      />
      <Path
        d="M44.79 17.925a4.79 4.79 0 00-.666-1.82 4.812 4.812 0 00-1.324-1.418 4.878 4.878 0 00-1.706-.786 4.91 4.91 0 00-1.878-.069 4.79 4.79 0 00-1.821.667 4.813 4.813 0 00-1.417 1.323 4.89 4.89 0 00-.786 1.707 4.91 4.91 0 00-.07 1.878c.098.65.32 1.257.667 1.82a4.755 4.755 0 002.188 1.912l-.414 1.43-3.995.377v-4.182c0-2.53-.944-4.957-2.752-6.746a9.622 9.622 0 00-6.786-2.794c-2.56 0-5.142 1.005-6.952 2.794-1.81 1.789-2.954 4.215-2.954 6.746v5.424l-3.042.3c-.765.073-1.254.752-1.18 1.516.068.72.71 1.26 1.42 1.26.044 0 .105-.002.15-.006l2.415-.227-2.255 4.306c-.239.437.08 1.155.578 1.155h23.706c.497 0 .812-.718.573-1.153l-2.77-5.015c-.052-.096-.152-.298-.152-.407v-.323l3.45-.741-.243 1.168c-.057.236-.001.458.127.668a.87.87 0 00.56.394c.242.059.471.024.677-.102a.827.827 0 00.397-.553l1.17-4.874a4.76 4.76 0 002.814-.718 4.834 4.834 0 001.418-1.323 4.89 4.89 0 00.786-1.707 4.9 4.9 0 00.068-1.881zm-21.688 2.111a1.052 1.052 0 01-1.067 1.039c-.575-.007-1.028-.462-1.044-1.064-.01-.351-.002-.703-.002-1.055s-.008-.705.002-1.056c.016-.599.475-1.054 1.05-1.057a1.053 1.053 0 011.06 1.046c.015.717.016 1.432 0 2.147zm6.301-.004a1.054 1.054 0 01-1.062 1.043c-.575-.005-1.03-.461-1.047-1.061-.01-.351-.002-.703-.002-1.056 0-.351-.008-.704.002-1.055.016-.6.472-1.056 1.047-1.06a1.053 1.053 0 011.062 1.043c.016.715.016 1.432 0 2.146zm13.58-.645a2.996 2.996 0 01-1.396 1.931 3 3 0 01-2.353.374 2.996 2.996 0 01-1.93-1.396 3 3 0 01-.374-2.353c.2-.839.665-1.482 1.395-1.93a3 3 0 012.353-.374c.84.2 1.482.665 1.93 1.396.45.73.574 1.515.374 2.352zM19.297 35.88h9.768c0 2.778-2.186 4.884-4.884 4.884-2.697 0-4.884-2.106-4.884-4.884z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4502_1170"
          x1={11.8082}
          y1={3.66861}
          x2={39.5}
          y2={48}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.344639} stopColor="#F0B90B" />
          <Stop offset={1} stopColor="#008F6D" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_4502_1170"
          x1={22.5628}
          y1={28.2922}
          x2={9.30419}
          y2={41.5507}
          gradientUnits="userSpaceOnUse"
        >
          <Stop />
          <Stop offset={0.1139} stopColor="#0A0310" stopOpacity={0.8861} />
          <Stop offset={0.3364} stopColor="#24093A" stopOpacity={0.6636} />
          <Stop offset={0.6457} stopColor="#4E147D" stopOpacity={0.3543} />
          <Stop offset={1} stopColor="#8321D2" stopOpacity={0} />
        </LinearGradient>
        <RadialGradient
          id="paint2_radial_4502_1170"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(25 25) scale(20.544)"
        >
          <Stop stopColor="#1B57F2" />
          <Stop offset={0.1167} stopColor="#1B55EE" />
          <Stop offset={0.2444} stopColor="#1951E0" />
          <Stop offset={0.3774} stopColor="#1749CA" />
          <Stop offset={0.5139} stopColor="#133EAC" />
          <Stop offset={0.6533} stopColor="#0F3084" />
          <Stop offset={0.7951} stopColor="#091E54" />
          <Stop offset={0.9361} stopColor="#030A1C" />
          <Stop offset={1} />
        </RadialGradient>
        <LinearGradient
          id="paint3_linear_4502_1170"
          x1={39.5889}
          y1={19.0931}
          x2={31.9718}
          y2={26.71}
          gradientUnits="userSpaceOnUse"
        >
          <Stop />
          <Stop offset={0.1139} stopColor="#0A0310" stopOpacity={0.8861} />
          <Stop offset={0.3364} stopColor="#24093A" stopOpacity={0.6636} />
          <Stop offset={0.6457} stopColor="#4E147D" stopOpacity={0.3543} />
          <Stop offset={1} stopColor="#8321D2" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
export default CexNotifyIcon;
