import React from 'react';
import {View, Image, Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Composing = () => {
  const offset = useSharedValue({x: 30, y: 30});
  const start = useSharedValue({x: 30, y: 30});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: scale.value},
        {rotateZ: `${rotation.value}rad`},
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      console.log(offset, '-----------------------');
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          animatedStyles,
          {width: 100, height: 100, backgroundColor: 'red'},
        ]}>
        <Text style={{fontSize: 24}}>AAA123456789123456789123</Text>
        {/* <Image
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/000/423/133/original/vector-code-optimization-icon.jpg',
          }}
        /> */}
      </Animated.View>
    </GestureDetector>
  );
};
export default Composing;
