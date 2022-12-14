import React from 'react';
import {View, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '~/store';
import {RootState} from '~/store/reducer';
import LogViewTemplate from '@templates/LogviewTemplate';
import {dogInfo} from '~/molecules/MainDogs';
import axios from 'utils/axios';
import {setIsSavingOff, setIsSavingOn} from '~/slices/myPositionSlice';
import {clearLogsAll, startLogging} from '~/utils/MyPositionFunctions';

const moment = require('moment');

function LogView({route, navigation}: any) {
  const dispatch = useAppDispatch();
  const path = useSelector((state: RootState) => state.myPosition.path);
  // const isOver = route.params.isOver;
  const dogsInfo: dogInfo[] = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  const selectedDogs: number[] = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );
  const distance = useSelector((state: RootState) => state.myPosition.distance);
  const startDate = useSelector(
    (state: RootState) => state.myPosition.startDate,
  );
  const lastUpdate = useSelector(
    (state: RootState) => state.myPosition.lastUpdate,
  );
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  // dogs type import해와서 지정
  const dogs: dogInfo[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });
  const goBackAndClear = () => {
    navigation.replace('MainPage');
    clearLogsAll(dispatch);
  };
  const utcTOKST = (curr: string | null) => {
    if (curr) {
      const currT = new Date(curr);
      const utc = currT.getTime() + currT.getTimezoneOffset() * 60 * 1000;
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const kr_curr = new Date(utc + KR_TIME_DIFF).toString();
      return kr_curr;
    } else {
      return null;
    }
  };

  // img,데이터 전송
  const submitLogs = async () => {
    const jsonData = {
      ownerIdx: userIdx,
      walkerIdx: userIdx,
      distance: distance,
      time:
        lastUpdate && startDate
          ? (new Date(lastUpdate).getTime() - new Date(startDate).getTime()) /
            1000
          : 0,
      startDate: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment(lastUpdate).format('YYYY-MM-DD HH:mm:ss'),
      walkedDogList: selectedDogs,
      gpsList: path,
    };

    try {
      const response = await axios.post('withdog/walk', jsonData);
      if (response.status === 200) {
        Alert.alert(
          '저장완료',
          '기록이 저장 되었습니다',
          [
            {
              text: '확인',
              onPress: () => {
                goBackAndClear();
              },
            },
          ],
          {
            cancelable: true,
            onDismiss: () => {
              goBackAndClear();
            },
          },
        );
      }
    } catch (err: any) {
      Alert.alert('저장에 실패 했습니다', '다시 시도해 주세요');
    }
  };

  //저장o
  const saveLogs = async () => {
    dispatch(setIsSavingOn);
    await submitLogs();
    dispatch(setIsSavingOff);
  };
  //저장x
  const noSaveLogs = async () => {
    navigation.replace('MainPage');
    clearLogsAll(dispatch);
  };

  //이어하기
  const countinueLogs = async () => {
    startLogging(dispatch, selectedDogs);
    navigation.replace('MapViewAlone');
  };

  return (
    <View>
      <LogViewTemplate
        path={path}
        dogInfoList={dogs}
        myPosition={myPosition}
        saveLogs={() => {
          saveLogs();
        }}
        noSaveLogs={() => {
          noSaveLogs();
        }}
        countinueLogs={() => {
          countinueLogs();
        }}
        distance={distance}
        second={
          lastUpdate && startDate
            ? (new Date(lastUpdate).getTime() - new Date(startDate).getTime()) /
              1000
            : 0
        }
        startDate={utcTOKST(startDate)}
      />
    </View>
  );
}
export default LogView;
