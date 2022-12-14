import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import MainPost from '~/molecules/MainPost';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '~/../AppInner';
import {MAIN_COLOR} from '~/const';

type mainScreenProp = NativeStackNavigationProp<LoggedInParamList, 'Main'>;

interface Props {
  mainPostList: any[];
}

function MainPosts({mainPostList}: Props) {
  const navigation = useNavigation<mainScreenProp>();
  const [mainPostPgNum, setMainPgNum] = useState(0);
  const onchange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.x) {
      setMainPgNum(1);
    } else {
      setMainPgNum(0);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>실시간 게시글</Text>
        <Text
          style={styles.naviTextContainer}
          onPress={() => navigation.navigate('CommunityList')}>
          전체보기
        </Text>
      </View>
      <ScrollView
        onScroll={onchange}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal>
        {mainPostList.map((mainPosts, idx) => {
          return (
            <MainPost
              key={idx}
              mainPosts={mainPosts}
              mainPostPgNum={mainPostPgNum}
            />
          );
        })}
      </ScrollView>
      <View style={styles.wrapDot}>
        <Text style={mainPostPgNum === 0 ? styles.dotActive : styles.dot}>
          ●
        </Text>
        <Text style={mainPostPgNum === 1 ? styles.dotActive : styles.dot}>
          ●
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 7,
    marginTop: 2,
    backgroundColor: 'white',
  },
  headingText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  wrapDot: {
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 5,
  },
  dotActive: {
    margin: 3,
    color: MAIN_COLOR,
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  naviTextContainer: {
    fontSize: 12,
  },
});

export default MainPosts;
