import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeColors, defaultShadow} from '../constants';

const FullButton = ({text, onPress, imageIcon}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[
          ThemeColors.gradientStart,
          ThemeColors.gradientMiddle,
          ThemeColors.gradientEnd,
        ]}
        style={styles.container}>
        <Image
          source={imageIcon}
          style={styles.imageIcon}
          resizeMode="contain"
        />
        <Text style={styles.caption}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

FullButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  imageIcon: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.mainRed,
    borderRadius: 10,
    paddingVertical: 6,
    ...defaultShadow,
  },
  caption: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
  imageIcon: {
    width: 31,
    height: 50,
    marginRight: 10,
  },
});

export default FullButton;
