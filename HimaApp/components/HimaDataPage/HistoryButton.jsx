import {TouchableOpacity, Text,View} from 'react-native';
import { Link } from 'expo-router';


export const HistoryButton = () => {
    return (
        <Link href="himaOldData" asChild>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#F3D0FF',
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 70,
                }}
                onPress={() => {
                    
                }}
            >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#F3D0FF',
                            fontWeight: 'bold',
                        }}
                    >過去のヒマ</Text>
            </TouchableOpacity>
        </Link>
    )
}