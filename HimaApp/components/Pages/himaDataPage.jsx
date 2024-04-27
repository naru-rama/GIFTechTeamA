import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform,
    TouchableOpacity, Keyboard, Image, Modal, FlatList, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HimaChart } from '../HimaChart';
// import { Button } from 'react-native-elements';
import { HistoryButton } from '../HimaDataPage/HistoryButton';
import { Link } from 'expo-router';

export default function HimaDataPage() {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View
            style={styles.container}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={Platform.OS === "ios" ? -30 : 0}
        >
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

            <View
                style={{
                    width: '90%',
                    alignItems: 'left',
                }}
            >
                <Text style={{
                    color: '#F2D0FF',
                    fontWeight: 'bold',
                    marginBottom: 10,
                }}>今週のヒマ</Text>
            </View>
            <View style={styles.inner}>
                <View style={styles.cardContainer}>
                    <View style={styles.chartContainer}>
                        <HimaChart />
                        {/* Chart can be created using a library like react-native-svg-charts */}
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.summaryContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.emoji}>OK🥱</Text>
                                <Text style={styles.label}>を押した回数</Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.value}>120</Text>
                            </View>
                        </View>
                        <View style={styles.summaryContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.emoji}>微妙🥸</Text>
                                <Text style={styles.label}>を押した回数</Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.value}>60</Text>
                            </View>
                        </View>
                        <View style={styles.summaryContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.emoji}>NO😎</Text>
                                <Text style={styles.label}>を押した回数</Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.value}>48</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text style={{
                            color: '#F3D0FF',
                            fontWeight: 'bold',
                            fontSize: 14
                        }}>原宿さんがヒマそうな時間</Text>
                        <View style={styles.timeRangeBox}>

                            <Text style={[styles.timeRange, {
                                color: '#F3D0FF',
                                fontWeight: 'bold',
                                fontSize: 26,
                            }]}>15:00 ~ 17:00</Text>
                        </View>
                    </View>
                </View>
            </View>
            <HistoryButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#1E64B8',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
    topImage: {
        width: 120,
        // height: 50,
        // marginTop: 70,
        resizeMode: 'contain',
    },
    inner: {
        // flex: 1,
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    // separator: {
    //     marginVertical: 30,
    //     height: 1,
    //     width: '80%',
    // },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 12,
    },
    input: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderColor: 'transparent',
        marginRight: 8,
        backgroundColor: '#3F7BC4',
        borderRadius: 5,
        bottom: 50,
        textAlign: 'center',
        color: 'white',
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#3F7BC4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        bottom: 50,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    item: {
        fontSize: 30,
        height: 30,
        top: 0,
        textAlign: 'center',
        color: '#F2D0FF',
    },
    registrationCountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 70,
        paddingBottom: 0,
    },
    registrationLabelText: {
        color: '#F2D0FF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    registrationCountText: {
        color: '#F2D0FF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    picker: {
        height: 400,
        width: 400,
    },
    chipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
    },
    item: {
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemTextSub: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },

    cardContainer: {
        backgroundColor: '#3F7BC3', // Use the blue background color
        borderRadius: 10, // Rounded corners
        padding: 16, // Spacing inside the card
        width: '90%', // Take up 90% of the screen width
    },
    chartContainer: {
        // Height and other styling for chart
    },
    statsContainer: {
        // width: '90%', // Full width for stats container
        // Layout for stat items
    },
    statItem: {
        flexDirection: 'row', // Layout with icon, value and label horizontally
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'space-between', // Space items evenly
        marginVertical: 8, // Margin for each stat item
    },
    statValue: {
        fontSize: 24, // Larger text for the stat value
        fontWeight: 'bold', // Bold font weight
    },
    footer: {
        marginTop: 16,
        // Styling for the footer
    },
    timeRange: {
        fontSize: 20, // Larger text for the time range
        fontWeight: 'bold', // Bold font weight
    },
    timeRangeBox: {
        backgroundColor: '#1E64B8', // Blue background color
        padding: 8, // Padding inside the box
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Align items in the center
        justifyContent: 'center', // Justify content in the center
        marginTop: 8, // Margin from the top
        height: 80, // Height of the box
    },

    summaryContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#4A90E2',
        borderRadius: 10,
        padding: 0,
        marginVertical: 8,
    },
    labelContainer: {
        width: "30%",
        flexDirection: 'column',
        alignItems: 'left',
    },
    emoji: {
        fontSize: 24, // Adjust size to match the design
        // marginRight: 8, // Space between emoji and text label
        color: '#F3D0FF', // Set the text color to white
        fontWeight: 'bold', // Make the font bold
    },
    label: {
        fontSize: 16,
        color: '#F3D0FF', // Set the text color to white
        fontWeight: 'bold', // Make the font bold
    },
    valueContainer: {
        backgroundColor: '#1E64B8', // Set the background color to white
        width: "65%",
        height: 48,
        
        alignItems: 'center',
        verticalAlign: 'middle',
        borderRadius: 5,
        // center the child elements
        justifyContent: 'center',
        // Optional: Add styling if needed
    },
    value: {
        fontSize: 24,
        color: '#F3D0FF', // Set the text color to white
        fontWeight: 'bold', // Make the font bold
    },
});
