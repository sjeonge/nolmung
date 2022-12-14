import React from 'react';
import {View, StyleSheet} from 'react-native';
import ChatPostInfo from '~/organisms/ChatPostInfo';
import ChatInput from '~/organisms/ChatInput';
import ChatField from '~/organisms/ChatField';

interface postType {
  postSubject: string;
  postImage: string;
  postPay?: number;
}

interface Props {
  postInfo: postType;
  submitMsg: (inputChat: String) => void;
  handleConfirmWalk: () => void;
  isCompleted: boolean;
  hadleMyDogLocation: () => void;
  isMyPost: boolean;
  fullMsg: any;
  user: number;
  oppentImg: string;
  hadleStartWalk: () => void;
}

function ChatsDetailTemplate({
  postInfo,
  submitMsg,
  fullMsg,
  user,
  oppentImg,
  handleConfirmWalk,
  isCompleted,
  hadleMyDogLocation,
  isMyPost,
  hadleStartWalk,
}: Props) {
  return (
    <View style={styles.container}>
      <ChatPostInfo
        postSubject={postInfo.postSubject}
        postImage={postInfo.postImage}
        postPay={postInfo.postPay}
        handleConfirmWalk={handleConfirmWalk}
        isCompleted={isCompleted}
        hadleMyDogLocation={hadleMyDogLocation}
        isMyPost={isMyPost}
        hadleStartWalk={hadleStartWalk}
      />
      <ChatField fullMsg={fullMsg} user={user} oppentImg={oppentImg} />
      <View style={styles.inputContainer}>
        <ChatInput submitMsg={submitMsg} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  inputContainer: {
    height: 70,
  },
});

export default ChatsDetailTemplate;
