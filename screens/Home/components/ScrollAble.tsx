import React, { PropsWithChildren } from 'react';
import { FlatList, RefreshControl } from 'react-native';

interface IScrollAbleProps extends PropsWithChildren{
    isRefreshing: boolean,
    handleRefresh: () => void;
}
const ScrollAble = ({children, isRefreshing, handleRefresh}: IScrollAbleProps) => {
  return (
    <FlatList data={[1]} renderItem={() => <>{ children }</>} refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} />}/>
  );
};

export default ScrollAble;