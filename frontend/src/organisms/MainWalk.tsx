import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MyButton from '~/atoms/MyButton';
import MainDogs from '~/molecules/MainDogs';

function MainWalk() {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
        <MainDogs isSelecting={isSelecting} setIsSelecting={setIsSelecting} />
        <MyButton
          btnText="산책 시작"
          width={isSelecting ? 120 : 200}
          height={50}
          onClick={() => console.log('산책 시작')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  marginContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MainWalk;
