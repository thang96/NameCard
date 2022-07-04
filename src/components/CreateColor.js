import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Modal} from 'react-native';
import {HueSaturationValuePicker} from 'react-native-reanimated-color-picker';
import * as colorsys from 'colorsys';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomInput from './CustomInput';
import {useDispatch, useSelector} from 'react-redux';
import {addNewColor} from '../redux/features/colorSlice';
const CreateColor = props => {
  const wheelStyle = {width: '60%', height: 250};
  const sliderStyle = {height: 40, width: '60%'};
  const [color, setColor] = useState('rgb(255,255,255)');
  const navigation = useNavigation();
  const [colorName, setColorName] = useState('');
  const dispatch = useDispatch();
  const colorStore = useSelector(state => state?.color?.colorStore);
  const colorChanged = ({h, s, v}) => {
    let _rgb = colorsys.hsvToRgb({
      h: h,
      s: s * 100,
      v: v * 100,
    });
    let text_rgb = `rgb(${_rgb.r},${_rgb.g}, ${_rgb.b})`;
    setColor(text_rgb);
  };
  useEffect(() => {
    validateOk;
  }, [color, colorName]);
  const validateOk = () => colorName.length > 0 && color.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.eachView}>
        <HueSaturationValuePicker
          wheelStyle={wheelStyle}
          sliderStyle={sliderStyle}
          onColorChange={colorChanged}
        />
      </View>
      <View style={styles.eachView2}>
        <View style={[styles.viewColor, {backgroundColor: color}]}></View>
        <Text style={styles.textColor}>{color}</Text>
        <View style={styles.colorName}>
          <CustomInput
            value={colorName}
            changeText={text => setColorName(text)}
            placeholder={'Color name'}
          />
        </View>
        <View style={{height: 50, marginTop: 10}}>
          <CustomButton
            disabled={color == '' || colorName == '' ? true : false}
            textColor={'black'}
            backgroundColor={color == '' || colorName == '' ? 'grey' : 'white'}
            title={'Edit color'}
            onPress={() => {
              let isok = false;
              let cloneAllTags = [...colorStore];
              cloneAllTags.forEach(element => {
                if (
                  colorName.toLocaleLowerCase() ==
                  element.name.toLocaleLowerCase()
                ) {
                  isok = true;
                }
              });
              const newColor = {name: colorName, value: color};
              isok == true
                ? alert('Color name is duplicate')
                : dispatch(addNewColor(newColor));
              setColorName('');
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,255,255,0.5)',
    flexDirection: 'row',
  },

  eachView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  eachView2: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
  },
  viewColor: {
    width: 200,
    height: 80,
    marginTop: 70,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  textColor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 10,
  },
  colorName: {
    height: 50,
    marginTop: 20,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
export default CreateColor;
