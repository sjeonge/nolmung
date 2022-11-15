import {AxiosResponse} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import SpotsTemplate from '~/templates/SpotsTemplate';
import axios from '~/utils/axios';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';
import {getTextAddress} from '~/utils/addressService';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_COLOR} from '~/const';
import SpotDetail from './SpotDetail';

export interface menu {
  menuName: string;
  menuPrice: number;
}

export interface time {
  timeName: string;
  timeDesc: string;
}
export interface Spot {
  category: string | null;
  distance: number;
  imgCnt: number;
  address: string | null;
  lat: number;
  lng: number;
  descList: string[] | null;
  menuList: menu[] | null;
  timeList: time[] | null;
  name: string;
  reviewCnt: number;
  star: number | null;
  tag: string | null;
  spotId: string;
  tel: string | null;
}
export interface SpotRequest {
  lat: number | undefined;
  lng: number | undefined;
  searchValue: string;
  limitDistance: number;
  category: string;
}

export type SpotDetailParamList = {
  Spot: undefined;
  SpotDetail: {spotId: string};
};

const SpotStack = createNativeStackNavigator();

export const SpotStackNavigator = () => (
  <SpotStack.Navigator>
    <SpotStack.Screen
      name="Spots"
      component={Spots}
      options={{
        headerTitle: '놀면 멍하니',
        headerTintColor: MAIN_COLOR,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
      }}
    />
    <SpotStack.Screen
      name="SpotDetail"
      component={SpotDetail}
      options={{
        headerTitle: '놀면 멍하니',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 15,
          color: MAIN_COLOR,
        },
      }}
    />
  </SpotStack.Navigator>
);

function Spots() {
  const [spotList, setSpotList] = useState<Spot[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<number>(0);
  const [limitDistance, setLimitDistance] = useState<number>(1000);
  const [category, setCategory] = useState<string>('카페');
  const [spotRequest, setSpotRequest] = useState<SpotRequest | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const lat = useSelector((state: RootState) => state.user.lat);
  const lng = useSelector((state: RootState) => state.user.lng);

  const getSpotList = async () => {
    const params = {
      page,
      sort,
    };
    try {
      const response: AxiosResponse = await axios.post(`spot`, spotRequest, {
        params,
      });
      if (response.status === 200) {
        const data = await response.data;
        if (page === 0) {
          setSpotList([...data?.spotDtoList]);
        } else {
          setSpotList([...spotList, ...data?.spotDtoList]);
        }

        setTotalPage(data?.totalPage);
      }
    } catch (error: any) {
      Alert.alert(`에러코드 ${error}`, `산책스팟 리스트 조회 실패`);
    }
  };

  const onChangeSearchValue = useCallback((val: string) => {
    setSearchValue(val.trim());
  }, []);

  const onSearchSubmit = (val: string) => {
    setPage(0);
    setSpotRequest({
      ...spotRequest,
      searchValue: val,
    } as SpotRequest);
  };

  const loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const initSpotRequest = () => {
    const requestBody: SpotRequest = {
      lat,
      lng,
      searchValue: '',
      limitDistance: 1000,
      category: '카페',
    };

    setSpotRequest(requestBody as SpotRequest);
  };

  const getTextLocation = async () => {
    if (!lat || !lng || lat === 0 || lng === 0) {
      setUserLocation('알수없음');
    }
    // 실제 위치 주소 가져오기
    const response = await getTextAddress(lat, lng);
    const address = response?.data?.documents[0].address;
    const firstArr = address?.region_2depth_name.split(' ');
    const strAddress =
      firstArr[firstArr.length - 1] + '/' + address?.region_3depth_name;
    setUserLocation(strAddress);
  };

  useEffect(() => {
    initSpotRequest();
  }, []);

  useEffect(() => {
    if (!spotRequest) {
      return;
    }
    getSpotList();
  }, [spotRequest, page, sort]);

  useEffect(() => {
    if (!spotRequest) {
      return;
    }
    setPage(0);
    setSpotRequest({
      ...spotRequest,
      lat,
      lng,
      limitDistance,
      category,
    } as SpotRequest);
  }, [limitDistance, category, lat, lng]);

  useEffect(() => {
    getTextLocation();
  }, [lat, lng]);

  return (
    <View>
      <SpotsTemplate
        spotList={spotList}
        page={page}
        totalPage={totalPage}
        userLocation={userLocation}
        spotRequest={spotRequest}
        onSearchSubmit={onSearchSubmit}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        loadMore={loadMore}
        sort={sort}
        setSort={setSort}
        limitDistance={limitDistance}
        setLimitDistance={setLimitDistance}
        category={category}
        setCategory={setCategory}
        initSpotRequest={initSpotRequest}
      />
    </View>
  );
}

export default Spots;
