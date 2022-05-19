import React, { useEffect, useState, useCallback, useRef, useContext } from 'react'
import { StyleSheet, Text, ImageBackground, Image, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { GameContext } from '../../contexts'
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AudioManager from '../../constants/AudioManager'
import { MotiView, useAnimationState, MotiImage, } from 'moti'
import IMAGE, { MARCAS, BUTTONS } from '../../constants/images'
import Lottie from 'lottie-react-native'
import OttoWine from '../../assets/Animations/Dom_all.json'
import Sprit from '../../components/Lottie'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width


export default function App() {
  const { state: { memoryGame }, dispatch } = useContext(GameContext)
  const navigation = useNavigation()
  const lottieRef = useRef()
  const flatListRef = useRef()

  const games = [
    {
      id: 1,
      name: 'Jogo da Memoria',
      screen: 'MG-Level',
      cover: BUTTONS.Btn_MemoryGame

    },
    {
      id: 2,
      name: 'Jogo da Velha',
      screen: 'SelectPlayer',
      cover: BUTTONS.Btn_TicTacToe
    }
  ]

  const logoAnimation = useAnimationState({
    from: { opacity: 0, height: Height * 0.6, },
    to: { opacity: 1, },

    shrink: {
      height: Height * 0.3,
      translateX: [0, -(Width / 2 - (Height * 0.2))],
      translateY: [0, (-Height / 2 + (Height * 0.3) / 2)]
    },
  })

  const coverAnimation = useAnimationState({
    from: {
      scaleX: 1

    },
    to: {

      scale: [
        { value: 1.1, delay: 100, },
        1,
        { value: 1.1, type: 'timing', delay: 200 },
      ],

    },
    transition: {


    }

  })

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 40, waitForInteraction: true };

  const onViewableItemsChanged = useCallback((viewableItems) => {
    //console.log(viewableItems.changed)
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@memoryGameScore')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

  useEffect(() => {
    getData().then(r => {
      if (r) {
        dispatch({
          type: 'OPEN_SCORE_SAVE',
          payload: r
        })
        return
      }

    })


  }, [])

  useEffect(() => {
    //bgMusic()
    setTimeout(() => {
     // lottieRef.current.play(280, 390)
      logoAnimation.transitionTo((state) => {
        if (state === 'to') {
          return 'shrink'
        }
      })
    }, 3 * 1000)
  }, [])

  const selectGame = (game) => {
    stopBgSong()
    navigation.navigate(game)
  }

  const bgMusic = async () => await AudioManager.playAsync(AudioManager.sounds.menus, true)
  const stopBgSong = async () => await AudioManager.stopAsync(AudioManager.sounds.menus)

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        //imageStyle={{opacity:0.4}}
        source={IMAGE.Bg_Tree}
        resizeMode="stretch"
      />
      <MotiImage
        state={logoAnimation}
        style={{ position: 'absolute', zIndex: 3 }}
        source={MARCAS.LOGOGAME}
        resizeMode="contain"

        transition={{
          type: 'timing',
          duration: 1 * 1000,
        }}
      />

      <MotiView
        from={{ opacity: 1, translateX: -Width/2 }}
        style={{ marginLeft: 10 }}
        animate={{ opacity: 1, translateX: 0 ,}}
        transition={{
          type: 'timing',
          translateX:{
            duration: 1000,
            delay:3* 1000,
          },
          
          
        }}
  
      >
        <View style={
          {
            position: 'absolute',
            left: -30,
            backgroundColor: 'red',
            width: '20%',
            height: "0%",
          }}
        >
          <Sprit //Lottie //PERSONAGENS
            action={'IDLE'}
            name={'Dom'}
            resizeMode={'cover'}
            style={[{ height: Height / 2, aspectRatio: 1 }]}
          />
         
        </View>
      </MotiView>

      <View

        style={{ justifyContent: 'center', marginLeft: Width / 3 - (Height * 0.2), }}
      >
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          contentContainerStyle={{ justifyContent: "center", alignItems: 'center', padding: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: '1%' }} />}
          horizontal={true}
          //onViewableItemsChanged={onViewableItemsChanged}
          //viewabilityConfig={viewabilityConfig}
          renderItem={({ item, index }) => {
            if (item.id === index) {
              console.log('ESTA NESTE')
            }
            return (
              <MotiView

                from={{ opacity: 0, translateX: Width }}
                delay={2000}
                style={{ marginLeft: 10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'timing',
                  duration: 5 * 1000,
                  scale: {
                    type: 'spring',
                    delay: 100,
                    repeat: 4,
                  },
                }} >
                <TouchableOpacity
                  onPressIn={async () => await AudioManager.playAsync(AudioManager.sounds.effects.next)}
                  onPress={() => selectGame(item.screen)}
                  style={
                    {
                      //backgroundColor: 'yellow',
                      width: Height * 0.90,
                      aspectRatio: 1 / 1,
                      padding: 30,
                      //marginLeft: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  }
                >

                  <MotiImage
                    state={coverAnimation}//não funciona
                    source={item.cover}
                    style={{ width: '100%', height: '100%' }}
                  />

                </TouchableOpacity>
              </MotiView>
            )
          }}
        />
      </View>
           

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0230BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'RetroGaming',
  },
  image: {
    width: '10%',
    aspectRatio: 1 / 1,
    margin: 20
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
});
