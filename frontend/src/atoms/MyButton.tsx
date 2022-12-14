import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  GestureResponderEvent,
} from 'react-native';
import {MAIN_COLOR} from '../const';

interface Props {
  btnText: string;
  width: number;
  fontWeight?:
    | '600'
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '700'
    | '800'
    | '900'
    | undefined;
  fontSize?: number;
  onClick: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  height?: number;
}

function MyButton({
  btnText,
  width,
  height = 40,
  backgroundColor = MAIN_COLOR,
  fontWeight = '600',
  fontSize = 15,
  onClick,
}: Props) {
  return (
    <View style={styles.btnContainer}>
      <Pressable
        style={[styles.btn, {width, backgroundColor, height}]}
        onPress={onClick}>
        <Text style={[styles.fontStyle, {fontWeight, fontSize}]}>
          {btnText}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 3,
  },
  fontStyle: {
    color: 'white',
    textAlign: 'center',
  },
  btnContainer: {
    alignItems: 'center',
  },
});

export default MyButton;
