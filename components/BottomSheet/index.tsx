import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface IBottomSheetProps extends PropsWithChildren {
  isOpen: boolean;
  toggleSheet: (isOpen: boolean) => void;
  duration?: number;
}

export default function BottomSheet({ isOpen, toggleSheet, duration = 500, children }: IBottomSheetProps) {
  const height = useSharedValue(0);
  const progress = useDerivedValue(() => withTiming(isOpen ? 0 : 1, { duration }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backgroundColorSheetStyle = {
    backgroundColor: 'white',
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={sheetStyles.flex} onPress={() => toggleSheet(!isOpen)} />
      </Animated.View>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle, backgroundColorSheetStyle]}>
        {children}
      </Animated.View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;

const sheetStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    paddingRight: 2,
    paddingLeft: 2,
    width: screenWidth, // Ensure it takes up the full width of the screen
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
