// import { registerRootComponent } from 'expo';

// import App from './App';


// import messaging from '@react-native-firebase/messaging';

// // // Handle background messages using setBackgroundMessageHandler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

// // // Check if app was launched in the background and conditionally render null if so
// function HeadlessCheck({ isHeadless }) {
//     if (isHeadless) {
//         // App has been launched in the background by iOS, ignore
//         console.log('App launched in the background by iOS');
//         return null;
//     }

//     console.log('App launched in the foreground');
//   // Render the app component on foreground launch
//     return <App />;
// }

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App, () => HeadlessCheck);
