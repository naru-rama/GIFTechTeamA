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
                    source={require('../../assets/images/title-archive@x3.png')}
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
        width: 220,
        height: 120,
        resizeMode: 'contain',
        marginRight: 0,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // paddingHorizontal: 10,
        marginTop: 50,
        height: 80,
    },
    backButton: {
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 80,
        marginRight: 20,
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