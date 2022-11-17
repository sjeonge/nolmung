import React, {useEffect} from 'react';
import {View} from 'react-native';
import MapViewTemplate from '@templates/MapViewTemplate';
import OnSaving from '@pages/OnSaving';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {doneWalking} from '~/utils/MyPositionFunctions';
import {addDistance} from '~/slices/myPositionSlice';

function MapViewAlone({navigation}: any) {
  const dispatch = useDispatch();
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
  // LogView 함수 만들어서 import하기
  const dogs: any[] = [];
  dogsInfo.forEach(elem => {
    if (selectedDogs.includes(elem.dogIdx)) {
      dogs.push(elem);
    }
  });
  //시간계산
  const defaultSec =
    // startDate !== undefined && startDate !== null
    typeof startDate === 'string'
      ? (new Date().getTime() - new Date(startDate).getTime()) / 1000
      : 0;
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
      <View>
        <MapViewTemplate
          myPosition={myPosition}
          path={path}
          dogInfoList={dogs}
          startDate={startDate}
          doneWalking={() => {
            doneWalking(dispatch, navigation, watchId);
          }}
          distance={distance}
          dispatch={dispatch}
          second={defaultSec}
        />
      </View>
    );
  }
}
export default MapViewAlone;
