import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { storeToken } from '../actions/HimaActions';
export const setCategories = async function () {
    // get token
    const token = await messaging().getToken();
    console.log(token);
    storeToken(token);
    await notifee.requestPermission()
    const areYouFree = {
        id: 'are-you-free',
        actions: [
            {
                id: 'yes',
                title: 'ヒマよ〜ん🥱',
                foreground: true,
            },
            {
                id: 'soso',
                title: '微妙っ😉',
                foreground: false,
            },
            {
                id: 'no',
                title: '後にして😘',
                foreground: false,
            },
        ],
    };
    const robot = {
        id: 'robot-alert',
        actions: [
            {
                id: 'yes',
                title: 'ヒマデス🤖',
                foreground: true,
            },
            {
                id: 'soso',
                title: 'ポッポー＞🐦',
                foreground: false,
            },
            {
                id: 'no',
                title: '緊急速報、仕事中✌️',
                foreground: false,
            },
        ],
    };
    const scenario3 = {
        id: 'scenario-3',
        actions: [
            {
                id: 'yes',
                title: 'ヒマ🥱',
                foreground: true,
            },
            {
                id: 'soso',
                title: '見ちゃった😾',
                foreground: false,
            },
            {
                id: 'no',
                title: 'ヒマになりたくない🌝',
                foreground: false,
            },
        ],
    };
    const hasAction = {
        id: 'has-action',
        actions: [
            {
                id: 'do-action',
                title: 'ヒマ🥱',
                foreground: true,
            },
            {
                id: 'check-others',
                title: '別のが気になる🤔',
                foreground: true,
            },
            {
                id: 'soso',
                title: 'ヒマだし何もしない🥱',
                foreground: false,
            },
            {
                id: 'no',
                title: 'ヒマじゃない〜🌚',
                foreground: false,
            },
        ],
    };
    await notifee.setNotificationCategories([
        areYouFree,
        robot,
        scenario3,
        hasAction
    ]);
    console.log('setCategories');
}
export default function Notifee() {
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        

        

        // notifee.displayNotification({
        //         title: 'Action',
        //         body: `hey!`,
        //         android: {
        //             channelId: 'orders',
        //         },
        //         ios: {
        //             categoryId: 'are-you-free',
        //         },
        //     });
    }
    const setCategories = async function () {
        // get token
        const token = await messaging().getToken();
        console.log(token);
        await notifee.requestPermission()
        const areYouFree = {
            id: 'are-you-free',
            actions: [
                {
                    id: 'yes',
                    title: 'ヒマよ〜ん🥱',
                    foreground: true,
                },
                {
                    id: 'soso',
                    title: '微妙っ😉',
                    foreground: false,
                },
                {
                    id: 'no',
                    title: '後にして😘',
                    foreground: false,
                },
            ],
        };
        const robot = {
            id: 'robot-alert',
            actions: [
                {
                    id: 'yes',
                    title: 'ヒマデス🤖',
                    foreground: true,
                },
                {
                    id: 'soso',
                    title: 'ポッポー＞🐦',
                    foreground: false,
                },
                {
                    id: 'no',
                    title: '緊急速報、仕事中✌️',
                    foreground: false,
                },
            ],
        };
        const scenario3 = {
            id: 'scenario-3',
            actions: [
                {
                    id: 'yes',
                    title: 'ヒマ🥱',
                    foreground: true,
                },
                {
                    id: 'soso',
                    title: '見ちゃった😾',
                    foreground: false,
                },
                {
                    id: 'no',
                    title: 'ヒマになりたくない🌝',
                    foreground: false,
                },
            ],
        };
        const hasAction = {
            id: 'has-action',
            actions: [
                {
                    id: 'do-action',
                    title: 'ヒマ🥱',
                    foreground: true,
                },
                {
                    id: 'check-others',
                    title: '別のが気になる🤔',
                    foreground: false,
                },
                {
                    id: 'soso',
                    title: 'ヒマだし何もしない🥱',
                    foreground: false,
                },
                {
                    id: 'no',
                    title: 'ヒマじゃない〜🌚',
                    foreground: false,
                },
            ],
        };
        await notifee.setNotificationCategories([
            areYouFree,
            robot,
            scenario3,
            hasAction
        ]);
        console.log('setCategories');
    }

    return (
        <View style={styles.container}>
            <Button title="Display Notification" onPress={async () => setCategories()} >
            <Text>Display Notification</Text>
            </Button>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });