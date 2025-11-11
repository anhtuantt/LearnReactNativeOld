import { defiNotifyRequest } from '@/app/api';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useEffect } from 'react';
import IconPlatForm from './IconPlatForm';

export interface IPlatformData {
  name: string, 
  description: string,
  icon: JSX.Element,
} 

interface DropdownChainProps {
  onChange: (value: string) => void;
  setAlertThreshold: (value: string) => void;
  platform: string;
  platformData : IPlatformData[]
}

const DropdownPlatform = (props: DropdownChainProps) => {
  const { onChange, platformData, platform, setAlertThreshold } = props;

  const handleMapIconPlatformData = (platformData:IPlatformData[]) => {
    return platformData.map((item: IPlatformData) => {
      //@ts-ignore
      item.icon = <IconPlatForm name={item.name} />;
      return item;
    });
  };
 
  useEffect(() => {
    const handleSetAlertThreshold = async (platform : string) => {
      const res = await defiNotifyRequest.getAlertThresholdByPlatform({platform});
      if(res){
        setAlertThreshold(res.data);
      }
    };
    if(platform != '' && platform != undefined){
      void handleSetAlertThreshold(platform);
    }
    else{
      setAlertThreshold('');
    }
  }, [platform]);

  const handleChooseItem = (item: any) => {
    onChange(item.name);
  };

  return (
    <Dropdown
      data={handleMapIconPlatformData(platformData)}
      label={'Choose a platform'}
      placeholder={'Choose a platform'}
      exactKey={'Platform'}
      labelField={'description'}
      valueField={'name'}
      onSelectItem={handleChooseItem}
      defaultValue={platformData.find(x => x.name === platform)}
    />
  );
};
export default DropdownPlatform;