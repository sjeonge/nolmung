import React from 'react';
import {View, StyleSheet} from 'react-native';
import DetailSubject from '@organisms/DetailSubject';
import DetailDogs from '@organisms/DetailDogs';
import DetailWalk from '@organisms/DetailWalk';
import DetailContent from '@organisms/DetailContent';
import DetailFooter from '@organisms/DetailFooter';
import {DetailProps} from '@pages/CommDetail';

interface Props {
  detailContent: DetailProps;
  isLiked: Boolean;
  putLike: () => void;
  userIdx: number;
  startChat: () => void;
  naviOppent: (oppentIdx: number) => void;
  headMyChat: () => void;
}

function CommDetailTemplate({
  detailContent,
  isLiked,
  putLike,
  userIdx,
  startChat,
  naviOppent,
  headMyChat,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <DetailSubject
          subject={detailContent.subject}
          writer={detailContent.writer}
          writerIdx={detailContent.writerIdx}
          modifyDate={detailContent.modifyDate}
          userImgUrl={detailContent.userImgUrl}
          leadLine={detailContent.leadLine}
          poopBag={detailContent.poopBag}
          naviOppent={naviOppent}
        />
        <DetailDogs dogInfoList={detailContent.dogInfoList} />
        <DetailWalk
          location={detailContent.location}
          walkDate={detailContent.walkDate}
        />
        <DetailContent
          content={detailContent.content}
          photoUrl={detailContent.photoUrl}
        />
      </View>
      <DetailFooter
        categoryType={detailContent.categoryType}
        pay={detailContent.pay}
        isLiked={isLiked}
        putLike={putLike}
        isWriter={detailContent.writerIdx === userIdx}
        startChat={startChat}
        headMyChat={headMyChat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CommDetailTemplate;
