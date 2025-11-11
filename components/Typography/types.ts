import { ITypography } from '@/features/system/type'; 
import type { TextProps, TextStyle } from 'react-native';

export interface InterfaceTextProps extends TextProps {
  children?: React.ReactNode | string;
  variant?: keyof ITypography;
  isItalic?: boolean;
  color?: string;
  numberOfLine?: number;
  isTruncated?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  fontSize?: number;
  fontWeight?: number | string;
  isUnderline?: boolean;
  textDecorationLine?: 'none' | 'line-through' | 'underline' | 'underline line-through' | undefined;
  style?: TextStyle;
}

export type ITypographyProps = InterfaceTextProps;
