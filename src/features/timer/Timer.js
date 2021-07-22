import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Timing } from './Timing';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubjet,onTimerEnd,clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);
  const [isStarted, setIsStarted] = useState(false);

  const onClearSubjectFunc=()=>{
    clearSubject()
  }

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd()
  };
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const setIsStartedFunc = () => {
    setIsStarted(true);
  };
  const setIsStopedFunc = () => {
    setIsStarted(false);
  };

  const changeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubjet}</Text>
      </View>
      <View style={styles.progressBarView}>
        <ProgressBar progress={progress} style={styles.progressBar} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={setIsStartedFunc} />
        ) : (
          <RoundedButton title="pause" onPress={setIsStopedFunc} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50}  onPress={onClearSubjectFunc}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    color: colors.lighterBlue,
    height: 10,
  },
  progressBarView: {
    paddingTop: spacing.sm,
  },
  clearSubject:{
    paddingBottom:25,
    paddingLeft:25
  }
});
