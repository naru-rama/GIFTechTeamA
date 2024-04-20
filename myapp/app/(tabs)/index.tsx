import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import db from '../../utils/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Button } from 'react-native-elements/dist/buttons/Button';


export default function index() {
  // データ追加サンプル
  const addData = async () => {
    console.log("Adding data");
  }

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.buttonWrap}>
        <Button title="データ追加" onPress={addData} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
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
