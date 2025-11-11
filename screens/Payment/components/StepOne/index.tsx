import Box from '@/components/Box';
import Typography from '@/components/Typography';
import MessageInfo from '../MessageInfo';
import Duration from './Duration';
import SelectCoin from './SelectCoin';
import SubscriptionDetail from './SubscriptionDetail';
import { EPaymentMethod, messageStep1 } from '../../types';
import { IPaymentData } from '../..';
import { useEffect, useState } from 'react';
import { defiNotifyRequest } from '@/app/api';
import { usePaymentSelector } from '../../context';
interface IStepOne {
  order_no: string
}
const StepOne = (props: IStepOne) => {
  const { order_no} = props;
  const [paymentInfo, setPaymentInfo] = useState<IPaymentData>();
  const paymentMethod = usePaymentSelector('paymentMethod');

  useEffect(() => {
    const fetchData = async () => {
      const res = await defiNotifyRequest.getPaymentByOrder({ order_no });
      if (res) {
        setPaymentInfo(res?.data);
      }
    };
    void fetchData();
  }, []);

  return (
    <Box flexDirection={'column'} gap={24} flex={1}>
      <Box>
        <Typography fontSize={16} color='#070707' fontWeight={700}>Step 1: Choose Payment Options</Typography>
      </Box>
      {paymentMethod.get == EPaymentMethod.CRYPTO && <SelectCoin platform={paymentInfo?.platform} chain={paymentInfo?.chain}/>}
      <Duration />
      <SubscriptionDetail paymentInfo={paymentInfo}/>
      <MessageInfo message={messageStep1} />
    </Box>
  );
};

export default StepOne;