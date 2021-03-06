import React, { useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Level } from '../utils/Contants'
import { useNavigation, useRoute } from '@react-navigation/native'
import IMAGE, {BUTTONS} from '../constants/images'

const LevelButton = props => {
  const navigation = useNavigation()
  const route = useRoute()

  function onClickButton(level) {
    //navigation.navigate('MemoryGame', { level });
  }

  return (
    <TouchableOpacity
      key={props.key}
      style={props.style}
      onPress={props.onPress}
      onPressIn = {props.onPressIn}
    >
      <Image
        style={props.imageStyle?props.imageStyle:{ height:'100%', width:'100%'}}
        source={BUTTONS[props.type]}
        resizeMode={props.mode?props.mode:"stretch"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    //height: 80,
    aspectRatio:1/1
    //margin: 10,
  },
  level: {
    fontSize: 30,
    color: 'black',
  },
});

export default LevelButton;
