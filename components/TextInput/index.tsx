import { forwardRef, useState } from 'react';
import {
  KeyboardType,
  TextInput as RNTextInput,
  TextInputProps,
  Platform,
} from 'react-native';
import Typography from '../Typography';
import Box from '../Box';

interface ITextInputProps extends TextInputProps {
  label?: string | undefined;
  defaultValue?: string;
  value?: string | undefined;

  maxLength?: number | undefined;
  isPassword?: boolean;
  onChangeText: (text: string) => void;

  // styleCSS & Icons
  height?: number;
  width?: number | `${number}%`;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  endIcon?: JSX.Element | Array<JSX.Element> | undefined;
  startIcon?: JSX.Element | Array<JSX.Element> | undefined;
  editable?: boolean;
  keyboardType?: KeyboardType;
  placeholder?: string;
  placeholderTextColor?: string;
  isShowCloseIcon?: boolean;
  borderWidth?: number;
}

const TextInput = ({ ...props }: ITextInputProps, ref: any) => {
  const {
    defaultValue,
    startIcon,
    endIcon,
    height = 40,
    width,
    borderRadius = 4,
    bgColor,
    borderColor = 'lightgray',
    textColor = '#000',
    placeholderTextColor = 'gray',
    onChangeText,
    label = undefined,
    placeholder = '',
    maxLength = undefined,
    editable = true,
    keyboardType = 'default',
    value = undefined,
    borderWidth = 1,
  } = props;

  const [isFocus, setIsFocus] = useState(false);

  // 👇 very important: prefer `value` even if it is ''
  const resolvedValue =
    value !== undefined
      ? value
      : defaultValue !== undefined
      ? defaultValue
      : '';

  const handleBlur = () => {
    setIsFocus(false);
    //console.log('[CustomTextInput] onBlur: value=', resolvedValue);
    // call user onBlur if provided
    props.onBlur?.({} as any);
  };

  const handleFocus = () => {
    setIsFocus(true);
    //console.log('[CustomTextInput] onFocus: current value=', resolvedValue);
    props.onFocus?.({} as any);
  };

  const handleOnChangeValue = (text: string) => {
    // debug every keystroke
    /* ... 
    console.log(
      '[CustomTextInput] onChangeText:',
      JSON.stringify(text),
      'prev=',
      JSON.stringify(resolvedValue)
    );
    */

    // just forward, let parent (RHF) decide validation
    onChangeText(text);
  };

  return (
    <Box>
      {label && <Typography marginBottom={8}>{label}</Typography>}
      <Box
        height={height}
        width={width}
        borderRadius={borderRadius}
        backgroundColor={isFocus ? '#FFFFFF' : bgColor}
        borderColor={isFocus ? '#1E3D61' : borderColor}
        borderWidth={borderWidth}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {startIcon && <Box marginLeft={8}>{startIcon}</Box>}
        <Box flex={1}>
          <RNTextInput
            style={{ color: textColor }}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={resolvedValue}
            onBlur={handleBlur}
            onChangeText={handleOnChangeValue}
            onFocus={handleFocus}
            maxLength={maxLength}
            editable={editable}
            keyboardType={keyboardType}
            ref={ref}
          />
        </Box>
        {endIcon && <Box marginRight={8}>{endIcon}</Box>}
      </Box>
    </Box>
  );
};

export default forwardRef(TextInput);
