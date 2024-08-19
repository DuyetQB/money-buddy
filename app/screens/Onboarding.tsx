import { StyleSheet, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function OnboardingScreen() {
  return (
    <ScrollView>
      <Image source={require('@/assets/images/onboarding-image.png')} style={{ alignSelf: 'center' }} />
      <ThemedText>This app includes example code to help you get started.</ThemedText>
    </ScrollView>
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
});
