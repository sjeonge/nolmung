import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ChatsDetailTemplate from '~/templates/ChatsDetailTemplate';
import {useChatSocket, useLocationSocket} from '~/hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import CustomHeader from '~/headers/CustomHeader';
import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {useAppDispatch} from '~/store';
import {setCompleted} from '~/slices/chatSlice';
import {setPostInfo} from '~/slices/postSlice';
import {startWalking} from '~/utils/SocketPositionFunctions';
import Geolocation from '@react-native-community/geolocation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapViewWorker from '@pages/MapViewWorker';
import {setPath, addDistance} from '~/slices/watcherSlice';
import {setWalkRoomId} from '~/slices/socketPositionSlice';
export interface chatType {
  chat: string;
  sender: number;
  roomId: string;
  createdAt: string;
}

function ChatsDetail({route, navigation}: any) {
  const dispatch = useAppDispatch();
  const roomId: string = route.params.roomId;

  const [chatSocket, chatDisconnect] = useChatSocket();
  const [locationSocket, locationDisconnect] = useLocationSocket();

  const [isFirstChat, setIsFirstChat] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.userIdx);

  const postSubject = useSelector((state: RootState) => state.chat.subject);
  const postImage = useSelector((state: RootState) => state.chat.postImage);
  const postPay = useSelector((state: RootState) => state.chat.pay);
  const postIdx = useSelector((state: RootState) => state.chat.postIdx);
  const oppentImg = useSelector((state: RootState) => state.chat.oppentImg);
  const oppentName = useSelector((state: RootState) => state.chat.oppentName);
  const isWriter = useSelector((state: RootState) => state.chat.isWriter);
  const oppentIdx = useSelector((state: RootState) => state.chat.oppentIdx);

  const [serverMsg, setServerMsg] = useState<chatType[]>([]);
  const [localMsg, setLocalMsg] = useState<chatType>();
  const [fullMsg, setFullMsg] = useState<chatType[]>([]);

  useEffect(() => {
    setFullMsg([]);
    if (chatSocket && locationSocket && roomId) {
      chatSocket.emit('join', roomId);

      chatSocket.on('chats', (serverChats: chatType[]) => {
        if (serverChats.length) {
          setServerMsg(serverChats);
          setIsFirstChat(false);
        } else {
          setIsFirstChat(true);
        }
      });

      chatSocket.on('completed', (completeData: boolean) => {
        console.log(completeData);
        setIsCompleted(completeData);
      });

      chatSocket.on('messageC', (data: chatType) => {
        if (data.roomId === roomId) {
          const newData: chatType = {
            chat: data.chat,
            sender: data.sender,
            roomId: data.roomId,
            createdAt: data.createdAt,
          };
          setLocalMsg(newData);
        }
      });

      locationSocket.on('replyGps', data => {
        console.log('리플라이');
      });
      return () => {
        if (chatSocket) {
          chatSocket.off('chats');
          chatSocket.off('messageC');
          chatSocket.off('decide');
          locationSocket.off('replyGps');
          locationSocket.off('completed');
        }
      };
    }
  }, [chatSocket, roomId, localMsg, locationSocket]);

  useEffect(() => {
    dispatch(
      setPostInfo({
        writerIdx: oppentIdx,
        userImgUrl: oppentImg,
        writerName: oppentName,
      }),
    );

    navigation.setOptions({
      header: () => (
        <CustomHeader
          navigation={navigation}
          middleText={oppentName}
          backFunc={() => navigation.replace('Chats')}
          middleFunc={() =>
            navigation.navigate('CommunityList', {
              screen: 'Oppent',
              params: {oppentIdx},
            })
          }
        />
      ),
    });
  }, [navigation, oppentName]);

  useEffect(() => {
    setFullMsg([...serverMsg]);
  }, [localMsg, serverMsg]);

  const postChatInfo = async (postRoomId: string) => {
    try {
      const response: AxiosResponse = await axios.post(
        `community/chat/${postIdx}`,
        {roomId: postRoomId},
      );
      if (response.status === 200) {
        setIsFirstChat(false);
      }
    } catch (error: any) {
      Alert.alert(
        `에러코드 ${error?.response?.status}`,
        '죄송합니다. 다시 시도해주시길 바랍니다.',
      );
    }
  };

  const submitMsg = (inputChat: String) => {
    const chat = inputChat.trim();
    const data = {
      roomId,
      sender: user,
      chat,
    };
    if (chatSocket && chat) {
      if (isFirstChat) {
        postChatInfo(roomId);
      }
      chatSocket.emit('messageS', data);
    }
  };

  const handleConfirmWalk = async () => {
    const data = {
      postIdx,
      albaIdx: oppentIdx,
    };
    if (isCompleted) {
      return;
    }
    if (chatSocket) {
      chatSocket.emit('complete', roomId);
    }
  };

  useEffect(() => {
    if (locationSocket) {
      locationSocket.on('replyLocationLogin', replyData => {
        console.log('replyData', replyData);
      });
      locationSocket.on('replyStartWalk', replayStart => {
        console.log('replyStartWalk', replayStart);
      });
      locationSocket.on('replyGps', gps => {
        console.log('replyGps', gps);
      });
      locationSocket.on('gpsInfo', gpsInfo => {
        console.log('알바 정보', gpsInfo);
      });
      locationSocket.on('replyEndWalk', end => {
        console.log('end', end);
      });
    }

    return () => {
      if (locationSocket) {
        locationSocket.off('replyLocationLogin');
        locationSocket.off('replyStartWalk');
        locationSocket.off('replyGps');
        locationSocket.off('gpsInfo');
      }
    };
  }, [locationSocket]);

  const hadleMyDogLocation = useCallback(() => {
    if (locationSocket) {
      locationSocket.emit('locationLogin', {id: user, roomId});
      locationSocket.emit('getGps', roomId);
    }
  }, [locationSocket, roomId, user]);

  const socketPositionState = useSelector(
    (state: RootState) => state.socketPosition,
  );

  // 개 불러오기
  const [dogs, setDogs] = useState([]);
  const [dogIdxs, setDogIdxs] = useState([]);
  const getDogs = async () => {
    const response = await axios.get(`community/post/dog-info/${postIdx}`);
    setDogs(response.data);
    const dogIdxList = response.data.map(value => {
      value.dogIdx;
    });
    setDogIdxs(dogIdxList);
  };

  useEffect(() => {
    getDogs();
  }, []);

  const hadleStartWalk = useCallback(() => {
    dispatch(setWalkRoomId(roomId));
    if (locationSocket && oppentIdx) {
      startWalking(
        dispatch,
        navigation,
        socketPositionState,
        dogIdxs,
        locationSocket,
        oppentIdx,
        roomId,
        postIdx,
      );
      locationSocket.emit('locationLogin', {id: user, roomId});
      // navigation.navigate('MapViewWorker');
      // locationSocket.emit('gps', gpsLocalData);
    }
  }, [locationSocket, roomId, user]);

  return (
    <ChatsDetailTemplate
      postInfo={{postImage, postSubject, postPay}}
      submitMsg={submitMsg}
      fullMsg={fullMsg}
      user={user}
      oppentImg={oppentImg}
      handleConfirmWalk={handleConfirmWalk}
      isCompleted={isCompleted}
      hadleMyDogLocation={hadleMyDogLocation}
      isMyPost={isWriter}
      hadleStartWalk={hadleStartWalk}
    />
  );
}

export default ChatsDetail;
