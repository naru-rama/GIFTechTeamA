import { Link } from 'expo-router';
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import VerticalLine from './VerticalLine';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Link href="himaIndex" asChild>
                <TouchableOpacity style={styles.chip}>
                    <View style={styles.chipItem}>
                        <Text style={styles.emoji}>📔</Text>
                        <Text>ヒマ充電</Text>
                    </View>
                </TouchableOpacity>
            </Link>

            <Link href="himaData" asChild>
                <TouchableOpacity style={styles.chip}>
                    <View style={styles.chipItem}>
                        <Text style={styles.emoji}>🥱</Text>
                        <Text>ヒマデータ</Text>
                    </View>
                </TouchableOpacity>
            </Link>
            
            <VerticalLine />

            <Link href="himaSettings" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.emoji}>💬</Text>
                    <Text>通知設定</Text>
                    {/* <Image source={require('./path-to-your-icon2.png')} style={styles.icon} /> */}
                </TouchableOpacity>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        backgroundColor: '#2A8967',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 40,
        flex: 1, // 100%の高さを取得
        alignItems: 'center',
    },
    button: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 30,
        height: 30,
    },
    emoji: {
        fontSize: 24,
    },
    chip: {
        backgroundColor: '#287A5C',
        padding: 5,
        borderRadius: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 9,
        paddingRight: 12,
    },
    spacer: {
        height: 70, // 任意の高さ
        padding: 10,
    },
    spacerBar: {
        fontSize: 40,
    },
});

export default Footer;

