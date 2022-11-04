import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import MypageTemplate from '../templates/MypageTemplate';
import Filter from '@assets/filter.svg';
import Home from '@assets/home.svg';

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
    </View>
  );
}

export type {UserInfoType};
export default Mypage;
