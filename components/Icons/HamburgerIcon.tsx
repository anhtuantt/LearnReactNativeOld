import Svg, { Path, Rect } from 'react-native-svg';
const HamburgerIcon = () => {
  return (
    <>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        //@ts-ignore
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <Rect width={16} height={16} id="icon-bound" fill="none" />
        <Path d="M1,9h14V7H1V9z M1,14h14v-2H1V14z M1,2v2h14V2H1z" />
      </Svg>
    </>
  );
};
export default HamburgerIcon;
