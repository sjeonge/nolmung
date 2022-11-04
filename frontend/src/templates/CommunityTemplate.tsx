import React from 'react';
import {View} from 'react-native';
import CommunityTab from '@organisms/CommunityTab';
import CommWithPost from '@organisms/CommWithPost';
import CommOtherPost from '@organisms/CommOtherPost';
import {withPostListType, otherPostListType} from '~/pages/Community';

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
    <View>
      <CommunityTab
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
      />
      {categoryType === 'WITH' ? (
        <CommWithPost withPostList={withPostList} loadMore={loadMore} />
      ) : (
        <CommOtherPost otherPostList={otherPostList} loadMore={loadMore} />
      )}
    </View>
  );
}

export default CommunityTemplate;