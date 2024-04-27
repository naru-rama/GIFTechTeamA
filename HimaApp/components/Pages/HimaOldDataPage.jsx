import HimaOldData from './HimaOldDataComponent';
import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function HimaOldDataPage() {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View
            style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#1E64B8',
            }}
        >
            {/* Header */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Text style={styles.backButtonText}>戻る</Text>
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.topImage}
                />
                <View style={styles.registrationCountContainer}>
                    {/* <Text style={styles.registrationLabelText}>登録数</Text>
                    <Text style={styles.registrationCountText}>{himaItems.length}</Text> */}
                </View>
            </View>
            <HimaOldData />
        </View>
    );
}

const styles = StyleSheet.create({
    lightBlueContainer: {
        flexDirection: 'row',
        // even
        marginTop: 10,
        backgroundColor: '#3F7BC3',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    topImage: {
        width: 120,
        // height: 50,
        // marginTop: 70,
        resizeMode: 'contain',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // paddingHorizontal: 10,
        marginTop: 50,
    },
    backButton: {
        padding: 70,
        paddingTop: 0,
        paddingBottom: 0,
        marginRight: 0,
        // 高さ中央揃え
        alignItems: 'center',
    },

    backButtonText: {
        color: '#F2D0FF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registrationCountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 70,
        paddingBottom: 0,
    },
});