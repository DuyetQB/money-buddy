import { TouchableOpacity } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { tabsDateFilterChartType } from '@/types/tabDate';


type ActiveTabType = {
    record: tabsDateFilterChartType,
    activeTab: string,
    onChange: (e: any) => void
}
export function ActiveTabs({
    record,
    activeTab,
    onChange
}: ActiveTabType) {

    return (
        <ThemedView style={{
            backgroundColor: `${activeTab == record.name ? '#fff' : '#000'}`,
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: activeTab == record.name ? 7 : 0,
            flex: 1,
            alignItems:"center",
            shadowColor:'#000',
            margin:5
        }}>
            <TouchableOpacity onPress={onChange}>
                <ThemedText style={{
                    color: `${activeTab == record.name ? '#000' : '#fff'}`,
                    fontWeight: 500
                }}>{record.name}</ThemedText>
            </TouchableOpacity>
        </ThemedView>

    );
}

