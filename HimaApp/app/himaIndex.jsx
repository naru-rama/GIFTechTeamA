import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform,
    TouchableOpacity, Keyboard, Image, Modal, FlatList, Animated, ImageBackground, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addHimaItem, getAllHimaItems, completeHimaItem } from '../actions/HimaActions';
import { useLocalSearchParams } from 'expo-router';

export default function himaIndex() {
    const { id } = useLocalSearchParams();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [inputText, setInputText] = useState('');
    const [himaItems, setHimaItems] = useState([]);
    const [itemHeightList, setItemHeightList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);
    const [hideConfirmationUI, setHideConfirmationUI] = useState(false);
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const getItemHeight = (index) => {
        if (itemHeightList[index] !== undefined) return itemHeightList[index];
        return 0;
    };
    const getItemOffset = (index) => {
        if (itemHeightList[index] === undefined) return 0;
        let data = itemHeightList.slice(0, index).reduce((a, c) => a + c, 0);
        return data;
    };

    useEffect(() => {
        const fetchHimaItems = async () => {
            const items = await getAllHimaItems();
            console.log('items', items);
            setHimaItems(items);
        };
        fetchHimaItems();
    }, []);

    useEffect(() => {
        if (himaItems.length == 0 || (himaItems.length != itemHeightList.length)) return;
        if (id) {
            const index = himaItems.findIndex(item => item.id === id);
            setSelectedItem(himaItems[index]);
            flatListRef.current?.scrollToIndex({
                index: index,
                    viewPosition: 0,
                    animated: true,
            });
        }
    }, [itemHeightList]);
    // useEffect(() => {
    //     if (id) {
    //         // 該当のIDのアイテムのindexを取得
    //         const index = scrollHimaItems.findIndex(item => item.id === id);
    //         // if (index == -1) {
    //         //     console.log('Not found');
    //         //     return;
    //         // };
    //         flatListRef.current?.scrollToEnd({
    //             index: index,
    //             viewPosition: 0.5,
    //         });
    //     }
    // }, [id]);

    useEffect(() => {
        if (!showConfirmation && himaItems.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [showConfirmation]);

    useEffect(() => {
        if (showSpeechBubble) {
            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    setShowSpeechBubble(false);
                    fadeAnim.setValue(1);
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showSpeechBubble]);

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

    const getColorByCount = (count) => {
        if (count <= 3) {
            return '#F2D0FF';
        } else if (count <= 10) {
            return '#55FFE0';
        } else if (count <= 20) {
            return '#FF9C64';
        } else {
            return '#FCFE5C';
        }
    };

    const setText = (doneCount) => {
        if (doneCount == 0) {
            return '◯ ◯ ◯';
        }
        else if (doneCount == 1) {
            return '🤓 ◯ ◯';
        } else if (doneCount == 2) {
            return '🤓 🤓 ◯';
        } else if (doneCount == 3) {
            return '🤓 🤓 🤓';
        } else {
            return '🤓 × ' + doneCount;
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItem && (selectedItem.id === item.id);

        return (
            <View
                style={{
                    width: '100%',
                    // justifyContent: ',
                    alignItems: 'center',
                }}
            >
                {isSelected && !hideConfirmationUI && (
                    <ImageBackground source={require('../assets/images/confirmationbubble.png')} style={styles.image}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.confirmationButton}
                                onPress={async () => {
                                    await completeHimaItem(item.id);
                                    const updatedItems = await getAllHimaItems();
                                    setHimaItems(updatedItems);
                                    setHideConfirmationUI(true);
                                }}>
                                <Text style={styles.confirmationButtonText}>OK🥱</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmationButton} onPress={() => setHideConfirmationUI(true)}>
                                <Text style={styles.confirmationButtonText}>NO😎</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                )}
                <TouchableOpacity
                    onPress={() => {
                        setSelectedItem(item);
                        setHideConfirmationUI(false);
                    }}
                    style={styles.item}
                    onLayout={obj => {
                        const height = obj.nativeEvent?.layout?.height;
                        if (!height) return;

                        setItemHeightList((prevData) => {
                            return [...prevData, height];
                        });
                    }}
                >
                    <Text style={[
                        styles.itemText,
                        { color: isSelected ? getColorByCount(item.doneCount) : '#F2D0FF' }
                    ]}>
                        {item.name}
                    </Text>
                    {isSelected && (
                        <Text style={[
                            styles.itemTextSub,
                            { color: getColorByCount(item.doneCount) }
                        ]}>
                            {setText(item.doneCount)}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    const handleScroll = () => {
        if (isFirstRender) return;
        console.log('scroll');
        setSelectedItem(null);
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
                            setShowSpeechBubble(true);
                        }}
                    >
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {showSpeechBubble && (
                <Animated.Image
                    source={require('../assets/images/speechbubble.png')}
                    style={[styles.speechBubble, { opacity: fadeAnim }]}
                />
            )}
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
                <FlatList
                    ref={flatListRef}
                    data={himaItems}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.list}
                    onScroll={handleScroll}
                    getItemLayout={(data, index) => ({
                        length: getItemHeight(index),
                        offset: getItemOffset(index),
                        index,
                    })}
                    onMomentumScrollEnd={() => {
                        setIsFirstRender(false);
                    }}
                // getItemLayout={(data, index) => (
                //     { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                // )}
                // onEndReached={() => {
                //     console.log('onEndReached');
                //     setScrollHimaItems(prevItems => [...prevItems, ...himaItems]);
                // }}
                // onEndReachedThreshold={1}
                // onStartReached={() => {
                //     setScrollHimaItems(prevItems => [...himaItems, ...prevItems]);
                //     }
                // }
                />
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
    list: {
        top: -60,
        height: 300,
    },
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
        position: 'relative',
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
        marginTop: 10,
        fontWeight: 'bold',
    },
    speechBubble: {
        position: 'absolute',
        bottom: 200,
        width: 118,
        height: 37,
    },
    image: {
        width: 274,
        height: 107,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        // top: 10
    },
    confirmationButton: {
        backgroundColor: '#1E64B8',
        padding: 10,
        borderRadius: 5,
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmationButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
