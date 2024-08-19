import React, { useState } from 'react'
import { ThemedView } from './ThemedView'
import { Dimensions, StyleSheet, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemeColors } from '@/constants/ThemeColors'

const tabHeaderData = [
    {
        id: 1,
        name: 'Spent'
    },
    {
        id: 2,
        name: 'Income'
    },
]

export const Header = () => {

    const [activeTab, setActiveTab] = useState("Spent")
    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedView style={styles.headerContainer}>
            <ThemedView style={styles.header}>
                {tabHeaderData.map((record) => (
                    <TouchableOpacity style={{
                        backgroundColor: (theme == 'dark' && activeTab == record.name ? ThemeColors.pink : activeTab == record.name ? '#000' : ThemeColors.greenLight),
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                        borderRadius: 6
                    }}

                        key={record.id}
                        onPress={() => setActiveTab(record.name)}
                    >
                        <ThemedText style={{
                            color: activeTab == record.name ? ThemeColors.greenLight : '#000',
                            fontWeight: 600
                        }}>{record.name}</ThemedText>
                    </TouchableOpacity>
                ))}
            </ThemedView>
        </ThemedView>

    )
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
