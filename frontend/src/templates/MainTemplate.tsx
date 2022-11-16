import React from 'react';
import {View} from 'react-native';
import UserSummary from '@organisms/UserSummary';
import MainPosts from '@organisms/MainPosts';
import MainSpots from '@organisms/MainSpots';
import MainWalk from '@organisms/MainWalk';

interface Props {
  spots: any[];
  mainPostList: any[];
  userName: string;
  profileImage: string;
  goWalking: () => void;
}

function MainTemplate({
  spots,
  mainPostList,
  userName,
  profileImage,
  goWalking,
}: Props) {
  return (
    <View>
      <MainWalk goWalking={goWalking} />
      <UserSummary
        imageSource={profileImage}
        userName={userName}
        walkNumber={13}
        walkHour={500}
        walkDistance={500}
      />
      <MainPosts mainPostList={mainPostList} />
      <MainSpots spots={spots} />
    </View>
  );
}

export default MainTemplate;
