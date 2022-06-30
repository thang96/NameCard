import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import GestureBox from '../../components/GestureBox';
import {icons, images, LogoPirate, svgimages} from '../../constants';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addResource,
  updateResource,
  removeResource,
} from '../../redux/actions/IconAction';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/571/419/original/vector-network-icon.jpg',
    id: 1,
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/551/599/original/user-icon-vector.jpg',
    id: 2,
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/150/752/original/free-update-icon-vector-collection.jpg',
    id: 3,
  },
  {
    icon: 'https://tse4.mm.bing.net/th?id=OIP.bwb4tI2v-svBFxB_fZcoVQHaJ4&pid=Api&P=0&w=126&h=168',
    id: 4,
  },
  {
    icon: 'https://tse3.mm.bing.net/th?id=OIP.xOwGC3MnX56NFDLncE8MAgHaHa&pid=Api&P=0&w=165&h=165',
    id: 5,
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/435/774/original/vector-direction-icon.jpg',
    id: 6,
  },
  {
    icon: 'https://tse4.mm.bing.net/th?id=OIP.AXk-fYRwU3FTAHV5SCLl5wHaFg&pid=Api&P=0&w=213&h=158',
    id: 7,
  },
  {
    icon: 'https://tse2.mm.bing.net/th?id=OIP.qlO8Doemk0ret1fCjjnf5wHaHa&pid=Api&P=0&w=183&h=183',
    id: 8,
  },
];

