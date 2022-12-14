import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ChatWalkStart from '~/atoms/ChatWalkStart';
import DogLocation from '~/atoms/DogLocation';
import PostscriptBtn from '~/atoms/PostscriptBtn';
import ScheduleBtn from '~/atoms/ScheduleBtn';
import Squre from '~/atoms/Squre';
interface chatsPostInfoProps {
  postSubject: string;
  postImage: string;
  postPay?: number;
  handleConfirmWalk: () => void;
  isCompleted: boolean;
  hadleMyDogLocation: () => void;
  isMyPost: boolean;
  hadleStartWalk: () => void;
}

function ChatPostInfo({
  postSubject,
  postImage,
  postPay,
  handleConfirmWalk,
  isCompleted,
  hadleMyDogLocation,
  isMyPost,
  hadleStartWalk,
}: chatsPostInfoProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.postInfoContainer}>
        <Squre imageSource={postImage} width={70} height={70} />
        <View style={styles.textContainer}>
          <Text style={styles.bold}>{postSubject}</Text>
          <Text style={styles.bold}>
            {postPay !== null ? `${postPay?.toLocaleString('ko-KR')}원` : null}
          </Text>
        </View>
      </View>
      {postPay === null ? null : (
        <View style={styles.btnContainer}>
          {isMyPost && isCompleted ? (
            <DogLocation hadleMyDogLocation={hadleMyDogLocation} />
          ) : null}
          {isMyPost && !isCompleted ? (
            <ScheduleBtn handleConfirmWalk={handleConfirmWalk} />
          ) : null}
          {!isMyPost && isCompleted ? (
            <ChatWalkStart hadleStartWalk={hadleStartWalk} />
          ) : null}
          <PostscriptBtn onClick={() => navigation.navigate('WalkReview')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'space-between',
  },
  postInfoContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  bold: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default ChatPostInfo;
