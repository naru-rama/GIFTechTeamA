import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import db from '../utils/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { addHimaItem, getAllHimaItems, completeHimaItem } from '../actions/HimaActions';

export default function FireBaseAction() {
  // プッシュ通知をスケジュールする
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One Hello</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="データ取得" onPress={getAllHimaItems} />
      <Button title="データ追加" onPress={() => addHimaItem('暇暇')} />
      <Button title="タスク完了" onPress={() => completeHimaItem('1sHQBi9fdCcReAFjXcZ9')} />
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
