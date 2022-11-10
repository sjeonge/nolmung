import React, {useState, useCallback} from 'react';
import {View, Pressable, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MypageTemplate from '../templates/MypageTemplate';
import Filter from '@assets/filter.svg';
import Home from '@assets/home.svg';

import MyPostList from '@pages/MyPostList';
import MyLikedList from '@pages/MyLikedList';
import MyLikedSpots from '@pages/MyLikedSpots';
import MyWalkingRecord from '@pages/MyWalkingRecord';
import MyDogs from '@pages/MyDogs';
import MapViewAlone from '@pages/MapViewAlone';

//로깅시작함수
import {startLogging} from '~/slices/myPositionSlice';
import {useDispatch} from 'react-redux';
import {
  storeData,
  getData,
  removeData,
  containsKey,
  getAllKeys,
} from '~/utils/AsyncService';

//UserInfoType
export type UserInfoType = {
  imageSource: string;
  userName: string;
  walkNumber: number;
  walkHour: number;
  walkDistance: number;
};

const MypageStack = createNativeStackNavigator();
export const MypageStackNavigator = () => (
  <MypageStack.Navigator>
    <MypageStack.Screen
      name="MypageInit"
      component={Mypage}
      options={{headerShown: false}}
    />
    <MypageStack.Screen name="MyPostList" component={MyPostList} />
    <MypageStack.Screen name="MyLikedList" component={MyLikedList} />
    <MypageStack.Screen name="MyLikedSpots" component={MyLikedSpots} />
    <MypageStack.Screen name="MyWalkingRecord" component={MyWalkingRecord} />
    <MypageStack.Screen name="MyDogs" component={MyDogs} />
    <MypageStack.Screen name="MapViewAlone" component={MapViewAlone} />
  </MypageStack.Navigator>
);

//dummy
const userInfo: UserInfoType = {
  imageSource:
    'http://image.dongascience.com/Photo/2020/03/d2bb40617ababa299660cccc0442f993.jpg',
  userName: '윤성도짱짱',
  walkNumber: 10,
  walkHour: 10,
  walkDistance: 100,
};

// 마이페이지 버튼탭 목록(navi동작)
const myPageListNavi = [
  {
    name: 'MyPostList',
    icon: <Filter width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내가 쓴 글',
  },
  {
    name: 'MyLikedList',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내가 찜한 글',
  },
  {
    name: 'MyLikedSpots',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내가 찜한 스팟',
  },
  {
    name: 'MyWalkingRecord',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내 산책 기록',
  },
  {
    name: 'MyDogs',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '내 강아지',
  },
];
// 마이페이지 버튼탭 목록(다른동작)
const myPageListFunc = [
  {
    name: 'Logout',
    icon: <Home width={25} height={25} fill={'black'} stroke={'black'} />,
    btnText: '로그아웃',
  },
];

function Mypage({navigation}: any) {
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
  
  // 산책 시작 예시 함수
  const dogs = [
  {
    dog_idx:1,
    user_idx:1,
    dog_name:'강아지1',
    image:'@assets/logo.png',
  },
  { dog_idx:2,
    user_idx:1,
    dog_name:'강아지2',
    image:'@assets/logo.png',
  }
  ] // Dogs 객체 예시
  const dispatch = useDispatch();
  const startWalking = () => {
    navigation.navigate('MapViewAlone');
    startLogging(dispatch, dogs);
  };

  return (
    <View>
      <MypageTemplate
        userInfo={userInfo}
        isEditing={isEditing}
        profileEdit={profileEdit}
        onChangeNickname={onChangeNickname}
        value={tempNickname}
        TabButtonListNavi={myPageListNavi}
        TabButtonListFunc={myPageListFunc}
        navigation={navigation}
      />
      <Pressable onPress={startWalking}>
        <Text>산책시작하기</Text>
      </Pressable>
      <Pressable onPress={()=>{storeData('abc','def')}}>
        <Text>storeData</Text>
      </Pressable>
      <Pressable onPress={async()=>{const a = await containsKey('abc')
    console.log(a)}}>
        <Text>containsKey</Text>
      </Pressable>
      <Pressable onPress={()=>{removeData('abc')}}>
        <Text>removeData</Text>
      </Pressable>
      <Pressable onPress={async()=>{const a = await getAllKeys()
    console.log(a)}}>
        <Text>getAllKeys</Text>
      </Pressable>
    </View>
  );
}

export default Mypage;
