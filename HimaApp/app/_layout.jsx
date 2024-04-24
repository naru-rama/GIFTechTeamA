import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AppState } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifee from '@notifee/react-native';

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

    const localNotification = () => {
        PushNotificationIOS.addNotificationRequest({
            id: 'userAction',
            title: 'Local Notification',
            body: 'This is a local notification',
            identifier: 'local-notification',
            category: 'userAction',
            threadIdentifier: 'local-notification',
            userInfo: { data: 'data' },
            badge: 1,
            sound: 'default',
            fireDate: new Date().getTime() + 3000,
        });
    }

    const [appState, setAppState] = useState(AppState.currentState);
    // フォアグラウンドでのメッセージ受信
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            localNotification();
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    // バックグラウンドでのメッセージ受信
    const onNotificationOpenedApp = async () => {
        const notificationOpen = await messaging().getInitialNotification();
        if (notificationOpen) {
            console.log('On Initial Notification:', notificationOpen);
            // Alert.alert('Initial Notification:', JSON.stringify(notificationOpen));
        }
    }

    // アプリがバックグラウンドからフォアグラウンドに戻った時のメッセージ受信
    const getInitialNotification = async () => {
        const initialNotification = await messaging().getInitialNotification();
        onRemoteNotification(initialNotification);
        console.log('Get Initial Notification:', initialNotification);
    }
    

    const onRemoteNotification = (notification) => {
        console.log('Remote Notification:', notification);
        const isClicked = notification.getData().userInteraction === 1;

        if (isClicked) {
            console.log('User clicked on notification');
            // Navigate user to another screen
        } else {
            // Do something else with push notification
        }
        // Use the appropriate result based on what you needed to do for this notification
        const result = PushNotificationIOS.FetchResult.NoData;
        notification.finish(result);
    };

    // useEffect(() => {
    //     const type = 'notification';
    //     console.log('Add event listener for:', type);
    //     PushNotificationIOS.addEventListener(type, onRemoteNotification);
    //     return () => {
    //         PushNotificationIOS.removeEventListener(type);
    //     };
    // }, []);

    useEffect(() => {
        console.log('Add event listener for:', 'register');
        var res = PushNotificationIOS.addEventListener('register', (token) => {
            console.log('Token:', token);
        });
        console.log('Result:', res);
    }, []);
    const setNotificationCategories = () => {
        PushNotificationIOS.setNotificationCategories([
            {
                id: 'userAction',
                actions: [
                    { id: 'open', title: 'Open', options: { foreground: true } },
                    {
                        id: 'ignore',
                        title: 'Desruptive',
                        options: { foreground: true, destructive: true },
                    },
                    {
                        id: 'text',
                        title: 'Text Input',
                        options: { foreground: true },
                        textInput: { buttonTitle: 'Send' },
                    },
                ],
            },
        ]);
    };
    setNotificationCategories();

    // Quit状態からのメッセージ受信
    useEffect(() => {
        onNotificationOpenedApp();
    }
        , []);

    // アプリがバックグラウンドからフォアグラウンドに戻った時のメッセージ受信
    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === "active") {
                console.log("アプリがフォアグラウンドに戻りました！");
                getInitialNotification();
                // 
                // ここに実行したい関数を呼び出す
                //
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [appState]);


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
