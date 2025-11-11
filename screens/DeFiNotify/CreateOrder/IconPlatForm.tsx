import { ImageBackground, StyleSheet } from 'react-native';

interface IIconPlatFormProps {
    name: string;
  }
  
const IconPlatForm = ({ name }: IIconPlatFormProps) => {
  const styles = StyleSheet.create({
    icon: {
      width: 24, height: 24, alignSelf: 'center'
    }
  });
  const formatName = name.trim().replace(' ', '');
  const logoPlatformData = {
    'venus': require('@/assets/coinIcons/venus.png'),
    'atlantis': require('@/assets/coinIcons/atlantis.png'),
    'annex': require('@/assets/coinIcons/annex.png'),
    'cream': require('@/assets/coinIcons/cream.png'),
    'valas': require('@/assets/coinIcons/valas.png'),
    'traderjoe': require('@/assets/coinIcons/traderjoe.png'),
    'blizz': require('@/assets/coinIcons/blizz.png'),
    'aavev2': require('@/assets/coinIcons/aavev2.png'),
    'abracadabra': require('@/assets/coinIcons/abracadabra.png'),
    'ironbank': require('@/assets/coinIcons/ironbank.png'),
    'scream': require('@/assets/coinIcons/scream.png'),
    'olafinance': require('@/assets/coinIcons/olafinance.png'),
    'sturdy': require('@/assets/coinIcons/sturdy.png'),
    'geist': require('@/assets/coinIcons/geist.png'),
    'granary': require('@/assets/coinIcons/granary.webp'),
    'oasis.app(maker)': require('@/assets/coinIcons/oasis.app(maker).png'),
    'compoundV3': require('@/assets/coinIcons/compound.png'),
    'justlend': require('@/assets/coinIcons/justlend.png'),
    'fountain': require('@/assets/coinIcons/fountain.png'),
    'mai.finance': require('@/assets/coinIcons/mai.finance.webp'),
    'liquity': require('@/assets/coinIcons/liquity.png'),
    'radiant.capital': require('@/assets/coinIcons/radiant.capital.png'),
    'tarot': require('@/assets/coinIcons/tarot.png'),
    'screamv1': require('@/assets/coinIcons/screamv1.png'),
    'screamv2': require('@/assets/coinIcons/screamv2.png'),
    'benqi': require('@/assets/coinIcons/benqi.png'),
    'aavev3': require('@/assets/coinIcons/aavev3.png'),
	  'hyperlend': require('@/assets/coinIcons/hyperlend.png'),
	  'spark.fi': require('@/assets/coinIcons/spark.fi.png'),
    'tectonic': require('@/assets/coinIcons/tectonic.png')
	
  };
    // @ts-ignore
  return <ImageBackground source={logoPlatformData[formatName]} style={styles.icon} />;
};

export default IconPlatForm;