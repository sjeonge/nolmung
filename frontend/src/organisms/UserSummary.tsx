import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WalkSummary from '../molecules/WalkSummary';
import Profile from '../atoms/Profile';

interface Props {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
}

function UserSummary({
  imageSource,
  userName,
  walkNumber,
  walkHour,
  walkDistance,
}: Props) {
  return (
    <View style={styles.container}>
      <Profile imageSource={imageSource} />
      <View>
        <Text style={styles.userName}>{userName}</Text>
        <WalkSummary
          firstLabel="산책 횟수"
          firstText={walkNumber}
          secondLabel="총 산책 시간"
          secondeText={walkHour}
          thirdLabel="총 산책 거리"
          thridText={walkDistance}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  userName: {
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default UserSummary;