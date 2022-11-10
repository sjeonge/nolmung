import React from 'react';
import {View, StyleSheet} from 'react-native';
import CommunityTab from '@organisms/CommunityTab';
import CommWithPost from '@organisms/CommWithPost';
import CommOtherPost from '@organisms/CommOtherPost';
import {withPostListType, otherPostListType} from '@pages/Community';
import EditBtn from '@molecules/EditBtn';

export interface CommunityTabType {
  navigateWithPg: () => void;
  navigateOtherPg: () => void;
  categoryType: string;
}

interface Props extends CommunityTabType {
  withPostList: withPostListType[];
  loadMore: () => void;
  otherPostList: otherPostListType[];
}

function CommunityTemplate({
  navigateWithPg,
  navigateOtherPg,
  categoryType,
  withPostList,
  loadMore,
  otherPostList,
}: Props) {
  return (
    <View style={styles.container}>
      <CommunityTab
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
      />
      {categoryType === 'WITH' ? (
        <>
          <CommWithPost withPostList={withPostList} loadMore={loadMore} />
          <EditBtn />
        </>
      ) : (
        <>
          <CommOtherPost otherPostList={otherPostList} loadMore={loadMore} />
          <EditBtn />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CommunityTemplate;
