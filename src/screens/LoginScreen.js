import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {ScreenHeight, ThemeColors} from '../constants';
import FullButton from '../components/FullButton';
import InputField from '../components/InputField';

const trialMode = true;

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const signIn = () => {
    navigation.navigate('Home');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.note}>Thanks for trying our trial app!</Text>
      </View>
      <View>
        <Image source={require('../assets/avatar-placeholder.png')} />
        <View style={styles.badge}>
          <Text style={styles.badgeNum}>2</Text>
        </View>
      </View>
    </View>
  );

  const renderTrialHeader = () => (
    <View style={styles.trialHeader}>
      <Image
        source={require('../assets/demologo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );

  const renderForm = () => (
    <>
      <KeyboardAvoidingView>
        <InputField
          label="EMAIL"
          value="john@gmail.com"
          placeholder="email address"
          onChange={(val) => {}}
        />
        <InputField
          label="PASSWORD"
          value="1234"
          placeholder="type your password here"
          onChange={(val) => {}}
          isPassword
        />
        <Text style={styles.highlightText}>Forgot Password?</Text>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Text style={styles.signUpText}>
          {'Don’t have an Account? '}
          <Text style={styles.highlightText}>Sign Up</Text>
        </Text>
        <FullButton text="SIGN IN" onPress={signIn} />
      </View>
    </>
  );

  const renderTrialContent = () => (
    <>
      <View>
        <Text style={styles.title}>
          Welcome and thanks for downloading our magazine app!
        </Text>
        <Text style={styles.description}>
          This app will allow you to scan the Augmented Reality elements in the
          magazine. In October, alongside the full launch of the monthly
          discovery box service, we plan to add additional sections and
          functions to this app.
        </Text>
        <Text style={styles.description}>Any feedback is appreciated.</Text>
      </View>
      <View style={styles.footer}>
        <FullButton
          text="CLICK HERE TO SCAN"
          onPress={signIn}
          imageIcon={require('../assets/scanner.png')}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/gradient-background.png')}
        style={styles.background}
        resizeMode="stretch">
        {trialMode ? renderTrialHeader() : renderHeader()}
        <ImageBackground
          source={require('../assets/circle-background.png')}
          style={styles.formContainer}
          resizeMode="cover">
          {trialMode ? renderTrialContent() : renderForm()}
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  logo: {
    width: '80%',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 50,
  },
  trialHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    height: ScreenHeight * 0.35,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: ScreenHeight * 0.35,
    padding: 30,
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  note: {
    fontSize: 15,
    color: ThemeColors.mainYellow,
  },
  badge: {
    backgroundColor: ThemeColors.mainRed,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -6,
    right: -5,
  },
  badgeNum: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
  },
  highlightText: {
    color: ThemeColors.mainRed,
    fontSize: 14,
    marginTop: 10,
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: ThemeColors.mainDark,
    textAlign: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 13,
    color: ThemeColors.mainDark,
  },
  description: {
    fontSize: 16,
    color: ThemeColors.mainDark,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
