import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifee, { EventType } from '@notifee/react-native';
import { useRouter } from "expo-router";

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



export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    const router = useRouter();
    
    const areYouFreeScenario = async (detail) => {
        switch (detail.pressAction.id) {
            case 'yes':
                console.log('User pressed YES');
                const notiId = await notifee.displayNotification({
                    title: 'いいね〜',
                    android: {
                        channelId: 'orders',
                    },
                    ios: {
                        categoryId: 'response',
                    }
                })
                await notifee.cancelNotification(notiId);
                break;
            case 'soso':
                console.log('User pressed 微妙');
                await notifee.displayNotification({
                    title: 'またね〜',
                    android: {
                        channelId: 'orders',
                    },
                })
                break;
            case 'no':
                console.log('User pressed No');
                await notifee.displayNotification({
                    title: 'またね〜',
                    android: {
                        channelId: 'orders',
                    },
                })
                break;
        }
    }
    
    const messageScenario = async (type, detail, category) => {
        console.log('messageScenario', type, detail, category);
        switch (type) {
            case EventType.DISMISSED:
                console.log('User dismissed notification');
                break;
            case EventType.PRESS:
                if (category === 'summary') {
                    console.log('User pressed notification');
                    // move to home page
                    router.push({
                        pathname: 'home',
                        params: {
                            isCompletedModalVisible: true,
                        },
                    });
                }
                console.log('User pressed notification');
                break;
            case EventType.ACTION_PRESS:
                console.log('User pressed action');
                if (!category) break;
                switch (category) {
                    case 'are-you-free':
                        await areYouFreeScenario(detail);
                        break;
                }
                break;
        }
    }
    useEffect(() => {
        notifee.onForegroundEvent(async ({ type, detail }) => {
            console.log('Foreground event:', type, detail.notification, detail.pressAction);
            const category = detail.notification?.ios?.categoryId;
            if (category && category === 'response') {
                console.log('response');
                return;
            }
            messageScenario(type, detail, category);
            await notifee.cancelNotification(detail.notification.id);
        });
        
        notifee.onBackgroundEvent(async ({type, detail}) => {
            console.log('Background event:', type, detail);
            const { notification, pressAction } = detail;
            const category = notification?.ios?.categoryId;
            if (category && category === 'response') return;
            messageScenario(type, detail, category);
            // Check if the user pressed the "Mark as read" action
                // Remove the notification
            await notifee.cancelNotification(notification.id);
        });
    }, []);

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
                screenOptions={{
                    headerShown: false,
                }}
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
