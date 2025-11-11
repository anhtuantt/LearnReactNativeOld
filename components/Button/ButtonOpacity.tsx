import { TouchableOpacity, ViewStyle } from 'react-native';
import { IButtonProps } from './type';

interface IButtonOpacityProps extends IButtonProps{}
const ButtonOpacity = (props: IButtonOpacityProps) => {
  const { children, onPress } = props;
  const style = props as ViewStyle;

  return (
    <TouchableOpacity style={{...style}} onPress={onPress}>{children}</TouchableOpacity>
  );
};

export default ButtonOpacity;