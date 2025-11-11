import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

interface IBoxProps extends ViewStyle, PropsWithChildren {
  style?: ViewStyle;
  minH?: ViewStyle['minHeight'];
  maxH?: ViewStyle['maxHeight'];
  minW?: ViewStyle['maxWidth'];
  maxW?: ViewStyle['maxWidth'];
}
const Box = (props: IBoxProps) => {
  const { children, style, maxH, minH, minW, maxW } = props;
  return (
    <View style={{ ...props, ...style, minHeight: minH, maxHeight: maxH, minWidth: minW, maxWidth: maxW }}>
      {children}
    </View>
  );
};

export default Box;
