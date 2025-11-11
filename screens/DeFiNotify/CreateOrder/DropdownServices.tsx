import { defiNotifyRequest } from '@/app/api';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';

interface DropdownChainProps {
  onChange: (value: string) => void;
  value?: string;
}

const DropdownServices = (props: DropdownChainProps) => {
  const { onChange } = props;
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await defiNotifyRequest.getServices();
      if (res) {
        setData(res.data);
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
      label={'Choose a service'}
      placeholder={'Choose a service'}
      exactKey={'Service'}
      labelField={'description'}
      valueField={'name'}
      onSelectItem={handleChooseItem}
    />
  );
};
export default DropdownServices;
