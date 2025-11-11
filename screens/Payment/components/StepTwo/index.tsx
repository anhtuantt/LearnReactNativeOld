import { defiNotifyRequest } from '@/app/api';
import Box from '@/components/Box';
import Typography from '@/components/Typography';
import { maskAddressCoin } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { IPaymentData } from '../..';
import { usePaymentSelector } from '../../context';
import { ICoinPayment, messageStep2 } from '../../types';
import MessageInfo from '../MessageInfo';
import ButtonCopy from './ButtonCopy';

interface IStepTwo {
  order_no: string;
}
const StepTwo = (props: IStepTwo) => {
  const { order_no } = props;
  const [paymentInfo, setPaymentInfo] = useState<IPaymentData>();
  const walletAddress =
    paymentInfo?.chain == 'trx' ? 'TBXHxW81Tikgu3sZttKFkNxoHU1EVNsKff' : '0x89d108189d77e3AA5E21acc774B34758dFAA4bc2';
  const duration = usePaymentSelector('duration');

  useEffect(() => {
    const fetchData = async () => {
      const res = await defiNotifyRequest.getPaymentByOrder({ order_no });
      if (res) {
        setPaymentInfo(res?.data);
        const totalValue = Number((Math.round(Number(res?.data?.price) * Number(duration.get) * 100) / 100).toFixed(2));
        const periodValue = Number(duration.get) * 30;
        void defiNotifyRequest.updateLastAccessPayment({order_no:order_no,period: periodValue,total_value: totalValue});
      }
    };
    void fetchData();
  }, []);


  return (
    <Box flexDirection={'column'} gap={24} flex={1} paddingBottom={24}>
      <Box>
        <Typography fontSize={16} color='#070707' fontWeight={700}>
          Step 2: Complete Payment
        </Typography>
      </Box>
      <Box>
        <Typography fontSize={15} color='#07070'>
          Use another wallet to scan the QR code or send the payment to the address below:
        </Typography>
      </Box>
      <Box justifyContent='center' alignItems='center'>
        <QRCode size={153} value={walletAddress} />
      </Box>
      <PaymentAmount paymentInfo={paymentInfo} />
      <PaymentAddress paymentInfo={paymentInfo} />
      <MessageInfo message={messageStep2} />
    </Box>
  );
};

export default StepTwo;

const PaymentAmount = ({ paymentInfo }: { paymentInfo?: IPaymentData }) => {
  const duration = usePaymentSelector('duration');
  const coinType = usePaymentSelector('coinType');
  const coinTypeValue = (coinType.get as ICoinPayment)?.value;

  return (
    <Box borderRadius={16} padding={16} backgroundColor={'#EAEDF3'} flexDirection='row'>
      {/* left */}
      <Box flex={1} gap={8}>
        <Typography fontSize={14} color='#5A6689'>
          Amount to send
        </Typography>
        <Typography fontSize={16} fontWeight={700} color='#1562F8'>
          {(Number(paymentInfo?.price) * Number(duration.get))?.toFixed(2) ?? 0} {coinTypeValue}
        </Typography>
      </Box>
      {/* right */}
      <ButtonCopy data={45} />
    </Box>
  );
};

const PaymentAddress = ({ paymentInfo }: { paymentInfo?: IPaymentData }) => {
  const walletAddress =
    paymentInfo?.chain == 'trx' ? 'TBXHxW81Tikgu3sZttKFkNxoHU1EVNsKff' : '0x89d108189d77e3AA5E21acc774B34758dFAA4bc2';
  return (
    <Box borderRadius={16} padding={16} backgroundColor={'#EAEDF3'} flexDirection='row'>
      {/* left */}
      <Box flex={1} gap={8}>
        <Typography fontSize={14} color='#5A6689'>
          Payment address
        </Typography>
        <Typography fontSize={16} fontWeight={700}>
          {maskAddressCoin(walletAddress)}
        </Typography>
        <Typography fontSize={12} color={'#F07100'}>
          { paymentInfo?.chain == 'trx' ? 'On Tron chain' : 'On BNB or Ethereum chain'}
        </Typography>
      </Box>
      {/* right */}
      <ButtonCopy data={walletAddress} />
    </Box>
  );
};
