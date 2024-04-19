import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import db from '../utils/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Button } from 'react-native-elements/dist/buttons/Button';
import { addHimaItem, getAllHimaItems, completeHimaItem } from '../actions/HimaActions';

import { registerForPushNotificationsAsync } from '../components/NotificationsManager';
import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [notification, setNotification] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    console.log('detected');
    registerForPushNotificationsAsync();

    //notificationを受け取った通知に設定する
    notificationListener.current =
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("notificationListener", notificationListener.current);
      setNotification(notification);
    });
    
    //アプリがバックグラウンドにあり、ユーザーが通知をクリックした場合の対処方法
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("responseListener", responseListener.current);
        setNotification(response.notification);
        console.log(response.notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
