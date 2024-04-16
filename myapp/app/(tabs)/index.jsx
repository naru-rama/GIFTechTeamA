import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import db from '../../utils/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Button } from 'react-native-elements/dist/buttons/Button';

import { registerForPushNotificationsAsync } from '../../components/NotificationsManager';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {

  //Ask for permission to push notification
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // データ取得サンプル
  const getData = async () => {
    console.log("Getting data");
    const snap = await getDocs(collection(db, "ramen"));
    snap.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
    });
  }

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
      <Button title="データ取得" onPress={getData} />
      <Button title="データ追加" onPress={addData} />
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
