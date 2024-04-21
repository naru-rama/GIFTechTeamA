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

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Link href="/setup">Go to Modal</Link>
      <StatusBar style="auto" />

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
});
