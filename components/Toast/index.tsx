import Icons from '@/components/Icons';
import { colors } from '@/features/system/theme/configs/colors';
import Toast from 'react-native-toast-message';
import Box from '../Box';
import Typography from '../Typography';
import { TouchableOpacity } from 'react-native';

const { InfoIcon, CheckIcon, CloseIcon } = Icons;

// Reusable box style with 'as const' for literal values
const baseBoxStyle = {
  flex: 1,
  borderWidth: 2,
  marginLeft: 20,
  marginRight: 20,
  borderRadius: 12,
  paddingTop: 10,
  paddingLeft: 15,
  paddingRight: 25,
  paddingBottom: 10,
  flexDirection: 'row' as const,  // Use 'as const' to infer 'row' as a literal type
  alignItems: 'center' as const,  // Use 'as const' to infer 'center' as a literal type
};

const renderToastContent = (IconComponent: any, text1: string, borderTextColor: string) => (
  <Box style={{ ...baseBoxStyle, borderColor: borderTextColor, backgroundColor: '#fff' }}>
    <IconComponent color={borderTextColor} width={19} height={13} />
    <Typography marginLeft={12} variant='body2' color={borderTextColor} numberOfLines={3}>
      {text1}
    </Typography>
    <TouchableOpacity onPress={() => Toast.hide()} style={{ position: 'absolute', right: 5, top: 5 }}>
      <CloseIcon color={borderTextColor} width={16} height={16} />
    </TouchableOpacity>
  </Box>
);

const renderToastCopied = (text1: string) => (
  <Box backgroundColor={'#5D5D5D'} paddingHorizontal={8} paddingVertical={2} borderRadius={12}>
    <Typography fontSize={12} color={'white'} numberOfLines={1}>
      {text1}
    </Typography>
  </Box>
);

export const toastConfig = {
  success: ({ text1 }: any) => renderToastContent(CheckIcon, text1, colors.success.main),
  error: ({ text1 }: any) => renderToastContent(InfoIcon, text1, colors.error.main),
  info: ({ text1 }: any) => renderToastContent(InfoIcon, text1, colors.info.main),
  copied: ({ text1 }: any) => renderToastCopied(text1),
};

interface IToastShowProps {
  title: string;
  type?: 'success' | 'error' | 'info';
  position?: 'top' | 'bottom';
  bottomOffset?: number;
  topOffset?: number;
  autoHide?: boolean;
}

export const ToastShow = ({
  title,
  type = 'success',
  position = 'top',
  bottomOffset = 60,
  topOffset = 60,
  autoHide = true,
}: IToastShowProps) => {
  Toast.show({
    type,
    text1: title,
    position,
    bottomOffset,
    topOffset,
    visibilityTime: 5000,
    autoHide,
  });
};
