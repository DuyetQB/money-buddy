import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 100,
      marginTop: 10
    },
    iconLoading: {
      shadowColor: 'black',
      elevation: 5,
      padding: 5,
      alignSelf: 'flex-start',
      backgroundColor: 'white',
      borderRadius: 50,
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84
    }
  })