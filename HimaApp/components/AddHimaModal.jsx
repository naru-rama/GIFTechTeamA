import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Image } from 'react-native';
import { addHimaItem } from '@/actions/HimaActions';

const AddHimaModal = ({ isVisible, onClose, onAdd }) => {
    const [inputText, setInputText] = useState('');
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (isVisible) {
            // モーダルが表示されたらTextInputにフォーカスを当てる
            const timer = setTimeout(() => {
                inputRef.current.focus();
            }, 100); // 小さな遅延を加えるとより信頼性が高まる場合がある
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                onClose();
            }}
        >
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPressOut={onClose}
            >
                <KeyboardAvoidingView
                    style={{
                        width: '100%',
                    }}
                    behavior="position"
                    contentContainerStyle={{
                        marginBottom: 40,
                    }}
                >
                    <View style={styles.modalView}>
                        <View>
                            <Image
                                source={require('../assets/images/top-textbox-title@x3.png')}
                                style={styles.addImage}
                            />
                            <TextInput
                                ref={inputRef}
                                style={styles.modalTextInput}
                                onChangeText={setInputText}
                                value={inputText}
                                placeholderTextColor="#F3D0FF"
                                selectionColor="#F3D0FF"
                                multiline={true}  // 複数行入力を有効に
                                numberOfLines={4} // 表示行数を4行に設定 (オプショナル)
                                textAlignVertical="top" // テキストを上揃えに
                            />

                            <TouchableOpacity
                                style={styles.button}
                                onPress={async () => {
                                    if (inputText.trim() !== '') {
                                        const id = await addHimaItem(inputText);
                                        // console.log('item', item);
                                        onAdd(inputText, id);
                                    }
                                    setInputText('');
                                }}
                            >
                                <Text style={styles.textStyle}>OK</Text>
                            </TouchableOpacity>
                        </View>
                        {/* 小さい三角形 */}
                        <View
                            style={{
                                width: 0,
                                height: 0,
                                borderLeftWidth: 20,
                                borderRightWidth: 20,
                                borderTopWidth: 20,
                                borderLeftColor: 'transparent',
                                borderRightColor: 'transparent',
                                borderTopColor: '#3F7BC3',
                                position: 'relative',
                                top: 50,
                                // right: 20,
                            }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#3F7BC3",
        borderRadius: 70,
        paddingTop: 50,
        paddingBottom: 30,
        alignItems: "center",
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 24,
        color: '#F3D0FF',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#1E64B8",
        width: 150,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },    
    textStyle: {
        color: "#F3D0FF",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalTextInput: {
        height: 50, // 適切な高さに調整
        width: 200, // モーダルの幅に合わせる
        // borderColor: 'gray', // 枠線の色
        // borderWidth: 1, // 枠線の幅
        padding: 10, // 内側のパディング
        // borderRadius: 5, // 入力フィールドの角を丸くする
        marginBottom: 20, // ボタンとの間隔
        // placeHolder を真ん中に
        textAlign: 'center',
        alignSelf: 'center',
        // placeholder の文字の色
        color: '#F3D0FF',
        // カーソルの色
        fontWeight: 'bold',
        fontSize: 16,
    },
    addImage: {
        width: 150,
        height: 120,
        resizeMode: 'contain',
        height: 80,
        alignSelf: 'center',
    },
});

export default AddHimaModal;
