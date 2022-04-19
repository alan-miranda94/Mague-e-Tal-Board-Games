import React, { useEffect, useState,useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { GameContext } from '../../contexts'
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const {state:{memoryGame}, dispatch} = useContext(GameContext)
  const navigation = useNavigation()
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@memoryGameScore')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }
  useEffect(()=>{
    getData().then(r=>{
      if(r){
        dispatch({
          type:'OPEN_SCORE_SAVE',
          payload:r
        })
        return
      }
     
    })
    

  },[])
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.game} onPress={()=>navigation.navigate('Level')}>
        <Text style={styles.text}>{`JOGO DA MEMORIA`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 32,
    color: 'white',
    fontFamily: 'RetroGaming',
  },  
  game:{
    width:'50%',
    height:'90%',
    backgroundColor:'orange',
    justifyContent:"center",
    alignItems:'center',
    borderRadius:20
  }
});
