import { useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { IButtonProps } from './type';

interface IButtonAsyncProps extends IButtonProps{
  onPress: () => Promise<void>;
}
const ButtonAsync = (props: IButtonAsyncProps) => {
  const { children } = props;
  const style = props as ViewStyle;
  const [isLoading, setIsLoading] = useState(false);
  const handleOnPress = async () => {
    setIsLoading(true);
    await props.onPress().finally(() => {setIsLoading(false);});
  };
  return (
    <TouchableOpacity disabled={isLoading} style={{...style}} onPress={handleOnPress}>{children}</TouchableOpacity>
  );
};

export default ButtonAsync;