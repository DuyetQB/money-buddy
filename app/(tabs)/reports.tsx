import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, useColorScheme, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ActiveTabs } from '@/components/ActiveTabs';
import { useCallback, useEffect, useState } from 'react';
import { tabsDataFilterChart } from '@/data/tabDate';
import { Colors } from '@/constants/Colors';
import { WINDOW } from '@/constants/Utils';
import * as SQLite from 'expo-sqlite';
import { ThemeColors } from '@/constants/ThemeColors';
import { formattedDate } from '@/utils/date';
import { useSelector } from 'react-redux';
import { requestLisDataTasks } from '@/states/data';
// import EmptyComponent from '@/assets/svg/Empty';
import { PieChart } from '@/components/PieChart';
import { useNavigation } from '@react-navigation/native';
import { dataSelectIncome, dataSelectSpent } from '@/data/select';

const db = SQLite.openDatabaseSync('mydatabase');


export default function ReportsScreen() {

    const [activeTab, setActiveTab] = useState("Spent")
    const theme = useColorScheme() ?? 'light';
    const requestTable = useSelector(requestLisDataTasks);
    const [dataItem, setDataItem] = useState([])

    const handleActiveTab = (e: string) => {
        setActiveTab(e)
    }

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



    const getDataFilterSelect = (key: string) => {
        if (activeTab == 'Spent') return dataSelectSpent.filter((rc: any) => rc.key == key);
        if (activeTab == 'Income') return dataSelectIncome.filter((rc: any) => rc.key == key);
        return []
    }

    const getDataLength = (key: string) => {
        const record = getDataFilterSelect(key);
        const dataCount = dataItem.filter((rc: any) => rc.category == record[0]?.key).length;
        return dataCount
    }
    const getDataLengthOthers = useCallback(() => {
        // const other = ['Cosmetics', 'Daily spent', 'Cloths', 'Electricity bill', 'Diary Products'];
        const otherSpent = ['19', '12', '13', '16'];
        const otherIncome = ['5'];
        const other = activeTab === 'Income' ? otherIncome : activeTab === 'Spent' ? otherSpent : otherSpent;

        const dataCount = dataItem.filter((rc: any) => {
            return other.includes(rc.category)

        }).length;

        return dataCount / dataItem.length
    }, [dataItem])

    const dataPieSpent = [
        { value: getDataLength('11'), label: "Eat & Drink", color: ThemeColors.pinkLight },
        { value: getDataLength('14'), label: "Rents", color: ThemeColors.primary },
        { value: getDataLength('17'), label: "Education", color: ThemeColors.pink },
        { value: getDataLength('20'), label: "Medical", color: ThemeColors.blueLight },
        { value: getDataLength('18'), label: "Travel", color: ThemeColors.blueSea },
        { value: getDataLengthOthers(), label: "Others", color: ThemeColors.yellowThin },
    ];
    const dataPieIncome = [
        { value: getDataLength('1'), label: "Salary", color: ThemeColors.pinkLight },
        { value: getDataLength('2'), label: "Retirement", color: ThemeColors.primary },
        { value: getDataLength('4'), label: "Invest", color: ThemeColors.pink },
        { value: getDataLength('3'), label: "Secondary", color: ThemeColors.blueLight },
        { value: getDataLength('5'), label: "Electricity", color: ThemeColors.blueSea },
        { value: getDataLength('6'), label: "Temporary", color: ThemeColors.yellowThin },

    ];

    const navigation = useNavigation();

    return (
        <ScrollView>
            <ThemedView style={{
                paddingVertical: 70,
                paddingHorizontal: 16,
                height: WINDOW.height
            }}>

                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Reports</ThemedText>
                </ThemedView>
                <ThemedView style={styles.tabContainer}>
                    {tabsDataFilterChart?.map((record) => (
                        <ActiveTabs record={record} key={record.id} activeTab={activeTab} onChange={() => handleActiveTab(record.name)} />
                    ))}
                </ThemedView>
                {dataItem.length === 0 ? null : (
                    <>
                        {activeTab == 'Spent' && (

                            <PieChart dataChart={dataPieSpent} showContent />
                        )}
                        {activeTab == 'Income' && (

                            <PieChart dataChart={dataPieIncome} showContent />
                        )}

                    </>
                )}

                {dataItem.length === 0 && (
                    <>
                        <Image source={require("@/assets/images/not-found-image.png")} style={{
                            width: 400,
                            height: 300
                        }} />
                        <ThemedText style={{ textAlign: 'center', fontWeight: 600 }}>Empty Data</ThemedText>
                    </>

                )}
                <ThemedView style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 40
                }}>
                    <ThemedText style={{ textAlign: 'center', fontWeight: 600, fontSize: 24 }}>Recent</ThemedText>

                    <TouchableOpacity onPress={() => navigation.navigate("recent" as never)}>

                        <Ionicons
                            name={'chevron-forward-outline'}
                            size={25}
                            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                            style={{
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </ThemedView>
                <ScrollView style={{
                    flex: 1,
                    height: '100%'
                }}>

                    {dataItem?.filter((data: any) => {
                        if (activeTab === 'Spent') return data.spent == 1
                        if (activeTab === 'Income') return data.spent == 0
                    })?.map((record: any, index: number) => (
                        <ThemedView style={styles.categoryContainer} key={index}>
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
                                    }}>{record.note}</ThemedText>
                                    <ThemedText style={{
                                        fontWeight: 300,
                                        fontSize: 13
                                    }}>
                                        {formattedDate(new Date(record.date))}
                                    </ThemedText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedText style={{
                                color: `${record.spent === 1 ? 'red' : ThemeColors.primary}`
                            }}>{record.spent === 1 ? '-' : '+'} {record.money} $</ThemedText>
                        </ThemedView>
                    ))}
                </ScrollView>

            </ThemedView>
        </ScrollView>
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
