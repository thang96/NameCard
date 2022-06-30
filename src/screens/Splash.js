import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import {icons} from '../constants';
import Orientation from 'react-native-orientation-locker';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUse} from '../redux/actions/InfoAction';
const Splash = () => {
  const [isReady, setIsReady] = useState(false);
  const isLogin = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  useEffect(() => {
    Orientation.lockToLandscape();
    fadeIn();
  });

  useEffect(() => {
    const login = setTimeout(() => {
      AsyncStorage.getItem('useInfo')
        .then(value => {
          dispatch(updateUse(JSON.parse(value))), setIsReady(true);
          clearTimeout(login);
        })
        .catch(e => {
          setIsReady(true);
          clearTimeout(login);
        });
    }, 2000);
  });

  useEffect(() => {
    if (!isReady) return;
    navigation.navigate(
      isLogin?.InfoUse?.use === '' ||
        isLogin?.InfoUse?.use === undefined ||
        isLogin?.InfoUse?.use === null
        ? 'StackLoginNavigation'
        : 'StackHomeNavigation',
    );
  }, [isLogin, isReady]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgroundhome.jpg')}
        style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
            {transform: [{rotate: spin}, {scale: scaleValue}]},
          ]}>
          <Text style={styles.textTitle}>Business Card Design</Text>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 50,
    color: 'rgb(0,0,0)',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    transform: [{skewX: '-9deg'}, {skewY: '-9deg'}],
  },
});

export default Splash;
