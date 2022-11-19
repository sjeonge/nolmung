import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  name: string;
  btnText: string;
  icon: any;
  onClick: (params?: string) => void;
}

function TabButton({name, btnText, icon, onClick}: Props) {
  return (
    <View style={styles.TabContainer}>
      <Pressable
        onPress={() => {
          onClick(name);
        }}
        style={styles.PressableSpace}>
        <View>{icon}</View>
        <Text style={styles.TextSpace}>{btnText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  TabContainer: {
    flexDirection: 'row',
    height: 40,
    paddingVertical: 2,
    marginVertical: 1,
    alignItems: 'center',
  },
  PressableSpace: {
    flexDirection: 'row',
  },
  TextSpace: {
    height: '100%',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});

export default TabButton;
