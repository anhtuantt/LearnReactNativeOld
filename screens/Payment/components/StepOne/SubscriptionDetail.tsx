import Box from '@/components/Box';
import Typography from '@/components/Typography';
import { IPaymentData } from '../..';
import { usePaymentSelector } from '../../context';
import { EPaymentMethod, ICoinPayment } from '../../types';
import { maskAddressCoin } from '@/utils/helpers';
interface ISubscriptionDetail {
  paymentInfo?: IPaymentData
}

const SubscriptionDetail = (props: ISubscriptionDetail) => {
  const { paymentInfo } = props;
  const duration = usePaymentSelector('duration');
  const coinType = usePaymentSelector('coinType');
  const paymentMethod = usePaymentSelector('paymentMethod');
  const coinTypeValue = paymentMethod.get == EPaymentMethod.CRYPTO ? (coinType.get as ICoinPayment)?.value : '$';
  return (
    <Box gap={8}>
      <Typography fontSize={15}>SUBSCRIPTION DETAIL</Typography>
      <Box padding={16} borderRadius={16} backgroundColor={'#E3E5EB'} gap={16}>
        <Row textLeft={'No'} textRight={paymentInfo?.order_no || ''} />
        <Row textLeft={'Wallet'} textRight={maskAddressCoin(paymentInfo?.wallet || '')} />
        <Row textLeft={'Service'} textRight={'Position Health'} />
        <Row textLeft={'Duration'} textRight={`${duration.get} ${duration.get == 1 ? 'month' : 'months'}`} />
        <Row textLeft={'Total amount'} textRight={`${(Number(paymentInfo?.price) * Number(duration.get))?.toFixed(2) ?? 0} ${coinTypeValue}`} colorRight='#1562F8' />
      </Box>
    </Box>
  );
};

export default SubscriptionDetail;

interface IRowProps {
    textLeft: string,
    textRight: string,
    colorRight?: string,
}
const Row = ({textLeft, textRight, colorRight = '#070707'}: IRowProps) => {
  return (
    <Box flexDirection='row' justifyContent={'space-between'} >
      <Typography fontSize={14} color='#5A6689'>{ textLeft}</Typography>
      <Typography color={colorRight} fontWeight={'700'}>{ textRight}</Typography>
    </Box>
  );
};