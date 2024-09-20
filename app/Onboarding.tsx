import React from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';


export default function OnboardingScreen() {

  const navigation = useNavigation();
  return (
    <Onboarding
      onSkip={() => navigation?.navigate('(tabs)' as never)} // Navigate to Home on skip
      onDone={() => navigation?.navigate('(tabs)' as never)} // Navigate to Home on done
      containerStyles={{
        justifyContent: 'flex-start'
      }}

      pages={[
        {

          backgroundColor: '#fff',
          image: <Image source={require('@/assets/images/onboard-image.png')}
            style={{
              width: "99%",
              height: 400,
              objectFit: 'contain'
            }}
          />,
          title: 'Easy to use',
          subtitle: 'Money buddy is focus on user-friendly functionality and personalized financial insights',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={require('@/assets/images/onboard2.png')}
            style={{
              width: "99%",
              height: 400,
              objectFit: 'contain'
            }} />,
          title: 'Track Your Expenses',
          subtitle: 'Easily manage your finances',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('@/assets/images/setting-image.png')}
            style={{
              width: "99%",
              height: 400,
              objectFit: 'contain'
            }}
          />,
          title: 'Achieve Your Goals',
          subtitle: 'Save and plan for the future',
        },
      ]}
    />
  );
};
