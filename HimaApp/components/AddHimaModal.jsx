import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>ヒマを追加</Text>
                    <TextInput
                        ref={inputRef}
                        style={styles.modalTextInput}
                        onChangeText={setInputText}
                        value={inputText}
                        placeholder="テキストを入力してください"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            await addHimaItem(inputText);
                            onAdd(inputText);
                            setInputText('');
                        }}
                    >
                        <Text style={styles.textStyle}>OK</Text>
                    </TouchableOpacity>
                </View>
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
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 18
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTextInput: {
        height: 40, // 適切な高さに調整
        width: '100%', // モーダルの幅に合わせる
        borderColor: 'gray', // 枠線の色
        borderWidth: 1, // 枠線の幅
        padding: 10, // 内側のパディング
        borderRadius: 5, // 入力フィールドの角を丸くする
        marginBottom: 20, // ボタンとの間隔
    },
});

export default AddHimaModal;
