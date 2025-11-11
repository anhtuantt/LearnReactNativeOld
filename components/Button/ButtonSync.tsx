import { useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { IButtonProps } from './type';
import {debounce} from 'lodash';

interface IButtonSyncProps extends IButtonProps{
  onPress: () => void;
}
const ButtonSync = (props: IButtonSyncProps) => {
  const { children } = props;
  const style = props as ViewStyle;
  const [isLoading, setIsLoading] = useState(false);
  const handleOnPress = () => {
    setIsLoading(true);
    props.onPress();
    setIsLoading(false);
  };
  return (
    <TouchableOpacity disabled={isLoading} style={{...style}} onPress={debounce(handleOnPress, 200)}>{children}</TouchableOpacity>
  );
};

export default ButtonSync;