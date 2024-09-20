import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { WINDOW } from '@/constants/Utils';
import * as SQLite from 'expo-sqlite';
import { ThemeColors } from '@/constants/ThemeColors';
import { formattedDate } from '@/utils/date';
import { useSelector } from 'react-redux';
import { requestLisDataTasks } from '@/states/data';
import EmptyComponent from '@/assets/svg/Empty';
import { FlashList } from "@shopify/flash-list";
import { Stack } from 'expo-router';


const db = SQLite.openDatabaseSync('mydatabase');

export default function RecentScreen() {


    const theme = useColorScheme() ?? 'light';
    const requestTable = useSelector(requestLisDataTasks);
    const [dataItem, setDataItem] = useState([])

    const getTable = useCallback(async () => {
        const allRows: any = await db.getAllAsync('SELECT * FROM dataTask');
        setDataItem(allRows || [])
    }, [db])

    useEffect(() => {
        getTable();

    }, [db])

    useEffect(() => {
        if (requestTable && requestTable.money !== 0) {
            setDataItem((prev): any => [...prev, requestTable])
        }
        else {
            setDataItem([])
        }
    }, [requestTable])



    return (
        <ThemedView style={{
            flex: 1
        }}>
            <Stack.Screen options={{ title: '', headerBackTitle: 'Back' }} />
            <ThemedView style={{
                paddingVertical: 40,
                paddingHorizontal: 16,
                height: WINDOW.height - 70,
                marginBottom: 30
            }}>

                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Recent</ThemedText>
                </ThemedView>

                {dataItem.length === 0 && (
                    <>
                        <EmptyComponent />
                        <ThemedText style={{ textAlign: 'center', fontWeight: 600 }}>Empty Data</ThemedText>
                    </>

                )}
                <FlashList
                    data={dataItem}
                    estimatedItemSize={30}
                    renderItem={({ item }: { item: any }) => (
                        <ThemedView style={styles.categoryContainer}>
                            <ThemedView style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 20
                            }}>
                                <Ionicons
                                    name={'logo-bitcoin'}
                                    size={38}
                                    color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                                />
                                <ThemedView>
                                    <ThemedText style={{
                                        fontWeight: 500,
                                        fontSize: 20
                                    }}>{item.note}</ThemedText>
                                    <ThemedText style={{
                                        fontWeight: 300,
                                        fontSize: 13
                                    }}>
                                        {formattedDate(new Date(item.date))}
                                    </ThemedText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedText style={{
                                color: `${item.spent === 1 ? 'red' : ThemeColors.primary}`
                            }}>{item.spent === 1 ? '-' : '+'} {item.money} $</ThemedText>
                        </ThemedView>
                    )}
                />

            </ThemedView>
        </ThemedView>
    );
}


const styles = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },

    tabContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 9,
        marginTop: 40
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    buttonEnter: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: ThemeColors.primary,
        borderRadius: 12,
        marginVertical: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        shadowColor: 'grey',
        shadowRadius: 10
    },
    textButtonEnter: {
        color: '#fff',
        fontWeight: 600
    },

});
