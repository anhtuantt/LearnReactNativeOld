import Box from '@/components/Box';
import Typography from '@/components/Typography';
import { TouchableOpacity } from 'react-native';
import { durationData, IDuration } from '../../types';
import { usePaymentSelector } from '../../context';


const Duration = () => {
  
  return (
    <Box gap={8}>
      <Typography fontSize={15}>Select subscription duration*</Typography>
      <Box flexDirection='row' gap={12}>
        {durationData.map(item => (
          <DurationItem key={item.value} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Duration;

const DurationItem = ({ item }: { item: IDuration }) => {
  const duration = usePaymentSelector('duration');
  const handlePress = () => duration.set(item.value);
  const borderColor = (duration.get == item.value) ? '#1562F8' : '#E3E5EB';
  return (
    <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
      <Box borderWidth={1} borderColor={borderColor} justifyContent='center' alignItems='center' padding={14} backgroundColor={'#E3E5EB'} borderRadius={12}>
        <Typography fontSize={15}>{item.label}</Typography>
      </Box>
    </TouchableOpacity>
  );
};