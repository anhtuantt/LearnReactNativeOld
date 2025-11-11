import Box from '@/components/Box';
import Typography from '@/components/Typography';
import { colors } from '@/features/system/theme/configs/colors';
import {PropsWithChildren, } from 'react';


interface PrinterSettingFromControlProps extends PropsWithChildren {
  label: string;
  error?: string;
  required?: boolean;
}

const RegisterFromControl = (props: PrinterSettingFromControlProps) => {
  const {label = '', error = '', children, required = false} = props;
  return (
    <>
      <Box paddingBottom={8} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box flexDirection={'row'}>
          <Typography fontWeight='400'>
            {label}
          </Typography>
          {required && (
            <Box marginLeft={4}>
              <Typography fontSize={20}>
                *
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {children}
      {error !== '' && (
        <Box>
          <Typography fontSize={12} color={colors.error.main}>{error}</Typography>
        </Box>
      )}
    </>
  );
};
export default RegisterFromControl;