const BusinessCardDesign = () => {
  const [data, setData] = useState(DATA);
  const dispatch = useDispatch();
  const resources = useSelector(state => state?.Icon?.resources ?? []);
  const [colors, setColors] = useState(null);
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const navigation = useNavigation();

  const colorStore = useSelector(state => state?.Color?.color);
  const [kt, setKT] = useState({width: 100, height: 100});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
    };
  };

  const onAddNewItem = item => {
    let NewItem = {
      type: 'image',
      value: item,
      x: 0,
      y: 0,
      height: 100,
      width: 100,
    };
    dispatch(addResource(NewItem));
  };
  const onRemove = index => {
    return () => {
      dispatch(removeResource(index));
    };
  };
  useEffect(() => {
    setColors(colorStore);
  }, [colorStore]);
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.viewTopTab}>
            <TouchableOpacity style={styles.buttonTopTab}>
              <Text style={styles.textTopTab}>Choose theme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateColor');
              }}
              style={styles.buttonTopTab}>
              <Text style={styles.textTopTab}>Add color</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChooseTextinputStyles');
              }}
              style={styles.buttonTopTab}>
              <Text style={styles.textTopTab}>Add text</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                resources.map(
                  (
                    {
                      width,
                      height,
                      type,
                      x,
                      y,
                      value,
                      color,
                      fontfamily,
                      fontsize,
                      bold,
                      italic,
                    },
                    index,
                  ) => {
                    if (index === selectedIndex && type === 'text') {
                      navigation.navigate('EditTextinputStyles', {
                        params: {
                          value: value,
                          fontfamily: fontfamily,
                          fontsize: fontsize,
                          bold: bold,
                          italic: italic,
                          color: color,
                          x: x,
                          y: y,
                          width: width,
                          height: height,
                          index: index,
                        },
                      });
                    }
                  },
                );
              }}
              style={styles.buttonTopTab}>
              <Text style={styles.textTopTab}>Edit text</Text>
            </TouchableOpacity>

            <View style={{flex: 1}} />

            <TouchableOpacity style={styles.saveButton}>
              <Image
                style={{width: 20, height: 20, tintColor: 'rgb(0,0,225)'}}
                source={icons.savefile}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                width: '33%',
                backgroundColor: 'rgb(245,245,245)',
                zIndex: 9999,
                flexDirection: 'row',
              }}>
              <View style={styles.viewItem}>
                <FlatList
                  data={data}
                  keyExtractor={key => key.icon}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        onAddNewItem(item.icon);
                      }}
                      style={styles.eachViewItem}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        resizeMode="stretch"
                        source={{uri: item.icon}}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.viewColor}>
                <FlatList
                  data={colors}
                  keyExtractor={key => key.value}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      // onPress={() => {
                      //   onAddNewItem(item.icon);
                      // }}
                      style={[
                        styles.eachViewColor,
                        {backgroundColor: item?.value},
                      ]}
                    />
                  )}
                />
              </View>
            </View>
            <View
              onLayout={ev => {
                const layout = ev.nativeEvent.layout;
                setLimitationHeight(layout.height);
                setLimitationWidth(layout.width);
              }}
              style={{flex: 1}}>
              {resources.map(
                (
                  {
                    width,
                    height,
                    type,
                    x,
                    y,
                    value,
                    color,
                    fontfamily,
                    fontsize,
                    bold,
                    italic,
                  },
                  index,
                ) => (
                  <View key={index}>
                    {type === 'image' ? (
                      <GestureBox
                        isSelected={index === selectedIndex}
                        limitationHeight={limitationHeight}
                        limitationWidth={limitationWidth}
                        onRemove={onRemove(index)}
                        onResizeEnd={boxPosition => {
                          const _boxArray = [...resources];
                          const _box = {
                            ..._boxArray[index],
                            x: boxPosition.x,
                            y: boxPosition.y,
                            height: boxPosition.height,
                            width: boxPosition.width,
                          };
                          setKT({
                            width: boxPosition.width,
                            height: boxPosition.height,
                          });
                          dispatch(updateResource(index, _box));
                        }}>
                        <TouchableWithoutFeedback
                          style={[StyleSheet.absoluteFill]}
                          onPress={onTogglePressed(index)}>
                          <View style={[{width: kt.width, height: kt.height}]}>
                            <Image
                              resizeMode="cover"
                              style={{
                                width: resources[index].width - 4,
                                height: resources[index].height - 4,
                              }}
                              source={{uri: value}}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      </GestureBox>
                    ) : type === 'text' ? (
                      <GestureBox
                        isSelected={index === selectedIndex}
                        limitationHeight={limitationHeight}
                        limitationWidth={limitationWidth}
                        onRemove={onRemove(index)}
                        onResizeEnd={boxPosition => {
                          const _boxArray = [...resources];
                          const _box = {
                            ..._boxArray[index],
                            x: boxPosition.x,
                            y: boxPosition.y,
                            height: boxPosition.height,
                            width: boxPosition.width,
                          };
                          setKT({
                            width: boxPosition.width,
                            height: boxPosition.height,
                          });
                          dispatch(updateResource(index, _box));
                        }}>
                        <TouchableWithoutFeedback
                          style={[StyleSheet.absoluteFill]}
                          onPress={onTogglePressed(index)}>
                          <View style={[{width: kt.width, height: kt.height}]}>
                            <Text
                              style={{
                                width: resources[index].width - 4,
                                height: resources[index].height - 4,
                                color: color,
                                fontFamily: fontfamily,
                                fontSize: fontsize,
                                fontStyle: italic ? 'italic' : 'normal',
                                fontWeight: bold ? 'bold' : 'normal',
                              }}>
                              {value}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </GestureBox>
                    ) : null}
                  </View>
                ),
              )}
              {/* <LogoPirate width={45} height={45} fill={'rgb(0,0,0)'} />
              {Object.values(svgimages).map((IconItem, index) => (
                <IconItem
                  key={index}
                  width={45}
                  height={45}
                  fill="rgb(0,0,0)"
                />
              ))} */}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  viewTopTab: {
    height: '15%',
    zIndex: 9999,
    backgroundColor: 'rgb(207,207,207)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgb(0,0,225)',
  },
  buttonTopTab: {
    height: 45,
    width: 150,
    marginRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  textTopTab: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
  viewItem: {
    backgroundColor: 'rgb(207,207,207)',
    width: '70%',
    height: '100%',
  },
  eachViewItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: '95%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  viewColor: {
    backgroundColor: 'rgb(207,207,207)',
    width: '30%',
    height: '100%',
  },
  eachViewColor: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
});
export default BusinessCardDesign;
