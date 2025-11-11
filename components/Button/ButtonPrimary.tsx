import { useState } from 'react';
import { ActivityIndicator, DimensionValue, TouchableOpacity, ViewStyle } from 'react-native';
import { IButtonProps } from './type';
import Box from '../Box';
import Typography from '../Typography';
import { colors } from '@/features/system/theme/configs/colors';

interface IButtonPrimaryProps extends IButtonProps {
  onPressCustom?: () => void;
  onSubmit?: () => Promise<void>;
  title: string; // Add title prop for Typography
  flexDirection?: 'row' | 'column'; // Add Box props as optional
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  gap?: number;
  backgroundColor?: string;
  borderRadius?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  isSubmit?: boolean;
  endAdornment?: React.ReactNode;
  textColor?: string;
  fontSize?: number;
  numberOfLines?: number;
  fontWeight?: number | string;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  borderWidth?: number;
  borderColor?: string;
}

const ButtonPrimary = (props: IButtonPrimaryProps) => {
  const {
    title,
    flexDirection = 'row',
    justifyContent = 'center',
    alignItems = 'center',
    gap = 8,
    backgroundColor = colors.primary.main,
    textColor = colors.primary.light,
    borderRadius = 24,
    paddingHorizontal = 8,
    paddingVertical = 4,
    onPressCustom,
    onSubmit,
    isSubmit = false,
    children,
    endAdornment,
    fontSize,
    numberOfLines,
    fontWeight,
    height = 48,
    width,
    borderWidth,
    borderColor,
  } = props;

  const style = props as ViewStyle;
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    onSubmit &&
      (await onSubmit().finally(() => {
        setIsLoading(false);
      }));
  };

  return (
    <TouchableOpacity disabled={isLoading} style={{ ...style }} onPress={isSubmit ? handleOnSubmit : onPressCustom}>
      <Box
        width={width}
        height={height}
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
        gap={gap}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        borderWidth={borderWidth}
        borderColor={borderColor}>
        {isSubmit && <Box>{isLoading && <ActivityIndicator color={textColor} />}</Box>}
        <Box>
          <Typography color={textColor} fontSize={fontSize} fontWeight={fontWeight} numberOfLines={numberOfLines}>
            {title}
          </Typography>
        </Box>
        {children}
        {endAdornment && <Box paddingLeft={12}>{endAdornment}</Box>}
      </Box>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
