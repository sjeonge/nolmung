import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Coord} from 'react-native-nmap';

import axios from '~/utils/axios';
import {AxiosResponse} from 'axios';
import {
  removeMultiple,
  getAllKeys,
  getData,
  getMultiple,
} from '~/utils/AsyncService';
import {
  setMyPosition,
  setIsLoggingOn,
  addPath,
  setStates,
  resetStates,
  setIsSavingOn,
  setIsSavingOff,
} from '~/slices/myPositionSlice';

const localList = ['@StartDate', '@LastUpdate', '@WalkingLogs', '@Dogs'];

export const startWalking = async (
  dispatch: any,
  navigation: any,
  myPositionState: any,
) => {
  if (myPositionState.isLogging) {
    //watchPostion이 실행 중 => 아무 동작 없이 mapView만 띄울 것
    navigation.navigate('MapViewAlone');
  } else if (!myPositionState.isLogging) {
    // watchPosition이 중단 된 상태 => local 확인 해보고 판단
    const localStatus = await checkLocal(localList);
    if (localStatus) {
      // local에는 존재 redux에는 없음 => 비정상 종료
      lastLogAlert(navigation, dispatch, localList);
    } else {
      // redux,local 둘다 없음 => 그냥 새로 시작
      startLogging(dispatch);
      navigation.navigate('MapViewAlone');
    }
  }
};

export const startLogging = async (dispatch: any) => {
  dispatch(dispatch(setIsLoggingOn()));
  Geolocation.watchPosition(
    position => {
      const myPosition: Coord = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      dispatch(setMyPosition(myPosition));
      dispatch(addPath(myPosition));
    },
    error => {
      console.log(error);
    },
    {
      interval: 1000,
      enableHighAccuracy: true,
      timeout: 20000,
      distanceFilter: 3,
    },
  );
};
// 비정상 기록 저장 여부 질문
export const lastLogAlert = (
  navigation: any,
  dispatch: any,
  removeList: string[],
) => {
  Alert.alert(
    '비정상 종료된 산책이 있습니다',
    '지난 기록을 보시겠어요?',
    [
      {
        text: '무시하고 새로 시작',
        onPress: async () => {
          await removeMultiple(removeList);
          await dispatch(resetStates);
          navigation.navigate('MapViewAlone');
          startLogging(dispatch);
        }, //local 지우기, navigate mapView
      },
      {
        text: '네 볼래요',
        onPress: async () => {
          const isOver = await checkLastUpdate();
          await syncLogs(dispatch);
          navigation.navigate('LogView', {isOver});
        },
      },
    ],
    {cancelable: false},
  );
  return;
};

// Local에 key들이 전부 존재하는지 확인
export const checkLocal = async (checkList: string[]) => {
  const allKeys = await getAllKeys();
  if (checkList.every(i => allKeys.includes(i))) {
    return true;
  } else {
    return false;
  }
};
// local 마지막 기록 시간확인
export const checkLastUpdate = async () => {
  const loggedDate = new Date(await getData('@LastUpdate'));
  loggedDate.setHours(loggedDate.getMinutes() + 30);
  const currentDate = new Date();
  // 마지막 기록시간보다 30분 이상 지나 있을 때
  if (loggedDate >= currentDate) {
    return true;
  } // 30분 이내의 기내의 기록이 있을 때
  else {
    return false;
  }
};

//로그 로컬 <-> 리덕스 동기화
const syncLogs = async (dispatch: any) => {
  const values = await getMultiple(localList);
  if (values !== undefined) {
    const logsPair = {
      startDate: values[0],
      lastUpdate: values[1],
      walkingLogs: values[2],
      dogs: values[3],
    };
    dispatch(setStates(logsPair));
  }
};

// local/redux 초기화

// log 서버 전송 (withScreenShot)
export const logsToServer = async () => {
  try {
    const response: AxiosResponse = await axios.post('로그저장주소');
  } catch (error: any) {
    Alert.alert(
      `에러코드 ${error.response.status}`,
      '죄송합니다. 다시 시도해주시길 바랍니다.',
    );
  }
};

// 산책 종료시 : logview이동, 저장API, local/redux 초기화
const doneWalking = async (dispatch: any) => {
  dispatch(setIsSavingOn);
  await logsToServer();
  dispatch(setIsSavingOff);
};