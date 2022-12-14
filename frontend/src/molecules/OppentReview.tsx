import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Profile from '~/atoms/Profile';
import StaticRating from '~/atoms/StaticRating';
import {reviewerType} from '~/pages/Oppent';

interface Props {
  createdAt: string;
  content: string;
  reviewer: reviewerType;
  starRate: number;
}

function OppentReview({createdAt, content, reviewer, starRate}: Props) {
  const converDate = useCallback((createDate: string) => {
    const result = createDate.split('T')[0].replaceAll('-', '.').slice(2);
    return result;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Profile imageSource={reviewer.profileImage} width={50} height={50} />
        <View style={styles.starContainer}>
          <Text style={styles.nameStyle}>{reviewer.nickname}</Text>
          <View style={styles.subContainer}>
            <StaticRating starRate={starRate} />
            <Text style={styles.dateStyle}>{converDate(createdAt)}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.contentContainer}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    paddingBottom: 15,
    borderColor: 'rgba(0, 0, 0, .3)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  subContainer: {
    marginLeft: 8,
    flexDirection: 'row',
  },
  starContainer: {
    justifyContent: 'space-around',
  },
  nameStyle: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  dateStyle: {
    fontSize: 12,
    marginLeft: 10,
  },
  contentContainer: {
    marginLeft: 5,
    marginTop: 10,
  },
});

export default OppentReview;
