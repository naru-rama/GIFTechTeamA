import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
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
                            <Text style={styles.modalTitle}>ヒマを追加</Text>
                            <TextInput
                                ref={inputRef}
                                style={styles.modalTextInput}
                                onChangeText={setInputText}
                                value={inputText}
                                // placeholder="👉ここに入力してね👈"
                                placeholderTextColor="#F3D0FF"
                                selectionColor="#F3D0FF"
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async () => {
                                    if (inputText.trim() !== '') {
                                        await addHimaItem(inputText);
                                        
                                    }
                                    onAdd(inputText);
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
        paddingTop: 70,
        paddingBottom: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
        justifyContent: 'center',
    },
    textStyle: {
        color: "#F3D0FF",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTextInput: {
        height: 40, // 適切な高さに調整
        width: '100%', // モーダルの幅に合わせる
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
    },
});

export default AddHimaModal;
