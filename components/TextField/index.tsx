import React from 'react';
import Box from '../Box';
import {TextInput, TextInputProps, TouchableOpacity, ViewStyle} from 'react-native';
import Icons from '../Icons';

interface ITextFieldProps extends TextInputProps {
    containerStyle?: ViewStyle;
    isClearSearch?: boolean;
    onClearSearch?: () => void;
}
const TextField = (props: ITextFieldProps) => {
  const {containerStyle, isClearSearch = false, onClearSearch = () => 1} = props;
  const { SearchIcon, CloseIcon } = Icons;
  const inputProps:TextInputProps = props;
  return (
    <Box
      flexDirection={'row'}
      alignItems={'center'}
      backgroundColor={'lightgray'}
      borderRadius={12}
      gap={4}
      style={containerStyle}>
      <SearchIcon width={45} height={45} />
      <Box flex={1}>
        <TextInput placeholder='Tìm kiếm' {...inputProps} />
      </Box>
      {isClearSearch && (
        <TouchableOpacity style={{padding: 4, paddingHorizontal: 12}} onPress={onClearSearch}>
          <CloseIcon width={30} height={30} />
        </TouchableOpacity>
      )}
      
    </Box>
  );
};

export default TextField;
