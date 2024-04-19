import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function App() {
  const [permissions, setPermissions] = useState({});

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

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Permissions: {JSON.stringify(permissions)}</Text>
      <Button title="Ask Permissions" onPress={askPermissions} />
      <Button title="Send Local Notification" onPress={localNotification} />
      <Button title="Set Notification Categories" onPress={setNotificationCategories} />
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
