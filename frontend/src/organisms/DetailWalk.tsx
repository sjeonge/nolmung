import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {convertTime} from '@molecules/CommMainInfo';

const infoWidth = Dimensions.get('window').width * 0.25;

interface DetailWalkProps {
  location: string;
  walkDate: string;
  leadLine: boolean;
  poopBag: boolean;
}

function DetailWalk({location, walkDate, leadLine, poopBag}: DetailWalkProps) {
  let [day, time] = walkDate?.split('T');

  return (
    <View style={styles.container}>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.textCenter}>만남장소</Text>
        <Text style={styles.textCenter}>{location}</Text>
      </View>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.textCenter}>산책 시간</Text>
        <Text style={styles.textCenter}>{day}</Text>
        <Text style={styles.textCenter}>{convertTime(time)}</Text>
      </View>
      <View style={[styles.infoContainer, styles.borderRight]}>
        <Text style={styles.textCenter}>리드줄</Text>
        <Text style={styles.textCenter}>{leadLine ? '유' : '무'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textCenter}>배변봉투</Text>
        <Text style={styles.textCenter}>{poopBag ? '유' : '무'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 6,
    marginTop: 3,
  },
  infoContainer: {
    textAlign: 'center',
    width: infoWidth,
  },
  borderRight: {
    borderRightWidth: 1,
  },
  textCenter: {
    paddingTop: 5,
    textAlign: 'center',
  },
});

export default DetailWalk;
