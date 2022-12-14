import React, {useEffect, useState, useRef} from 'react';
import {Alert} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {doneWalking} from '~/utils/MyPositionFunctions';
import {addDistance} from '~/slices/myPositionSlice';
import {setIsSavingOff, setIsSavingOn} from '~/slices/myPositionSlice';
import axios from 'utils/axios';
import {removeMultiple} from '~/utils/AsyncService';

const localList = ['@StartDate', '@LastUpdate', '@WalkingLogs', '@Dogs'];

function MapViewAlone({navigation}: any) {
  const dispatch = useDispatch();

  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const myPosition = useSelector(
    (state: RootState) => state.myPosition.myPosition,
  );

  const path = useSelector((state: RootState) => state.myPosition.path);
  const isSaving = useSelector((state: RootState) => state.myPosition.isSaving);
  const watchId = useSelector((state: RootState) => state.myPosition.watchId);

  const dogsInfo = useSelector((state: RootState) => state.dogs.dogsInfo);
  const distance = useSelector((state: RootState) => state.myPosition.distance);
  const selectedDogs = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );

  const startDate = useSelector(
    (state: RootState) => state.myPosition.startDate,
  );
  const lastUpdate = useSelector(
    (state: RootState) => state.myPosition.lastUpdate,
  );

  // LogView 함수 만들어서 import하기
  const dogs: any[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });

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
      startDate: startDate,
      endDate: lastUpdate,
      walkedDogList: selectedDogs,
      gpsList: path,
    };

    try {
      const response = await axios.post('withdog/walk', jsonData);
      if (response.status === 200) {
        removeMultiple(localList);
      }
    } catch (err: any) {
      Alert.alert('저장에 실패 했습니다', '다시 시도해 주세요');
    }
  };

  const handleDoneWalking = async () => {
    doneWalking(dispatch, navigation, watchId);
    dispatch(setIsSavingOn);
    await submitLogs();
    dispatch(setIsSavingOff);
  };

  //시간계산
  const defaultSec =
    typeof startDate === 'string'
      ? (new Date().getTime() - new Date(startDate).getTime()) / 1000
      : 0;
  const [second, setSecond] = useState(defaultSec);
  const [delay, setDelay] = useState(1000);

  useInterval(() => {
    setSecond(second + 1);
  }, delay);

  //거리계산
  useEffect(() => {
    const haversine = require('haversine');
    if (path.length >= 2) {
      const d = haversine(path[path.length - 1], path[path.length - 2], {
        unit: 'meter',
      });
      dispatch(addDistance(d));
    }
  }, [path]);

  if (isSaving) {
    return <OnSaving />;
  } else {
    return (
      <MapViewTemplate
        myPosition={myPosition}
        path={path}
        dogInfoList={dogs}
        startDate={startDate}
        doneWalking={() => {
          handleDoneWalking();
        }}
        distance={distance}
        dispatch={dispatch}
        second={second}
        navigation={navigation}
      />
    );
  }
}

const useInterval = (callback, delay): HookType => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default MapViewAlone;
