import React, {useEffect, useMemo, useRef} from 'react';
import {
  I18nManager,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  RotationGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

function PanAndPinch(props) {
  const {
    x,
    y,
    limitationHeight,
    limitationWidth,
    height = 100,
    width = 100,
    minHeight = height / 2,
    minWidth = width / 2,
    onDragEnd,
    onResizeEnd,
    children,
    resizerImageSource = require('../assets/icons/resize.png'),
    closeImageSource = require('../assets/icons/close.png'),
    rotateImageSource = require('../assets/icons/rotation.png'),
    style,
    isSelected,
    onRemove,
  } = props;
  const xRef = useRef(x);
  const yRef = useRef(y);
  const heightRef = useRef(height);
  const widthRef = useRef(width);
  const boxX = useSharedValue(0);
  const boxY = useSharedValue(0);
  const boxHeight = useSharedValue(heightRef.current ?? 100);
  const boxWidth = useSharedValue(widthRef.current ?? 100);
  const boxRotate = useSharedValue(0);

  useEffect(() => {
    boxX.value = withTiming(xRef.current);
    boxY.value = withTiming(yRef.current);
  }, [boxX, boxY]);

  const rotationHandler = useAnimatedGestureHandler({});

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
    },
    onActive: (ev, ctx) => {
      if (!isSelected) {
        return;
      }
      boxX.value = clamp(
        ctx.offsetX + ev.translationX,
        0,
        limitationWidth - boxWidth.value,
      );
      boxY.value = clamp(
        ctx.offsetY + ev.translationY,
        0,
        limitationHeight - boxHeight.value,
      );
    },
    onFinish: () => {
      if (onDragEnd) {
        runOnJS(onDragEnd)({
          x: boxX.value,
          y: boxY.value,
          height: boxHeight.value,
          width: boxWidth.value,
        });
      }
    },
  });

  const resizeHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.boxWidth = boxWidth.value;
      ctx.boxHeight = boxHeight.value;
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
    },
    onActive: (ev, ctx) => {
      if (!isSelected) {
        return;
      }
      boxWidth.value = clamp(
        ctx.boxWidth + ev.translationX,
        minWidth,
        limitationWidth - boxX.value,
      );
      boxHeight.value = clamp(
        ctx.boxHeight + ev.translationY,
        minHeight,
        limitationHeight - boxY.value,
      );
    },
    onFinish: () => {
      'worklet';
      if (onResizeEnd) {
        runOnJS(onResizeEnd)({
          x: boxX.value,
          y: boxY.value,
          height: boxHeight.value,
          width: boxWidth.value,
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: boxX.value,
      },
      {
        translateY: boxY.value,
      },
      {rotateZ: `${boxRotate.value}deg`},
    ],
    height: boxHeight.value,
    width: boxWidth.value,
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    flexDirection: 'row',
  }));

  const styles = useMemo(
    () =>
      StyleSheet.create({
        closeBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          left: -10,
          top: -10,
        },
        resizeBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          right: -10,
          bottom: -10,
        },
        imageStyle: {
          height: 20,
          width: 20,
        },
      }),
    [],
  );
  return (
    <>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[animatedStyle, style]}>
            {isSelected && (
              <View
                style={[styles.closeBoxStyle, {width: width, height: height}]}>
                <View
                  style={[
                    styless.eachViewContainer,
                    {width: width, height: height},
                  ]}>
                  <TouchableOpacity onPress={onRemove} style={styless.close}>
                    <Image
                      source={closeImageSource}
                      style={styles.imageStyle}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {isSelected && (
              <PanGestureHandler onGestureEvent={resizeHandler}>
                <Animated.View style={[styles.resizeBoxStyle]}>
                  <Image
                    source={resizerImageSource}
                    style={styles.imageStyle}
                    resizeMode={'contain'}
                  />
                </Animated.View>
              </PanGestureHandler>
            )}
            {children}
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </>
  );
}
const styless = StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'red',
  },
  eachViewContainer: {
    position: 'relative',
  },
  rotation: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 10,
    elevation: 10,
  },
  close: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 10,
    elevation: 10,
  },
});

export default PanAndPinch;
