import React, {useEffect} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  });

  return (
    <ImageBackground
      source={require('../assets/Rectangle.png')}
      resizeMode="stretch"
      style={styles.background}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={[
          styles.background,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Image
          source={require('../assets/demologo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.footer}>
          {/* <Text style={styles.description}>
            TRIAL APP: FULL LAUNCH OCT 2020
          </Text> */}
          <Text style={styles.url}>www.foragerskitchen.co.uk</Text>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    width: '80%',
    marginBottom: '20%',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    letterSpacing: 2,
  },
  url: {
    fontSize: 14,
    color: '#E8B556',
    marginTop: 10,
    letterSpacing: 2,
  },
});

export default SplashScreen;
