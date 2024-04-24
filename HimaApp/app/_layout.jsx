import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifee, { EventType } from '@notifee/react-native';

import { useEffect, useRef, useState } from 'react';

import { useColorScheme } from '../components/useColorScheme';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

notifee.onForegroundEvent(({ type, detail }) => {
    console.log('Foreground event:', type, detail.notification, detail.pressAction);
    switch (type) {
        case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
        case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            break;
        case EventType.ACTION_PRESS:
            console.log('User pressed action', detail.pressAction);
            break;
    }
});

notifee.onBackgroundEvent(async (data) => {
    console.log('Background event:', data);
    const { notification, pressAction } = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'view-post') {
        console.log('User pressed "Mark as read" action');
        // Update external API
        // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
        //     method: 'POST',
        // });

        // Remove the notification
        await notifee.cancelNotification(notification.id);
    }
});

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });


    async function setCategories() {
        await notifee.setNotificationCategories([
            {
                id: 'message',
                actions: [
                    {
                        id: 'view-post',
                        title: 'View post',
                        foreground: true,
                    },
                    {
                        id: 'delete-chat',
                        title: 'Delete chat',
                        destructive: true,
                        // Only show if device is unlocked
                        authenticationRequired: true,
                    },
                ],
            },
        ]);
    }

    function onMessageReceived(message) {
        console.log('Received a message', message);
        const { type, text } = message.data;

        if (type === 'order_shipped') {
            // notifee.displayNotification({
            //     title: 'Your order has been shipped',
            //     body: `Your order was shipped at ${text}!`,
            //     android: {
            //         channelId: 'orders',
            //     },
            // });
            notifee.displayNotification({
                title: 'Action',
                body: `hey!`,
                android: {
                    channelId: 'orders',
                },
                ios: {
                    categoryId: 'message',
                },
            });
        }
    }

    useEffect(() => {

        messaging().onMessage(message => {
            console.log('on message');
            onMessageReceived(message);
        });
        messaging().setBackgroundMessageHandler(message => {
            console.log('on background message');
            onMessageReceived(message);
        });
    }, []);


    const [loading, setLoading] = useState(true);

    // Bootstrap sequence function
    async function bootstrap() {
        const initialNotification = await notifee.getInitialNotification();

        if (initialNotification) {
            console.log('Notification caused application to open', initialNotification.notification);
            console.log('Press action used to open the app', initialNotification.pressAction);
        }
    }

    useEffect(() => {
        bootstrap()
            .then(() => setLoading(false))
            .catch(console.error);
    }, []);


    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={DefaultTheme}>
            <Stack
            // screenOptions={{
            //     headerShown: false,
            // }}
            >

                {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="himaData" />
                <Stack.Screen name="himaIndex" />
                <Stack.Screen name="setup" />
                <Stack.Screen name="firebase" />
            </Stack>
        </ThemeProvider>
    );
}
