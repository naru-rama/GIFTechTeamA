import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import db from '../../utils/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Button } from 'react-native-elements/dist/buttons/Button';
import { addHimaItem, getAllHimaItems, completeHimaItem } from '../../actions/HimaActions';

import { registerForPushNotificationsAsync } from '../../components/NotificationsManager';
import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {

  // const [notification, setNotification] = useState('');
  // const notificationListener = useRef();
  // const responseListener = useRef();

  //Ask for permission to push notification
  // useEffect(() => {
  //   console.log('detected');
  //   registerForPushNotificationsAsync();

  //   //notificationを受け取った通知に設定する
  //   notificationListener.current =
  //   Notifications.addNotificationReceivedListener((notification) => {
  //     console.log("notificationListener", notificationListener.current);
  //     setNotification(notification);
  //   });
    
  //   //アプリがバックグラウンドにあり、ユーザーが通知をクリックした場合の対処方法
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log("responseListener", responseListener.current);
  //       setNotification(response.notification);
  //       console.log(response.notification);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  // データ取得サンプル
  // const getData = async () => {
  //   console.log("Getting data");
  //   const snap = await getDocs(collection(db, "ramen"));
  //   snap.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data().name}`);
  //   });
  // }

  // データ追加サンプル
  const addData = async () => {
    console.log("Adding data");
    const docRef = await addDoc(collection(db, "ramen"), {
      name: "shoyu"
    });
    console.log("Document written with ID: ", docRef.id);
  }
  

  //func to send push notification that is scheduled.
  const scheduleNotificationAsync = async () => {
    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: "4e6a6ac4-eafc-4e80-bea2-2945e504a75c"
    })).data;
    console.log("token", token);
    await Notifications.scheduleNotificationAsync({
      content: {
        body: 'test' // body of the notification
      },
      trigger: {
        seconds: 3, // after 3 seconds
      }
    })
  }

  // プッシュ通知をスケジュールする
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One Hello</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button title="データ取得" onPress={getAllHimaItems} />
      <Button title="データ追加" onPress={() => addHimaItem('暇暇')} />
      <Button title="タスク完了d" onPress={() => completeHimaItem('1sHQBi9fdCcReAFjXcZ9')} />
      {/* send push notification */}
      <Button
        title='3秒後にプッシュ通知する'
        onPress={scheduleNotificationAsync}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
