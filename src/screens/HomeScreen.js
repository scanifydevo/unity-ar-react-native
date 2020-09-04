import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import ScreenOrientation, {
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker/ScreenOrientation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import UnityView, {UnityModule} from '@asmadsen/react-native-unity-view';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import KeepAwake from 'react-native-keep-awake';
import {ThemeColors, ScreenHeight, ScreenWidth} from '../constants';

const videoLinks = [
  'https://player.vimeo.com/external/443748292.hd.mp4?s=ce1514ad91a583558d056efeb7233c5f786e7548&profile_id=174',
  'https://player.vimeo.com/external/448711147.hd.mp4?s=8582017aaa94409b5739a9f3bd87d465dedf36d4&profile_id=174',
  'https://player.vimeo.com/external/450125095.hd.mp4?s=7e7feb1368ad91fbda5c9ff22711c748124662d5&profile_id=175',
  'https://player.vimeo.com/external/450125050.hd.mp4?s=fe67211717022b6a39b92de45349818a60516b3f&profile_id=175',
  'https://player.vimeo.com/external/449647544.hd.mp4?s=f6e33293bc268fb4ca8b6810b775e86231fba927&profile_id=175',
  'https://player.vimeo.com/external/450125108.hd.mp4?s=ff435c902d07c8fdcd3776d43292650913a9189d&profile_id=175',
  'https://player.vimeo.com/external/450139499.hd.mp4?s=ca541a79a618a3ef43e8f04bcad465382619d59f&profile_id=175',
  'https://vimeo.com/330750257',
  'https://player.vimeo.com/external/450153256.hd.mp4?s=7ae4033a7e38c456e4d58bacf6eae2e54d3a11eb&profile_id=175',
  'https://player.vimeo.com/external/450156686.hd.mp4?s=5d1f368a948b04ef26f2f4822c74dac6ec8f25fc&profile_id=175',
  'https://player.vimeo.com/external/450445631.hd.mp4?s=e4e588189130a95d8a868812995304c39a818821&profile_id=175',
];

const HomeScreen = () => {
  const [locked, setLocked] = useState(false);
  const [anchorFound, setAnchorFound] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  const [detectedIndex, setDetectedIndex] = useState(0);
  const videoRef = useRef(null);
  const playback = useRef(null);
  const navigation = useNavigation();

  const sendMessageToUnity = (string) => {
    UnityModule.postMessageToUnityManager(string);
    UnityModule.postMessage('UnityMessageManager', 'toggleVideoPlay', string);
  };

  const goBack = () => {
    sendMessageToUnity('stop');
    UnityModule.pause();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const goToFullScreen = () => {
    console.log(playback.current);
    setPaused(true);
    sendMessageToUnity('pause');
    setVideoFullScreen(true);
  };

  const exitFullScreen = () => {
    console.log(playback.current);
    setVideoFullScreen(false);
    sendMessageToUnity('play' + detectedIndex);
    setPaused(false);
  };

  // const onOrientationDidChange = (orientation) => {
  //   if (orientation === 'LANDSCAPE-RIGHT') {
  //     Orientation.lockToLandscapeRight();
  //     setLocked(true);
  //   } else if (orientation === 'LANDSCAPE-LEFT') {
  //     Orientation.lockToLandscapeLeft();
  //     setLocked(true);
  //   }
  // };

  useEffect(() => {
    if (UnityModule.isReady()) {
      UnityModule.resume();
    }
  }, []);

  const renderRectangle = () =>
    !anchorFound && (
      <>
        <Image
          source={require('../assets/topbar.png')}
          style={styles.scanBarTop}
          resizeMode="stretch"
        />
        <Image
          source={require('../assets/bottombar.png')}
          style={styles.scanBarBottom}
          resizeMode="stretch"
        />
      </>
    );

  const renderToolBar = () =>
    anchorFound ? (
      <View style={styles.toolBar}>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.toolButton} onPress={goBack}>
            <AntIcon name="close" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => {
              sendMessageToUnity(paused ? 'play' + detectedIndex : 'pause');
              setPaused(!paused);
            }}>
            <AntIcon name={paused ? 'play' : 'pause'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={goToFullScreen}>
            <Image
              source={require('../assets/fullscreen.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.toolBar}>
        <TouchableOpacity style={styles.toolButton} onPress={goBack}>
          <AntIcon name="close" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          <Text style={styles.scanLabel}>Scan the target</Text>
          <Image
            source={require('../assets/scanIcon.png')}
            style={styles.toolButton}
          />
        </View>
      </View>
    );

  const recevieMessageFromUnity = (message) => {
    if (message && message.includes('found')) {
      const index = message.split('found')[1];
      setDetectedIndex(+index);
      setAnchorFound(true);
      setPaused(false);
    } else {
      setAnchorFound(false);
    }
  };

  return (
    <>
      <ScreenOrientation orientation={LANDSCAPE} />
      <UnityView
        style={styles.unityViewStyle}
        onUnityMessage={recevieMessageFromUnity}
        onMessage={recevieMessageFromUnity}
      />
      {/* {locked && (
        <ImageBackground
          style={styles.container}
          source={require('../assets/blur-background.png')}>
          <Image source={require('../assets/rotate-phone.png')} />
          <Text style={styles.description}>
            Please rotate your camera to operate the scanner!
          </Text>
        </ImageBackground>
      )} */}
      <View style={styles.scanContainer}>
        {renderToolBar()}
        {renderRectangle()}
      </View>
      {videoFullScreen && (
        <>
          <KeepAwake />
          <Video
            source={{
              uri: videoLinks[detectedIndex],
            }} // Can be a URL or a local file.
            ref={videoRef} // Store reference
            // onBuffer={this.onBuffer} // Callback when remote video is buffering
            // onError={this.videoError} // Callback when video cannot be loaded
            // onLoad={() => {
            //   videoRef.current.seek(playback.current);
            // }}
            style={styles.backgroundVideo}
            fullscreen
            repeat
            controls
            onProgress={(data) => {
              playback.current = data.currentTime;
            }}
            ignoreSilentSwitch="ignore"
          />
          <TouchableOpacity style={styles.closeButton} onPress={exitFullScreen}>
            <AntIcon name="close" style={styles.icon} />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  unityViewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    // flex: 1,
    position: 'absolute',
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  scanContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBarTop: {
    width: ScreenHeight * 0.8,
    height: 20,
    position: 'absolute',
    top: 20,
    // transform: [{rotate: '-90deg'}, {translateY: -ScreenWidth * 0.4}],
  },
  scanBarBottom: {
    width: ScreenHeight * 0.8,
    height: 20,
    position: 'absolute',
    bottom: 50,
    // transform: [{rotate: '-90deg'}, {translateY: ScreenWidth * 0.3}],
  },
  toolBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    width: ScreenHeight * 0.8,
    justifyContent: 'space-between',
    // transform: [
    //   {rotate: '-90deg'},
    //   {translateY: ScreenWidth * 0.42},
    //   {translateX: 10},
    // ],
  },
  scanLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    marginRight: 6,
  },
  toolButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: ThemeColors.mainRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#FFF',
  },
  iconImage: {
    width: 16,
    height: 16,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },
});

export default HomeScreen;
