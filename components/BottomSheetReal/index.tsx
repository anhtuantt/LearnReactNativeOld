import React, { useRef, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Typography from '../Typography';
import Box from '../Box';

interface IBottomSheetProps {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode | undefined;
}

const BottomSheetReal: React.FC<IBottomSheetProps> = ({ isOpen, title, children }) => {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['100%', '75%', '50%']; // Define valid snap points (no 0%)

  // Effect to handle opening and closing the BottomSheet
  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand(); // Expand to the first snap point when isOpen is true
    } else {
      sheetRef.current?.close(); // Close when isOpen is false
    }
  }, [isOpen]);

  return (
    <Box flex={1} justifyContent='center' alignItems='center'>
      <BottomSheet
        ref={sheetRef}
        index={isOpen ? 0 : -1} // Index -1 to close, 0 to open
        snapPoints={snapPoints} // Valid snap points
        enablePanDownToClose={true} // Allows users to swipe down to close
      >
        <Box padding={16}>
          <Typography>{title}</Typography>
          {children}
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default BottomSheetReal;
