import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Alert, useColorScheme } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemeColors } from '@/constants/ThemeColors';
// import SwitchButton from '@/components/SwitchButton';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import LoadingIcon from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import { ExternalLink } from '@/components/ExternalLink';
import { setResetAllDataTasks } from '@/states/data';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '@/libs/ToastNotify/ToastManager';

const db = SQLite.openDatabaseSync('mydatabase');

export default function SettingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const resetTable = async () => {
    try {
      setIsLoading(true);
      // startRotation(true)
      await db.withExclusiveTransactionAsync(async (tx) => {
        await db.execAsync(`
         DELETE FROM dataTask;
        `).finally(() => {
          setIsLoading(false);
          dispatch(setResetAllDataTasks())
          // startRotation(false)
        });

      });

      showToast({
        type: 'success',
        title: 'Delete all data success',
        description: ''
      })
    } catch (error: any) {
      Alert.alert('Error', error)
    }

  };



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>

      <ThemedView style={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center'
      }}>
        <TouchableOpacity style={styles.buttonEnter}
          onPress={resetTable}
        >
          {isLoading ? <LoadingIcon /> : <Ionicons size={20} name="refresh" color={'#fff'} />}
          <ThemedText style={styles.textButtonEnter}>Reset data</ThemedText>

        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            paddingVertical: 10,
            borderBottomColor: ThemeColors.greenLight,
            gap: 10
          }}
        >
          <ThemedText style={{
            fontWeight: 600
          }}>Dark Mode</ThemedText>
          <SwitchButton />
        </TouchableOpacity> */}
        <ThemedView style={{
          flex: 1,
          // width:width
        }}>

          <ThemedView
            style={{
              marginVertical: 20,
              borderBottomColor: ThemeColors.greenLight,
              borderBottomWidth: 1,
              paddingVertical: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >

            <ExternalLink href="https://lenodev.com/privacy-policy"

            >
              <ThemedText style={{
                fontWeight: 600
              }}>Privacy Policy</ThemedText>
            </ExternalLink>
            <ExternalLink href="https://lenodev.com/privacy-policy"

            >
              <Ionicons
                name={'chevron-forward-outline'}
                size={18}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{
                  alignSelf: 'flex-end'
                }}
              />
            </ExternalLink>
          </ThemedView>


          <TouchableOpacity
            onPress={() => navigation.navigate("about-app" as never)}
          >
            <ThemedView
              style={{
                marginVertical: 20,
                borderBottomColor: ThemeColors.greenLight,
                borderBottomWidth: 1,
                paddingVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >

              <ThemedText style={{
                fontWeight: 600
              }}>About App</ThemedText>


              <Ionicons
                name={'chevron-forward-outline'}
                size={18}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{
                  alignSelf: 'flex-end'
                }}
              />

            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonEnter: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: ThemeColors.primary,
    borderRadius: 12,
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // width: 120,
    shadowColor: 'grey',
    shadowRadius: 10,
    gap: 10
  },
  textButtonEnter: {
    color: '#fff',
    fontWeight: 600
  },
});
