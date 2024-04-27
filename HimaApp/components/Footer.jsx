import { Link } from 'expo-router';
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import VerticalLine from './VerticalLine';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Link href="himaIndex" asChild
                style={{
                    marginRight: 10,
                }}
            >
                <TouchableOpacity style={styles.chip}>
                    <View style={styles.chipItem}>
                        <Text style={styles.emoji}>📔</Text>
                        <Text style={styles.text}>ヒマ辞典</Text>
                    </View>
                </TouchableOpacity>
            </Link>

            <Link href="himaData" asChild
                style={{
                    marginRight: 22,
                }}
            >
                <TouchableOpacity style={styles.chip}>
                    <View style={styles.chipItem}>
                        <Text style={styles.emoji}>🥱</Text>
                        <Text style={styles.text}>ヒマデータ</Text>
                    </View>
                </TouchableOpacity>
            </Link>

            <VerticalLine />

            <Link href="himaSettings" asChild
                style={{
                    marginLeft: 20,
                }}
            >
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.emoji}>💬</Text>
                    <Text style={styles.text}>通知設定</Text>
                    {/* <Image source={require('./path-to-your-icon2.png')} style={styles.icon} /> */}
                </TouchableOpacity>
            </Link>
            {/* <Link href="notifee" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.emoji}>💬</Text>
                    <Text style={styles.text}>通知設定</Text>
                </TouchableOpacity>
            </Link> */}
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        backgroundColor: '#2A8967',
        // justifyContent: 'space-around',
        paddingVertical: 16,
        // paddingHorizontal: 10,
        paddingLeft: 22,
        paddingBottom: 30,
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
        // padding: 5,
        paddingTop: 6,
        paddingRight: 12,
        paddingBottom: 5,
        paddingLeft: 9,
        borderRadius: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingLeft: 9,
        // paddingRight: 12,
    },
    spacer: {
        height: 70, // 任意の高さ
        padding: 10,
    },
    spacerBar: {
        fontSize: 40,
    },
    text: {
        color: '#FFFFFF', // 文字色を白に設定
        fontWeight: 'bold' // 文字を太く設定
    },
});

export default Footer;

