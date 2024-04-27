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
                <View style={{ width: "90%" }}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    <Text style={styles.titleText}>ヒマつぶしたもの</Text>
                    <View style={styles.optionsContainer}>
                        {options.map(option => (
                            <TouchableOpacity key={option.key} style={styles.optionButton}>
                                <Text style={styles.optionText}>{option.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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
        width: '90%',
        backgroundColor: '#3F7BC3',
        borderRadius: 20,
        padding: 30,
        paddingVertical: 40,
        paddingTop: 60,
    },
    titleText: {
        fontSize: 24,
        color: '#F3D0FF',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#1E64B8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#F3D0FF',
        textAlign: 'left',
    },
    closeButton: {
        // position: 'absolute',
        // top: 10,
        // right: 10,
        backgroundColor: '#3F7BC3',
        width: 30,
        height: 30,
        marginBottom: 10,
        borderRadius: 4,
        marginRight: 10,
        marginLeft: "auto",
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#F3D0FF',
        fontSize: 16,
    },
});

export default CompletedModal;
