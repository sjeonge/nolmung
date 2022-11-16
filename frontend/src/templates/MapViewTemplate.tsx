import React from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import NaverMapView, {Marker, Polyline} from 'react-native-nmap';
import {MAIN_COLOR} from '~/const';
import {Coord} from 'react-native-nmap';
import DetailDogs from '@organisms/DetailDogs';
import {DetailDogProps} from '@molecules/DetailDog';
import MyButton from '~/atoms/MyButton';
import Timer from '@organisms/Timer';

interface Props {
  myPosition: Coord | null;
  path: Coord[];
  dogInfoList: DetailDogProps[];
  doneWalking: any;
  count: number;
  increaseCount: () => void;
}

function MapView({
  myPosition,
  path,
  dogInfoList,
  doneWalking,
  count,
  increaseCount,
}: Props) {
  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={styles.whileLoading}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }
  console.log(dogInfoList);
  return (
    <View>
      <ScrollView>
        <View style={styles.mapViewContainer}>
          <DetailDogs dogInfoList={dogInfoList} />
          <View style={styles.mapContainer}>
            <NaverMapView
              style={styles.nmap}
              zoomControl={true}
              center={{
                zoom: 17,
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}>
              <Marker
                coordinate={{
                  latitude: myPosition.latitude,
                  longitude: myPosition.longitude,
                }}
                width={50}
                height={50}
                anchor={{x: 0.5, y: 0.5}}
                caption={{text: '나'}}
                image={require('@assets/logo.png')}
              />
              {path.length >= 2 ? (
                <Polyline coordinates={path} strokeColor={MAIN_COLOR} />
              ) : null}
            </NaverMapView>
          </View>
          <MyButton
            btnText="산책 종료"
            width={200}
            height={50}
            onClick={doneWalking}
          />
          {/* <Timer count={count} increaseCount={increaseCount}></Timer> */}
          <Timer />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  whileLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mapViewContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  mapContainer: {
    alignItems: 'center',
    width: '90%',
    height: Dimensions.get('window').height / 2,
  },
  nmap: {
    justifySelf: 'center',
    width: '100%',
    height: '100%',
  },
});

export default MapView;
