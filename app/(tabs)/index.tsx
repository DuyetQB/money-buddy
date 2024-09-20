import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Button, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { WINDOW } from '@/constants/Utils';
import Form from '@/components/Form';
import { tabsDataFilterChart } from '@/data/tabDate';
import { ActiveTabs } from '@/components/ActiveTabs';
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function HomeScreen() {

  const [activeTab, setActiveTab] = useState("Spent")

  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ScrollView
    >
      <ThemedView style={{
        paddingHorizontal: 16,
        paddingVertical: 70,
        height: WINDOW.height,
        display: 'flex',
        gap: 20
      }}>
        <ThemedView style={styles.tabContainer}>
          {tabsDataFilterChart?.map((record) => (
            <ActiveTabs record={record} key={record.id} activeTab={activeTab} onChange={() => setActiveTab(record.name)} />
          ))}

        </ThemedView>
        {/* <Button title="Display Notification" onPress={async () => await schedulePushNotification()} /> */}
        <Form type={activeTab} />
      </ThemedView>
    </ScrollView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
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
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}


const styles = StyleSheet.create({

  headerContainer: {
    color: '#808080',
    top: 60,
    width: Dimensions.get("window").width,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,

  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 9,
    marginTop: 0
  },
  header: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e9eff6',
    borderRadius: 6

  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  text: {
    color: 'white'
  }
});
