import Flex from '@/components/flex';
import { Text } from '@tarojs/components';

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
    <Flex>
      <Text>我司你爹</Text>
    </Flex>
  );
};

export default IndexPage;

definePageConfig({
  navigationBarTitleText: '',
  enablePullDownRefresh: true,
  enableShareAppMessage: true,
});
