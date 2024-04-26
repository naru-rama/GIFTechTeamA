import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform,
    TouchableOpacity, Keyboard, Image, Modal, FlatList, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { HimaChart } from '../components/HimaChart';
// import { Button } from 'react-native-elements';
import { HistoryButton } from '../components/HimaDataPage/HistoryButton';
import HimaDataPage from '../components/Pages/himaDataPage';

export default function himaData() {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <HimaDataPage />
    );
}
