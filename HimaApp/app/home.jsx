import { StatusBar } from 'expo-status-bar';
import { AppState } from "react-native";
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/Footer';
import { NativeModules } from 'react-native';



export default function Home() {
  const addData = async () => {
    console.log("Adding data");
  }
  const {HimaWidgetModule} = NativeModules;
  const NewModuleButton = () => {
    const onPress = () => {
      console.log('We will invoke the native module here!');
      console.log(NativeModules.HimaWidgetModule);
      HimaWidgetModule.startLiveActivity();
    };
  
    return (
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    );
  };
  const finishButton = () => {
    console.log("finishButton");
    HimaWidgetModule.stopLiveActivity();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.buttonWrap}>
        <Button title="データ追加" onPress={addData} />
      </View>
      <View style={styles.buttonWrap}>
        <Button title="終了" onPress={finishButton} />
      </View>
      <NewModuleButton />

      {/* ここからフッター */}
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
      >
        {Footer()}
      </View>
      {/* ここまでフッター */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonWrap: {
    marginTop: 20,
    width: '100%',  // ボタンの幅を調整
    backgroundColor: 'lightblue',  // ボタンの背景色を設定
    borderRadius: 5,  // ボタンの角を丸くする
    overflow: 'hidden',  // 角丸設定のために必要
  },
});
