import { defiNotifyRequest } from '@/app/api';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';

interface DropdownChainProps {
  onChange: (value: string) => void;
  value?: string;
}

const DropdownFrequency = (props: DropdownChainProps) => {
  const { onChange } = props;
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await defiNotifyRequest.getFrequencies();
      if (res) {
        const formattedData = res.data.map((item: { name: number }) => ({
          name: item.name.toString(),         
          description: item.name.toString()    
        }));
        setData(formattedData);
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
      label={'Choose a frequency'}
      placeholder={'Choose a frequency'}
      exactKey={'Frequency'}
      labelField={'description'}
      valueField={'name'}
      onSelectItem={handleChooseItem}
    />
  );
};
export default DropdownFrequency;
