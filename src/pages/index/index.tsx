import Container from '@/components/container';

export interface SpaceListProps {
  roomId: number;
  roomName: string;
  description: string;
  icon: string;
  iconId: number;
  roomNameId: number;
}

const IndexPage: React.FC = () => {
  console.log(process.env.TARO_ENV, '??????????????????');
  return (
    // <Flex style={{ width: pxTransform(750), height: '100vh', backgroundColor: '#f09876' }}>
    //   <Text>我司你爹</Text>
    // </Flex>
    <Container></Container>
  );
};

export default IndexPage;

definePageConfig({
  navigationBarTitleText: '',
  enablePullDownRefresh: true,
  enableShareAppMessage: true,
});
