import { typography } from '@/features/system/theme/configs/typography';
import { IFontInfo } from '@/features/system/type';
import { forwardRef, useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { ITypographyProps } from './types';
import { colors } from '@/features/system/theme/configs/colors';

const Typography = ({ children, ...props }: ITypographyProps, ref: any) => {
  const {
    variant,
    isTruncated,
    numberOfLine: noOfLines,
    numberOfLines,
    color = colors.text.main,
    textAlign = 'left',
    textTransform = 'none',
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    isUnderline,
    textDecorationLine = 'none',
    fontSize,
    fontWeight,
    style,
  } = props;
  const lines = numberOfLines || noOfLines ? numberOfLines || noOfLines : isTruncated ? 1 : undefined;

  const getFontFamily = (fontWeight: string | number | undefined) => {
    switch (fontWeight) {
      case 400:
      case '400':
        return 'PlusJakartaSans-Regular';
      case 500:
      case '500':
        return 'PlusJakartaSans-Medium';
      case 600:
      case '600':
        return 'PlusJakartaSans-Semibold';
      case 700:
      case '700':
      case 'bold':
        return 'PlusJakartaSans-Bold';
      case 800:
      case '800':
        return 'PlusJakartaSans-ExtraBold';
      default:
        return 'PlusJakartaSans-Regular';
    }
  };

  const fontStyles = useMemo(() => {
    const font = typography[variant || 'body1'] as IFontInfo;
    const styleObj: TextStyle = {
      color: color,
      fontSize: fontSize ?? font.fontSize,
      fontFamily:getFontFamily(fontWeight),
      // @ts-ignore
      fontWeight: fontWeight,
      lineHeight: font.lineHeight,
      textAlign: textAlign,
      textTransform: textTransform,
      marginTop: marginTop ?? 0,
      marginLeft: marginLeft ?? 0,
      marginRight: marginRight ?? 0,
      marginBottom: marginBottom ?? 0,
      textDecorationLine: isUnderline ? 'underline' : 'none',
    };

    if (textDecorationLine !== 'none') {
      styleObj.textDecorationLine = textDecorationLine;
    }
    return styleObj;
  }, [variant, marginLeft, color, fontWeight, fontSize]);
  
  return (
    <Text ref={ref} numberOfLines={lines}  style={[fontStyles, style]} allowFontScaling={false}>
      {children}
    </Text>
  );
};
export default forwardRef(Typography);
export type { ITypographyProps };

