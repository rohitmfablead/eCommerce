import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LOGO, SPLASH } from '../assets/image';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      checkLoginStatus();
    }, 2000);

  }, [navigation]);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('loginUser');
      if (userData) {
        navigation.replace('Bottom');
      } else {
        navigation.replace('Register');
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      navigation.replace('RegisterScreen');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={SPLASH} resizeMode="cover">
        <Image source={LOGO} style={styles.logo} />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 335,
    height: 146,
    resizeMode: 'contain',
  },
});
