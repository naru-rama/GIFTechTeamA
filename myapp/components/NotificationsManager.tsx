import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
//let user allow or dont allow the app to send push notifications(Access権限)
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  /*later TODO: realted to token. NEED FOR FIREBASE CONSOLE PUSH NOTIFICATIONS
  let token: string | undefined;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  
  // ここでトークンをサーバーに送るなどの処理を行う
  
  return token;*/
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) { return }

  await Notifications.requestPermissionsAsync();
}
