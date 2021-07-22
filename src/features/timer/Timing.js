import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  const onChangeTimeFunc1=()=>{
    onChangeTime(10)
  }
  const onChangeTimeFunc2=()=>{
    onChangeTime(15)
  }
  const onChangeTimeFunc3=()=>{
    onChangeTime(20)
  }
  

  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton onPress={onChangeTimeFunc1} title="10" size={75} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton onPress={onChangeTimeFunc2} title="15" size={75} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton onPress={onChangeTimeFunc3} title="20" size={75} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});
