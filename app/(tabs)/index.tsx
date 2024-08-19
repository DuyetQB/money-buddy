import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { WINDOW } from '@/constants/Utils';
import Form from '@/components/Form';
import { tabsDataFilterChart } from '@/data/tabDate';
import { ActiveTabs } from '@/components/ActiveTabs';

export default function HomeScreen() {

  const [activeTab, setActiveTab] = useState("Spent")

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
        <Form type={activeTab} />
      </ThemedView>
    </ScrollView>
  );
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
