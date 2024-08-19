import { ThemeColors } from '@/constants/ThemeColors';
import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    containerFlex: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        position: 'relative'
    },
    input: {
        flex: 1,
        padding: 10
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        flexDirection: 'row',
        width: 120,
        shadowColor: 'grey',
        shadowRadius: 10,
        gap: 10
    },
    textButtonEnter: {
        color: '#fff',
        fontWeight: 600
    },
    textLabel: {
        fontWeight: 600,
    },
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
