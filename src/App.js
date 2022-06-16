import { StatusBar } from 'expo-status-bar'
import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer,  DefaultTheme } from '@react-navigation/native'
import MainStacks from './navigation/MainStacks'
import * as Updates from 'expo-updates'
import { useLoadFonts } from './hooks/useFonts'
import GameContextProvider from './contexts'
import { GameLoop } from "react-native-game-engine"

const Theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: "#3c3c3c"
  }
}


export default function App() {
  useEffect(()=>{
    async function updateApp(){
      const {isAvailable} = Updates.checkForUpdateAsync()
      if(isAvailable){
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }
    updateApp()
   

  },[])


  useLoadFonts()
  

  return (
    
    <GameContextProvider>
      <NavigationContainer theme={Theme}>
        <MainStacks/>
        <StatusBar style="auto" hidden = {true} />
      </NavigationContainer>
    </GameContextProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
