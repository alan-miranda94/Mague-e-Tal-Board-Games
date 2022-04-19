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

  useEffect(() => {
    console.log(props.level)
  })
  return (
    <TouchableOpacity
      key={props.key}
      style={props.style}
      onPress={props.onPress}
      onPressIn = {props.onPressIn}
    >
      <Image
        style={{ flex: 1 }}
        source={BUTTONS[props.type]}
        resizeMode="stretch"
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
