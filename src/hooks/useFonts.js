import { useEffect, useState } from 'react'

import {
  useFonts,
  PressStart2P_400Regular

} from '@expo-google-fonts/press-start-2p'
import AppLoading from 'expo-app-loading'


export const useLoadFonts = async ()=> {

    let [fontsLoaded] = useFonts({
        RetroGaming: require('../assets/fonts/RetroGaming.ttf'),
        PressStart2P_400Regular
      })      
      if (!fontsLoaded) {
        console.log('carregou fonts')
        return <AppLoading/>;
      }
    

}
