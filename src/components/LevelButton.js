import React ,{useEffect}from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Level } from '../utils/Contants'
import {useNavigation, useRoute} from '@react-navigation/native'

const LevelButton = props => {
    const navigation = useNavigation()
    const route = useRoute()

  function onClickButton(level) {
   navigation.navigate('MemoryGame', { level });
  }

  useEffect(()=>{
    console.log(props.level)
  })
  return (
    <TouchableOpacity
      key={props.key}
      style={styles.button}
      onPress={() => onClickButton(props.level)}
    >
      <Text style={styles.level}>{props.level + 1}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 5,
    margin: 10,
  },
  level: {
    fontSize: 30,
    color: 'black',
  },
});

export default LevelButton;
