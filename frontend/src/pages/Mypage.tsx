import React, {useState, useCallback} from 'react';
import {Text, View, Alert} from 'react-native';
// import {RootState} from '../store/reducer';
// import {useSelector} from 'react-redux';
import MypageTemplate from '../templates/MypageTemplate';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MyPostList from './MyPostList';

//UserInfoType
type UserInfoType = {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
};

//dummy
const userInfo: UserInfoType = {
  imageSource:
    'http://image.dongascience.com/Photo/2020/03/d2bb40617ababa299660cccc0442f993.jpg',
  userName: '윤성도짱짱',
  walkNumber: 10,
  walkHour: 10,
  walkDistance: 100,
};

const Stack = createNativeStackNavigator();

function Mypage() {
  // const userInfo = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(userInfo.userName);

  const onChangeNickname = useCallback(text => {
    setTempNickname(text);
  }, []);

  const profileEdit = (): void => {
    if (isEditing) {
      // 변경 profile 전송(닉네임 + 사진)
    }
    setIsEditing(!isEditing);
  };
  return (
    <View>
      <Text>마이 페이지</Text>
      <MypageTemplate
        userInfo={userInfo}
        isEditing={isEditing}
        profileEdit={profileEdit}
        onChangeNickname={onChangeNickname}
        value={tempNickname}
      />
      {/* <NavigationContainer> */}
      <Stack.Navigator>
        <Stack.Screen name="MyPostList" component={MyPostList} />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </View>
  );
}

export type {UserInfoType};
export default Mypage;
