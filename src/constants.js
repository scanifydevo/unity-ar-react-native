import {Dimensions} from 'react-native';

export const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get(
  'window',
);

export const ThemeColors = {
  mainDark: '#1B244A',
  mainPurple: '#7C1980',
  mainRed: '#B4004E',
  mainYellow: '#E8B556',
  gradientStart: '#B4004E',
  gradientMiddle: '#860B4D',
  gradientEnd: '#60144C',
  inputBackground: '#F4F4F4',
};

export const defaultShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};
