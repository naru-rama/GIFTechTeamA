import { StatusBar } from 'expo-status-bar';
import { AppState } from "react-native";
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function Home() {
  const addData = async () => {
    console.log("Adding data");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.buttonWrap}>
        <Button title="データ追加" onPress={addData} />
      </View>

      <View
        style={{
          height: 50,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'red',
          textAlign: 'center',
          alignItems: 'center', // 中央に配置
          justifyContent: 'center', // 中央に配置
        }}
      >
        {/* <Link href="/setup">
          <Icon name="cog" size={30} color="#900" />
          <Text>設定</Text>
        </Link> */}
        <Link href="/himaData">
          <Icon name="cog" size={30} color="#900" />
          <Text>暇データ</Text>
        </Link>
        <Link href="/firebase">
          <Icon name="cog" size={30} color="#900" />
          <Text>firebase</Text>
        </Link>
      </View>
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
