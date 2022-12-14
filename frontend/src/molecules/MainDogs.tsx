import React from 'react';
import {View, StyleSheet, Text, Pressable, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import Profile from '~/atoms/Profile';
import {RootState} from '~/store/reducer';
import SelectingDogs from '@molecules/SelectingDogs';
import Nodog from '~/atoms/Nodog';

export interface dogInfo {
  breedCodeValue: string;
  dogIdx: number;
  dogName: string;
  image: string;
}

interface Props {
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  isWalking: boolean;
  naviDogApply: () => void;
}

function MainDogs({
  isSelecting,
  setIsSelecting,
  isWalking,
  naviDogApply,
}: Props) {
  const myDogs: dogInfo[] | undefined = useSelector(
    (state: RootState) => state.dogs.dogsInfo,
  );
  const selectedMyDogs: number[] = useSelector(
    (state: RootState) => state.dogs.selectedDogsInfo,
  );

  const mainImage = myDogs.filter(dog => dog.dogIdx === selectedMyDogs[0]);

  const handleSelecting = () => {
    if (isWalking) {
      Alert.alert('', '산책중에는 강아지를 선택할 수 없습니다.');
      return;
    }
    setIsSelecting(true);
  };

  if (myDogs.length === 0) {
    return <Nodog naviDogApply={naviDogApply} />;
  } else if (myDogs.length === 1) {
    return <Profile imageSource={myDogs[0].image} width={70} height={70} />;
  } else {
    return (
      <Pressable onPress={() => handleSelecting()}>
        <View
          style={isSelecting ? styles.selectingContainer : styles.container}>
          <View style={isSelecting ? styles.isSelectingStyle : null}>
            <Profile imageSource={mainImage[0]?.image} width={70} height={70} />
          </View>
          <View style={styles.number}>
            {isSelecting ? (
              <SelectingDogs myDogs={myDogs} setIsSelecting={setIsSelecting} />
            ) : (
              <Text style={styles.textContainer}>+{myDogs?.length - 1}</Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 25,
  },
  selectingContainer: {
    paddingRight: 55,
  },
  isSelectingStyle: {
    opacity: 0.5,
  },
  number: {
    backgroundColor: 'rgba(255, 147, 39, 0.3)',
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  textContainer: {
    color: '#783c00',
    fontSize: 15,
    fontWeight: '900',
  },
});

export default MainDogs;
