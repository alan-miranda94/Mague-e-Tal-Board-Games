import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground } from 'react-native'
import IMAGE, { BUTTONS } from '../constants/images'

const LevelButton = props => {
  return (

      <View  style={props.style}>
        <Image
        style={{height:props.size, width:props.size, marginTop:4}}
        source={props.full?IMAGE['Start_Rank_ON']:IMAGE['Start_Rank_OFF']}
        resizeMode="cover"
      />
      </View>
      
        
  );
};

const styles = StyleSheet.create({
  
  background: {
   flex:1

  },
});

export default LevelButton;
