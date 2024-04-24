import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform,
    TouchableOpacity, Keyboard, Image, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addHimaItem, getAllHimaItems } from '../actions/HimaActions';
import { Picker } from '@react-native-picker/picker';

export default function himaIndex() {
    const [inputText, setInputText] = useState('');
    const [himaItems, setHimaItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchHimaItems = async () => {
            const items = await getAllHimaItems();
            setHimaItems(items);
        };
        fetchHimaItems();
    }, []);

    const handleInputFocus = () => setIsFocused(true);
    const handleInputBlur = () => setIsFocused(false);

    const clearInput = () => {
        setIsFocused(false);
        setInputText('');
        Keyboard.dismiss();
    };

    const handleButtonPress = async () => {
        Keyboard.dismiss();
        if (inputText.trim()) {
            await addHimaItem(inputText.trim());
            const items = await getAllHimaItems();
            setHimaItems(items);
            setShowConfirmation(true);
        }
        clearInput();
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -30 : 0}
        >
            <Modal
                visible={showConfirmation}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowConfirmation(false)}
            >
                <View style={styles.fullScreenContainer}>
                    <View style={styles.chipItem}>
                        <Text style={styles.modalText}>📢</Text>
                        <Text style={styles.modalText}>辞典に追加されたよ〜</Text>
                        <Text style={styles.modalText}>😉</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.okButton}
                        onPress={() => {
                            setShowConfirmation(false);
                        }}
                    >
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Text style={styles.backButtonText}>戻る</Text>
                </TouchableOpacity>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.topImage}
                />
                <View style={styles.registrationCountContainer}>
                    <Text style={styles.registrationLabelText}>登録数</Text>
                    <Text style={styles.registrationCountText}>{himaItems.length}</Text>
                </View>
            </View>

            <View style={styles.inner}>
                <Picker
                    selectedValue={selectedItem}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
                >
                    {himaItems.map((item, index) => (
                        <Picker.Item key={index} label={item.name} value={item.name} />
                    ))}
                </Picker>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused ? { backgroundColor: '#FFFFFF', color: '#1E64B8' } : {}
                        ]}
                        placeholder="テキストを入力してください"
                        placeholderTextColor="#78A3D5"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChangeText={setInputText}
                        value={inputText}
                        fontSize={16}
                        returnKeyType="done"
                    />
                    <TouchableOpacity
                        style={[
                            styles.button,
                            isFocused ? { backgroundColor: '#F2D0FF' } : {}
                        ]}
                        onPress={handleButtonPress}
                    >
                        <Text style={[
                            styles.buttonText,
                            isFocused ? { color: '#1E64B8' } : { color: '#78A3D5' }
                        ]}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E64B8'
    },
    modalText: {
        color: '#F2D0FF',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 20
    },
    okButton: {
        backgroundColor: '#F2D0FF',
        padding: 10,
        borderRadius: 5,
        width: 128,
        height: 39,
    },
    okButtonText: {
        color: '#1E64B8',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#1E64B8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    backButton: {
        padding: 70,
        marginRight: 0,
    },
    registrationText: {
        padding: 60,
        color: '#F2D0FF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButtonText: {
        color: '#F2D0FF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    topImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
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
        height: 50, 
        width: 150,
        color: 'white',
    },
    chipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
    },
});
