import { ThemeColors } from '@/constants/ThemeColors';
import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    containerContent :{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        position: 'absolute',
        right: 20,
        backgroundColor:'transparent'
    },
    content :{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
         backgroundColor:'transparent'
    },
    radius:{
        width:12,
        height:12,
        borderRadius:9999,
    }
});
