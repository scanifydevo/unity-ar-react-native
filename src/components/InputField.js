import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {ThemeColors} from '../constants';

AntIcon.loadFont();

const InputField = ({label, value, placeholder, onChange, isPassword}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          style={styles.input}
          placeholderTextColor={ThemeColors.mainDark}
          placeholderStyle={styles.placeholderStyle}
          secureTextEntry={isPassword}
        />
        <AntIcon name="check" style={styles.checkIcon} />
      </View>
    </View>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isPassword: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: ThemeColors.mainDark,
    fontWeight: '500',
    marginBottom: 11,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: ThemeColors.inputBackground,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: 'Effra-Regular',
    letterSpacing: 1,
    color: ThemeColors.mainDark,
  },
  placeholderStyle: {
    color: ThemeColors.mainDark,
    fontSize: 14,
  },
  checkIcon: {
    color: ThemeColors.mainRed,
    fontSize: 14,
    position: 'absolute',
    right: 18,
  },
});

export default InputField;
