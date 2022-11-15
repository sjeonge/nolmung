import React from 'react';
import {View, StyleSheet, Text, Dimensions, Pressable} from 'react-native';
import Heart from '@assets/heart.svg';
import RedHeart from '@assets/redHeart.svg';
import MyButton from '@atoms/MyButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ChatsParamList} from '~/pages/Chats';
import {useAppDispatch} from '~/store';

const windowWidth = Dimensions.get('window').width;

interface footerProps {
  categoryType: string;
  pay?: number;
  isWriter: Boolean;
  isLiked: Boolean;
  putLike: () => void;
}

type chatScreenProp = NativeStackNavigationProp<ChatsParamList, 'Chats'>;

function DetailFooter({categoryType, pay, isWriter, isLiked}: footerProps) {
  const navigation = useNavigation<chatScreenProp>();
  const dispatch = useAppDispatch();

  const startChat = () => {
    // dispatch()
    navigation.navigate('ChatsDetail', {roomId: 3});
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => putLike()}>
        <View style={styles.heartContainer}>
          {isLiked ? (
            <Heart height={25} width={25} fill="black" />
          ) : (
            <RedHeart height={25} width={25} fill="red" />
          )}
        </View>
      </Pressable>
      <View style={styles.infoContainer}>
        <Text style={styles.textBold}>
          {categoryType === 'WITH'
            ? '같이 산책🤎'
            : `${pay?.toLocaleString('ko-KR')}원`}
        </Text>
        <MyButton
          btnText={isWriter ? '채팅목록' : '채팅하기'}
          width={100}
          onClick={
            isWriter ? () => navigation.navigate('Chats') : () => startChat()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
  heartContainer: {
    paddingHorizontal: 5,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 5,
    borderLeftWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: '800',
    color: 'black',
  },
});

export default DetailFooter;
