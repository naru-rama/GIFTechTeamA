import React from 'react';
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';

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
        await notifee.setNotificationCategories([
            areYouFree,
            robot,
        ]);
        console.log('setCategories');
    }

    return (
        <View>
            <Button title="Display Notification" onPress={async () => setCategories()} />
        </View>
    );
}