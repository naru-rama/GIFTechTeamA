import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CompletedModal = ({ isVisible, onClose }) => {
    const options = [
        { key: 'mute1', text: '名前しか知らない人しかいない飲み会に参加する' },
        { key: 'mute2', text: '水泳' },
        { key: 'mute3', text: '50時間以上寝なかったら、世界最速で一周する' },
    ];

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.titleText}>ヒマつぶしたもの</Text>
                    <View style={styles.optionsContainer}>
                        {options.map(option => (
                            <TouchableOpacity key={option.key} style={styles.optionButton}>
                                <Text style={styles.optionText}>{option.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#0000ff',
        borderRadius: 20,
        padding: 20,
    },
    titleText: {
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#0000cc',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default CompletedModal;
