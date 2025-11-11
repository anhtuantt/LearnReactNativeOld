import Box from '@/components/Box';
import ButtonSync from '@/components/Button/ButtonSync';
import Icons from '@/components/Icons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

interface IButtonCopyProps{
    data: string| number
}
const ButtonCopy = ({data}: IButtonCopyProps) => {
  const { CopyIcon } = Icons;
  const handleCopy = () => {
    Clipboard.setString(data.toString());
    Toast.show({text1: 'Copied', type: 'copied', position:'bottom', visibilityTime: 800});
  };
  return (
    <Box justifyContent='center' alignItems={'center'}>
      <ButtonSync onPress={handleCopy}>
        <CopyIcon/>  
      </ButtonSync>
    </Box>
  );
};

export default ButtonCopy;