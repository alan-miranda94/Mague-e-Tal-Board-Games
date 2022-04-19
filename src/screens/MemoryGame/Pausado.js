import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity
}
  from 'react-native'
import Button from '../../components/Button';
import AudioManager from '../../constants/AudioManager'

export default props => {
  const navigation = useNavigation()
  const handleCloseButton = () => {
    props.setShow(false)
  }

  return (
    <Modal
      transparent={true}
      visible={props.show}
      animationType='fade'
      statusBarTranslucent
    >
      <TouchableOpacity onPress={() => props.setShow(false)} style={styles.container}>
        <Text style={styles.text}>PAUSADO</Text>
        <View style={styles.areaButton}>
          <Button 
            style={styles.button} 
            type='Btn_Menu' 
            onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Level' }] })} 
          />
          <Button 
            style={styles.button} 
            type='Btn_Play' 
            onPress={() => props.setShow(false) }
            onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.start)}
          />
          <Button 
            style={styles.button} 
            type='Btn_Restart' 
            onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MemoryGame', params: { level: props.level } }] })} />

        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  areaButton: {
    flexDirection: "row",
    height:110,
    padding: 16,
    justifyContent: 'space-around',
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 25,
    borderColor: 'white',


  },
  button: {
   
    width:'10%',
    marginLeft: 8
  },
  text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'RetroGaming',
  }

})