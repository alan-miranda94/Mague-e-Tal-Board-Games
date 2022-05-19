import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions } from 'react-native'
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native'
import { MotiView, useAnimationState, MotiImage } from 'moti'
import IMAGE, { MARCAS } from '../../constants/images'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

export default function App() {

  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 1000 * 5)
  }, [])

  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
      <ImageBackground
        style={styles.background}
        //imageStyle={{opacity:0.4}}
        source={IMAGE.Bg_Game_End}
        resizeMode="stretch"
      />
      
      <View style={styles.container}>
        <MotiImage
          from={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          style={styles.image}
          source={MARCAS.Recife}
          delay={1000}
          transition={{
            type: 'timing',
            duration: 5 * 1000,
          }}
        />

        <MotiImage
          from={{ opacity: 0, translateY: 0 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.image}
          source={MARCAS.PEA}
          resizeMode="contain"
          delay={1000}
          transition={{
            type: 'timing',
            duration: 5 * 1000,
          }}
        />
        
        <MotiImage
          from={{ opacity: 0, translateY: 0 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.image}
          source={MARCAS.UFPE}
          resizeMode="contain"
          delay={1000}
          transition={{
            type: 'timing',
            duration: 5 * 1000,
          }}
        />
        <MotiImage
          from={{ opacity: 0, translateY: 0 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.image}
          source={MARCAS.LEG}
          resizeMode="contain"
          delay={1000}
          transition={{
            type: 'timing',
            duration: 5 * 1000,
          }}
        />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '10%',
    aspectRatio: 1 / 1,
    margin: 20
  },
  text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'RetroGaming',
  },
  game: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 20,
    margin: 10
  },
  background: {
    position: 'absolute',
    height: Height,
    width: Width,
    justifyContent: 'center',
    //backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
})
