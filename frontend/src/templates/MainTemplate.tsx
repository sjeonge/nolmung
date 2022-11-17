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
  totalDistance: number;
  totalTime: number;
  totalWalk: number;
}

function MainTemplate({
  spots,
  mainPostList,
  userName,
  profileImage,
  goWalking,
  totalDistance,
  totalTime,
  totalWalk,
}: Props) {
  return (
    <View>
      <MainWalk goWalking={goWalking} />
      <UserSummary
        imageSource={profileImage}
        userName={userName}
        walkNumber={totalWalk}
        walkHour={totalTime}
        walkDistance={totalDistance}
      />
      <MainPosts mainPostList={mainPostList} />
      <MainSpots spots={spots} />
    </View>
  );
}

export default MainTemplate;
