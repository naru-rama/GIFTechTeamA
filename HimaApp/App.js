import { StatusBar } from 'expo-status-bar';
import { AppState } from "react-native";
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const [permissions, setPermissions] = useState({});
  const [appState, setAppState] = useState(AppState.currentState);

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
  
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }

  useEffect(() => {
    const fetchToken = async () => {
      requestUserPermission();
      // await messaging().registerDeviceForRemoteMessages();
    };

    fetchToken();
  }, []);

  

  /**
   * By calling this function, notification with category `userAction` will have action buttons
   */
  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Desruptive',
            options: {foreground: true, destructive: true},
          },
          {
            id: 'text',
            title: 'Text Input',
            options: {foreground: true},
            textInput: {buttonTitle: 'Send'},
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    const type = 'notification';
    PushNotificationIOS.addEventListener(type, onRemoteNotification);
    return () => {
      PushNotificationIOS.removeEventListener(type);
    };
  });

  const onRemoteNotification = (notification) => {
    console.log('onRemoteNotification', notification);
    const actionIdentifier = notification.getActionIdentifier();

    if (actionIdentifier === 'open') {
      // Perform action based on open action
    }

    if (actionIdentifier === 'text') {
      // Text that of user input.
      const userText = notification.getUserText();
      // Perform action based on textinput action
    }
    // Use the appropriate result based on what you needed to do for this notification
    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };

  const askPermissions = async () => {
    const permissions = await PushNotificationIOS.requestPermissions();
    setPermissions(permissions);
  }

  const localNotification = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'userAction',
      title: 'Local Notification',
      body: 'This is a local notification',
      identifier: 'local-notification',
      category: 'userAction',
      threadIdentifier: 'local-notification',
      userInfo: { data: 'data' },
      badge: 1,
      sound: 'default',
      fireDate: new Date().getTime() + 3000,
    });
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('Token:', token);
  }

  // フォアグラウンドでのメッセージ受信
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      localNotification();
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  // バックグラウンドでのメッセージ受信
  const onNotificationOpenedApp = async () => {
    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      console.log('On Initial Notification:', notificationOpen);
      // Alert.alert('Initial Notification:', JSON.stringify(notificationOpen));
    }
  }

  // アプリがバックグラウンドからフォアグラウンドに戻った時のメッセージ受信
  const getInitialNotification = async () => {
    const initialNotification = await messaging().getInitialNotification();
    console.log('Get Initial Notification:', initialNotification);
  }

  // Quit状態からのメッセージ受信
  useEffect(() => {
    onNotificationOpenedApp();
  }
  , []);

  // アプリがバックグラウンドからフォアグラウンドに戻った時のメッセージ受信
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("アプリがフォアグラウンドに戻りました！");
        getInitialNotification();
        // 
        // ここに実行したい関数を呼び出す
        //
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Permissions: {JSON.stringify(permissions)}</Text>
      <Button title="Ask Permissions a" onPress={askPermissions} />
      <Button title="Send Local Notification" onPress={localNotification} />
      <Button title="Set Notification Categories" onPress={setNotificationCategories} />
      <Button title="Get Token" onPress={getToken} />
      <StatusBar style="auto" />
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
