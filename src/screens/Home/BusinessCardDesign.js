import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import GestureBox from '../../components/GestureBox';
import {icons, images, LogoPirate, svgimages, DATA} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
// import {
//   addResource,
//   updateResource,
//   removeResource,
// } from '../../redux/actions/IconAction';
import {
  addResource,
  updateResource,
  removeResource,
} from '../../redux/features/resourceSlice';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {addColor, colorStore} from '../../redux/features/colorSlice';
import Svg from 'react-native-svg';

const BusinessCardDesign = () => {
  const dispatch = useDispatch();
  const resources = useSelector(state => state.resource.resourceStore ?? []);
  // const resource = useSelector(state => state.resource.resourceStore);
  //?? []
  // const [resources, setResources] = useState([]);
  console.log(resources, 'resources list');
  const [colors, setColors] = useState(color);
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const navigation = useNavigation();
  const color = useSelector(colorStore);
  const [kt, setKT] = useState({width: 100, height: 100});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [colorItem, setColorItem] = useState('rgb(0,0,0)');

  useEffect(() => {
    setColors(color);
  }, [color]);
  const FUNCTIONBUTTON = [
    {title: 'Choose theme', onPress: null},
    {title: 'Add color', onPress: () => navigation.navigate('CreateColor')},
    {
      title: 'Add text',
      onPress: () => navigation.navigate('ChooseTextinputStyles'),
    },
    {
      title: 'Edit text',
      onPress: () => {
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
      },
    },
  ];

  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
      setSelectedItemIndex(index);
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
      colorIcon: 'rgb(0,0,0)',
    };
    dispatch(addResource(NewItem));
  };
  const onRemove = value => {
    return () => {
      dispatch(removeResource(value));
    };
  };

  const renderButton = item => (
    <TouchableOpacity onPress={item.onPress} style={styles.buttonTopTab}>
      <Text style={styles.textTopTab}>{item.title}</Text>
    </TouchableOpacity>
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  console.log('itembox : ', selectedItemIndex, colorItem);
  const renderColor = (item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => updateColor(item, index)}
      style={[styles.eachViewColor, {backgroundColor: item?.value}]}
    />
  );
  const updateColor = item => {
    setColorItem(item.value);
    const index = selectedItemIndex;
    const _boxArray = [...resources];
    const itembox = {
      ..._boxArray[selectedItemIndex],
      x: _boxArray[selectedItemIndex].x,
      y: _boxArray[selectedItemIndex].y,
      height: _boxArray[selectedItemIndex].height,
      width: _boxArray[selectedItemIndex].width,
      colorIcon: colorItem,
    };
    dispatch(updateResource({index, itembox}));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.viewTopTab}>
            {
              <FlatList
                horizontal
                data={FUNCTIONBUTTON}
                keyExtractor={key => key.title}
                renderItem={({item}) => renderButton(item)}
              />
            }
            <View style={{flex: 1}} />

            <TouchableOpacity style={styles.saveButton}>
              <Image
                style={{width: 20, height: 20, tintColor: 'rgb(0,0,225)'}}
                source={icons.savefile}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.listIcon}>
              <ScrollView style={styles.viewItem}>
                {Object.values(svgimages).map((IconItem, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onAddNewItem(IconItem);
                    }}
                    style={styles.eachViewItem}>
                    <IconItem
                      width={'100%'}
                      height={'100%'}
                      fill="rgb(0,0,0)"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.viewColor}>
                <FlatList
                  data={colors}
                  keyExtractor={key => key.name}
                  renderItem={({item, index}) => renderColor(item, index)}
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
                    colorIcon,
                  },
                  index,
                ) => {
                  const IconItem = value;

                  return (
                    <View key={index}>
                      {type === 'image' ? (
                        <GestureBox
                          isSelected={index === selectedIndex}
                          limitationHeight={limitationHeight}
                          limitationWidth={limitationWidth}
                          onRemove={onRemove(value)}
                          onResizeEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const itembox = {
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
                            dispatch(updateResource({index, itembox}));
                          }}>
                          <TouchableWithoutFeedback
                            style={[StyleSheet.absoluteFill]}
                            onPress={onTogglePressed(index)}>
                            <View
                              style={[{width: kt.width, height: kt.height}]}>
                              {typeof value === 'string' ? (
                                <SvgUri
                                  width="100%"
                                  height="100%"
                                  uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
                                />
                              ) : (
                                <IconItem
                                  fill={colorIcon}
                                  width={resources[index].width - 4}
                                  height={resources[index].height - 4}
                                />
                              )}
                            </View>
                          </TouchableWithoutFeedback>
                        </GestureBox>
                      ) : type === 'text' ? (
                        <GestureBox
                          isSelected={index === selectedIndex}
                          limitationHeight={limitationHeight}
                          limitationWidth={limitationWidth}
                          onRemove={onRemove(value)}
                          onResizeEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const itembox = {
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
                            dispatch(updateResource({index, itembox}));
                          }}>
                          <TouchableWithoutFeedback
                            style={[StyleSheet.absoluteFill]}
                            onPress={onTogglePressed(index)}>
                            <View
                              style={[{width: kt.width, height: kt.height}]}>
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
                  );
                },
              )}
              {/* <LogoPirate width={45} height={45} fill={'rgb(0,0,0)'} /> */}
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
    padding: 5,
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
  listIcon: {
    width: '33%',
    backgroundColor: 'rgb(245,245,245)',
    zIndex: 9999,
    flexDirection: 'row',
  },
});
export default BusinessCardDesign;
