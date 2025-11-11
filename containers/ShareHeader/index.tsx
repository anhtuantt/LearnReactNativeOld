import Box from '@/components/Box';
import ButtonOpacity from '@/components/Button/ButtonOpacity';
import Icons from '@/components/Icons';
import Typography from '@/components/Typography';

interface IShareHeaderProps {
    titleComponent: JSX.Element;
}
const ShareHeader = (props: IShareHeaderProps) => {
  const { titleComponent } = props;
  const {VoucherIcon, NotifyIcon} = Icons;
  return (
    <Box
      width={'100%'}
      flexDirection='row'
      alignItems='center'
      paddingVertical={12}
      gap={12}
      height={60}
      backgroundColor={'white'}>
      <Box flex={1} flexDirection='row' gap={12} alignItems={'center'}>
        {titleComponent}
      </Box>
      <Box flexDirection={'row'} paddingRight={12} gap={12} alignItems={'center'}>
        {/* promotion */}
        <ButtonOpacity onPress={() => {}}>
          <Box flexDirection= {'row'}
            justifyContent= {'center'}
            alignItems= {'center'}
            gap= {8}
            backgroundColor= {'lightgray'}
            borderRadius= {20}
            paddingHorizontal= {8}
            paddingVertical= {4} >
            <VoucherIcon width={12} height={12} />
            <Typography>9</Typography>
          </Box>
        </ButtonOpacity>
        {/* notification */}
        <ButtonOpacity onPress={() => {}}>
          <NotifyIcon width={30} height={30} />
          <Box position={'absolute'}
            right={-5}
            top={-10}
            backgroundColor={'red'}
            borderRadius={50}
            padding={2}>
            <Typography color={'white'} fontSize={10}>12</Typography>
          </Box>
        </ButtonOpacity>
      </Box>
    </Box>
  );
};

export default ShareHeader;
