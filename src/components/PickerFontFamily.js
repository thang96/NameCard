import React, {useState, useRef} from 'react';

import {Picker} from '@react-native-picker/picker';
export const PickerFontFamily = props => {
  const {selectedValue, onValueChange, label,style} = props;
  return (
    <Picker
      label={label}
      style={style}
      selectedValue={selectedValue}
      onValueChange={onValueChange}>
      <Picker.Item label="Acme-Regular" value="Acme-Regular" />
      <Picker.Item label="AlfaSlabOne-Regular" value="AlfaSlabOne-Regular" />
      <Picker.Item label="AmaticSC-Bold" value="AmaticSC-Bold" />
      <Picker.Item label="Anton-Regular" value="Anton-Regular" />
      <Picker.Item
        label="Assistant-VariableFont_wght"
        value="Assistant-VariableFont_wght"
      />
      <Picker.Item label="Blaka-Regular" value="Blaka-Regular" />
      <Picker.Item label="BlakaHollow-Regular" value="BlakaHollow-Regular" />
      <Picker.Item
        label="Caveat-VariableFont_wght"
        value="Caveat-VariableFont_wght"
      />
      <Picker.Item
        label="Changa-VariableFont_wght"
        value="Changa-VariableFont_wght"
      />
      <Picker.Item
        label="Cinzel-VariableFont_wght"
        value="Cinzel-VariableFont_wght"
      />
      <Picker.Item label="Cookie-Regular" value="Cookie-Regular" />
      <Picker.Item label="Fascinate-Regular" value="Fascinate-Regular" />
      <Picker.Item
        label="FascinateInline-Regular"
        value="FascinateInline-Regular"
      />
      <Picker.Item label="FjallaOne-Regular" value="FjallaOne-Regular" />
      <Picker.Item
        label="GentiumPlus-BoldItalic"
        value="GentiumPlus-BoldItalic"
      />
      <Picker.Item label="GreatVibes-Regular" value="GreatVibes-Regular" />
      <Picker.Item label="IndieFlower-Regular" value="IndieFlower-Regular" />
      <Picker.Item
        label="Inter-VariableFont_slnt,wght"
        value="Inter-VariableFont_slnt,wght"
      />
      <Picker.Item label="Joan-Regular" value="Joan-Regular" />
      <Picker.Item label="KdamThmorPro-Regular" value="KdamThmorPro-Regular" />
      <Picker.Item label="Lobster-Regular" value="Lobster-Regular" />
      <Picker.Item label="Monofett-Regular" value="Monofett-Regular" />
      <Picker.Item
        label="NanumMyeongjo-ExtraBold"
        value="NanumMyeongjo-ExtraBold"
      />
      <Picker.Item
        label="Nunito-Italic-VariableFont_wght"
        value="Nunito-Italic-VariableFont_wght"
      />
      <Picker.Item
        label="OpenSans-Italic-VariableFont_wdth,wght"
        value="OpenSans-Italic-VariableFont_wdth,wght"
      />
      <Picker.Item
        label="Orbitron-VariableFont_wght"
        value="Orbitron-VariableFont_wght"
      />
      <Picker.Item label="Pacifico-Regular" value="Pacifico-Regular" />
      <Picker.Item label="PatrickHand-Regular" value="PatrickHand-Regular" />
      <Picker.Item
        label="PermanentMarker-Regular"
        value="PermanentMarker-Regular"
      />
      <Picker.Item
        label="PlayfairDisplay-Italic-VariableFont_wght"
        value="PlayfairDisplay-Italic-VariableFont_wght"
      />
      <Picker.Item label="PressStart2P-Regular" value="PressStart2P-Regular" />
      <Picker.Item label="Rajdhani-Light" value="Rajdhani-Light" />
      <Picker.Item
        label="Raleway-Italic-VariableFont_wght"
        value="Raleway-Italic-VariableFont_wght"
      />
      <Picker.Item label="Roboto-Black" value="Roboto-Black" />
      <Picker.Item label="Sacramento-Regular" value="Sacramento-Regular" />
      <Picker.Item label="Satisfy-Regular" value="Satisfy-Regular" />
      <Picker.Item
        label="ShadowsIntoLight-Regular"
        value="ShadowsIntoLight-Regular"
      />
      <Picker.Item
        label="Signika-VariableFont_wght"
        value="Signika-VariableFont_wght"
      />
      <Picker.Item
        label="SplineSansMono-VariableFont_wght"
        value="SplineSansMono-VariableFont_wght"
      />
      <Picker.Item label="TiroGurmukhi-Italic" value="TiroGurmukhi-Italic" />
      <Picker.Item label="Yellowtail-Regular" value="Yellowtail-Regular" />
    </Picker>
  );
};
