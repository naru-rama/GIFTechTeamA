import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import db from '../../utils/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Button } from 'react-native-elements/dist/buttons/Button';


export default function TabOneScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One Hello</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button title="データ取得" onPress={getData} />
      <Button title="データ追加" onPress={addData} />
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
