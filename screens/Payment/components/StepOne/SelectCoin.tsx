import Box from '@/components/Box';
import Dropdown from '@/components/Dropdown/Dropdown';
import Typography from '@/components/Typography';
import { usePaymentSelector } from '../../context';
import { coinInfos, EPaymentCoin } from '../../types';

// USDT, USDC, VAI (VAI available for Venus)
interface ISelectCoin {
  platform?: string;
  chain?: string;
}

const SelectCoin = (props: ISelectCoin) => {
  const { platform, chain } = props;
  const coinType = usePaymentSelector('coinType');

  const filteredCoinInfos =
    platform && platform !== 'venus'
      ? coinInfos.filter(coin => (chain === 'trx' ? coin.value === EPaymentCoin.USDT : coin.value !== EPaymentCoin.VAI))
      : coinInfos;

  return (
    <Box gap={8}>
      <Typography>Select coin to pay*</Typography>
      <Dropdown
        data={filteredCoinInfos ?? []}
        defaultValue={coinType.get}
        label={'Select coin to pay*'}
        placeholder={'Select coin to pay*'}
        exactKey={'value'}
        onSelectItem={(item: any) => coinType.set(item)}
      />
    </Box>
  );
};

export default SelectCoin;
