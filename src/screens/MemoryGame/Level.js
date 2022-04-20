import React, {useContext,useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {LEVELS} from '../../utils/Contants'
import LevelButton from '../../components/LevelButton'
import { GameContext } from '../../contexts'
import AudioManager from '../../constants/AudioManager'
import Button from '../../components/Button'
import {useNavigation } from '@react-navigation/native'

const App = () => {
  const {state:{memoryGame}, dispatch} = useContext(GameContext)
  const [level,setLevel] = useState([])
  const navigation = useNavigation()
  useEffect(()=>{
    bgMusic()
    setLevel(memoryGame.level)
  },[])

 const bgMusic = async () => await AudioManager.playAsync(AudioManager.sounds.menus, true)
 const stopBgSong = async () => await AudioManager.stopAsync(AudioManager.sounds.menus)
  
  return (
    <View style={styles.container}>
      <FlatList
        data={level}
        contentContainerStyle={{marginTop:50, justifyContent:"center", alignItems:"center"}}
        //columnWrapperStyle={{  flex: 1, alignItems:"center", justifyContent: "center"}}
        numColumns= {5}
        columnWrapperStyle={{alignItems:"center", justifyContent:'center'}}
        renderItem={ ({ item, index }) => (
          <LevelButton  
            stopBgSong = {stopBgSong}
            level={item.level} 
            star = {item.star}
          />
         
        )}
        keyExtractor={item => item.level}
      />
      <Button 
        style={styles.pauseBt} 
        onPressIn={async()=> await AudioManager.playAsync(AudioManager.sounds.effects.back)}
        onPress={()=>{ 
          stopBgSong()
          navigation.navigate("Home")
          //pauseMusic()
        }} 
        type='Btn_Menu'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent:"center",
    alignItems:"center",

  },
  pauseBt:{
    position: 'absolute', 
    right: '2%', 
    top: "2%", 
    height:'15%',

  },

});

export default App;