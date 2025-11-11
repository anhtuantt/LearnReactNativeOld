import React, { PropsWithChildren, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import CheckIcon from '../Icons/CheckIcon';
import { colors } from '@/features/system/theme/configs/colors';
import Box from '../Box';

export interface CheckboxProps extends PropsWithChildren {
  label?: any;
  style?: ViewStyle;
  checked?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  styleLabel?: StyleProp<TextStyle>;
  styleBoxLabel?: StyleProp<TextStyle>;
  onChange: (check: boolean) => void;
  color?: string;
  multiple?: boolean;
  disabled?: boolean;
  borderColorUncheck?: string;
  checkboxColor?: string;
  styleLabelContain?: ViewStyle;
  sizeIcon?: number;
}
const CheckBox = (props: CheckboxProps) => {
  const {
    label,
    style,
    onChange,
    styleLabel,
    checked = false,
    borderRadius = 0,
    borderWidth = 2,
    multiple = true,
    disabled = false,
    checkboxColor,
    styleLabelContain,
    children = undefined,
    sizeIcon = 24,
    borderColorUncheck = undefined,
  } = props;
  const [isCheck, setIsCheck] = useState(checked);

  useEffect(() => {
    if (checked !== isCheck) {
      setIsCheck(checked);
    }
  }, [checked]);

  function handleCheck() {
    if (multiple)
      setIsCheck(pre => {
        onChange(!pre);
        return !pre;
      });
    else {
      onChange(!checked);
    }
  }

  const unCheckBorderColor = React.useMemo(() => {
    return borderColorUncheck ? borderColorUncheck : colors.secondary.main;
  }, [borderColorUncheck]);

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
      }}
      onPress={handleCheck}
      disabled={disabled}>
      <Box 
        height={sizeIcon}
        width={sizeIcon}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        backgroundColor={(multiple ? isCheck : checked) ? checkboxColor : '#fff'}
        borderColor={(multiple ? isCheck : checked) ? checkboxColor || colors.text.spunPearl : unCheckBorderColor}
        style={style}>
        {(multiple ? isCheck : checked) && <CheckIcon width={sizeIcon} height={sizeIcon} />}
      </Box>
      {children ? (
        children
      ) : label ? (
        <View style={[{ padding: 20 }, styleLabelContain]}>
          <Text style={[{ fontSize: sizeIcon }, styleLabel]}>{label}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CheckBox;
