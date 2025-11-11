import Box from '@/components/Box';
import Icons from '@/components/Icons';
import Typography from '@/components/Typography';

interface IMessageInfoProps {
  message: string;
}
const MessageInfo = ({ message }: IMessageInfoProps) => {
  const {InfoIcon} = Icons;
  return (
    <Box padding={16} flexDirection='row' gap={12} borderWidth={2} borderRadius={12} borderColor={'#1562F8'}>
      {/* left */}
      <Box paddingTop={8}>
        <InfoIcon width={16} color='#1562F8'/>
      </Box>
      {/* right */}
      <Box flex={1}>
        <Typography fontSize={12} color='#474D65'>
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageInfo;
