import { IconProps } from '@/components/Icons';
import UKFlagIcon from '@/components/Icons/UKFlagIcon';
import VNFlagIcon from '@/components/Icons/VNFlagIcon';

export interface ILanguage {
  lang: string;
  name: string;
  flag: (props: IconProps) => JSX.Element;
}

export const LanguageCode = {
  VI: 'vi',
  EN: 'en',
};

export const listDefaultLanguage: ILanguage[] = [
  {
    lang: LanguageCode.VI,
    name: 'language:vietnamese',
    flag: (props: IconProps) => {
      return <VNFlagIcon width={props?.width} height={props?.width} />;
    },
  },
  {
    lang: LanguageCode.EN,
    name: 'language:english',
    flag: (props: IconProps) => {
      return <UKFlagIcon width={props?.width} height={props?.width} />;
    },
  },
];
