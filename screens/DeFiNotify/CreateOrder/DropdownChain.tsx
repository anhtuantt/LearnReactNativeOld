import { defiNotifyRequest } from '@/app/api';
import Dropdown from '@/components/Dropdown/Dropdown';
import { handleDeviceIdStorage } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface DropdownChainProps {
  onChange: (value: string) => void;
  value?: string;
}
interface IData {
  name: string;
  description: string;
  icon: JSX.Element;
}
const DropdownChain = (props: DropdownChainProps) => {
  const { onChange, value } = props;
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deviceId = await handleDeviceIdStorage();

        const settingsRes = await defiNotifyRequest.getSettingInfo({ device_id: deviceId });

        const chainsRes = await defiNotifyRequest.getChains();
        if (!chainsRes?.data) return;

        let chains: Array<IData & { icon: JSX.Element }> = chainsRes.data.map((item: IData) => ({
          ...item,
          icon: <IconChain name={item.name} />,
        }));

        if (settingsRes?.data?.is_testnet !== 1) {
          chains = chains.filter(chain => chain.name !== 'bsctestnet');
        }

        // 6. Update state
        setData(chains);
      } catch (error) {
        console.error('Error loading settings or chains:', error);
      }
    };

    void fetchData();
  }, []);

  const handleChooseItem = (item: any) => {
    onChange(item.name);
  };

  return (
    <Dropdown
      data={data ?? []}
      label={'Choose chain'}
      placeholder={'Choose a chain'}
      exactKey={'Chain'}
      labelField={'description'}
      valueField={'name'}
      onSelectItem={handleChooseItem}
      defaultValue={data.find(x => x.name === value)}
    />
  );
};
export default DropdownChain;

interface IIconChainProps {
  name: string;
}

const IconChain = ({ name }: IIconChainProps) => {
  const styles = StyleSheet.create({
    icon: {
      width: 20,
      height: 20,
      alignSelf: 'center',
    },
  });
  const logoPlatformData = {
    arbitrum: require('@/assets/chainIcons/arbitrum.png'),
    avax: require('@/assets/chainIcons/avax.png'),
    bsc: require('@/assets/chainIcons/bsc.png'),
    cronos: require('@/assets/chainIcons/cronos.png'),
    eth: require('@/assets/chainIcons/eth.png'),
    ftm: require('@/assets/chainIcons/ftm.png'),
    op: require('@/assets/chainIcons/op.png'),
    polygon: require('@/assets/chainIcons/polygon.png'),
    trx: require('@/assets/chainIcons/trx.webp'),
    ZKsync: require('@/assets/chainIcons/ZKsync.webp'),
    opBNB: require('@/assets/chainIcons/opBNB.webp'),
    base: require('@/assets/chainIcons/base.webp'),
    Unichain: require('@/assets/chainIcons/unichain.webp'),
    HyperEVM: require('@/assets/chainIcons/hyperevm.png'),
    Celo: require('@/assets/chainIcons/celo.png'),
	sonic: require('@/assets/chainIcons/sonic.webp'),
  };
  // @ts-ignore
  return <ImageBackground source={logoPlatformData[name]} style={styles.icon} />;
};
