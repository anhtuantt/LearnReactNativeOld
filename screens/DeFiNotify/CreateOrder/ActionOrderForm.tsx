import { defiNotifyRequest } from '@/app/api';
import Box from '@/components/Box';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import TextInput from '@/components/TextInput';
import { ToastShow } from '@/components/Toast';
import Typography from '@/components/Typography';
import { IChangeOrder } from '@/features/defiNotify/defiNotifyClient';
import { colors } from '@/features/system/theme/configs/colors';
import { Controller, useForm } from 'react-hook-form';
import DropdownFrequency from './DropdownFrequency';
import RegisterFromControl from './RegisterFromControl';
import { handleDeviceIdStorage } from '@/utils/helpers';

interface IActionOrderFormProps {
  onClose?: () => void;
  onRefresh?: () => void;
  orderItemInfo?: any;
}

const ActionOrderForm = (props: IActionOrderFormProps) => {
  const { onClose, orderItemInfo, onRefresh } = props;
  // Initialize useForm hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_alert: String(orderItemInfo?.alert_threshold || ''),
      frequency: '',
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    const id = await handleDeviceIdStorage();
    const req: IChangeOrder = {
      device_id: id,
      pool_name: orderItemInfo?.pool_name || '',
      order_no: orderItemInfo?.order_no || '',
      new_alert: data?.new_alert,
      frequency: data?.frequency,
    };
    defiNotifyRequest
      .changeOrder(req)
      .then(res => {
        ToastShow({ title: res?.error ? res?.error : res?.message, type: res?.error ? 'error' : 'success' });
        onClose && onClose();
        onRefresh && onRefresh();
      })
      .catch(x => {
        console.log(x);
        ToastShow({ title: 'error!', type: 'error' });
      });
  };

  const renderChangeOrder = () => {
    return (
      <Box paddingVertical={16}>
        <Typography  fontWeight='400'>Alert threshold:</Typography>
        <Box marginBottom={16}></Box>
        <Controller
          control={control}
          name='new_alert'
          rules={{ required: 'Alert number is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType='numeric'
              onBlur={onBlur}
              onChangeText={text => {
                const decimalPattern = /^\d*\.?\d{0,2}$/;
                if (decimalPattern.test(text)) {
                  onChange(text);
                }
              }}
              value={value}
              placeholder='Please specify your alert number (0-100)'
            />
          )}
        />
        {errors.new_alert && <Typography color={colors.error.main}>{String(errors.new_alert.message)}</Typography>}
        <Box marginBottom={16}></Box>
        
        <RegisterFromControl label={'Frequency:'}>
          <Controller
            control={control}
            render={({ field: { onChange } }) => <DropdownFrequency onChange={onChange} />}
            name='frequency'
          />
        </RegisterFromControl>
        <Box marginBottom={48}></Box>
      </Box>
    );
  };

  return (
    <Box padding={16}>
      <Typography variant='h3'>Change alert</Typography>
      {renderChangeOrder()}
      <Box flexDirection='row' gap={16}>
        <ButtonPrimary
          borderColor={'#DBDDE5'}
          backgroundColor='#fff'
          textColor={colors.text.main}
          borderRadius={6}
          flex={1}
          title='Cancel'
          onPressCustom={onClose}
          borderWidth={1}
        />
        <ButtonPrimary
          borderRadius={6}
          flex={1}
          title='Submit'
          isSubmit={true}
          onPressCustom={handleSubmit(onSubmit)}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Box>
    </Box>
  );
};

export default ActionOrderForm;
