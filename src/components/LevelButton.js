import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground, Dimensions } from 'react-native'
import { startPoints } from '../utils/Utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BUTTONS } from '../constants/images'
import Star from './Star'
import AudioManager from '../constants/AudioManager'
import IMAGE, { BTN_FRUITS, DECK, TTT_Characters } from '../constants/images'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width


const LevelButton = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const [stars, setStars] = useState(props.star)

  function onClickButton(level) {
    props.stopBgSong()
    navigation.navigate('MemoryGame', { level });
  }

  useEffect(() => {

  })
  return (
    <View style={styles.container}>

      <TouchableOpacity
        key={props.key}
        style={styles.button}
        onPressIn={async () => await AudioManager.playAsync(AudioManager.sounds.effects.start)}
        onPress={() => onClickButton(props.level)}
      >
        <ImageBackground
          style={styles.background}
          source={BUTTONS['Btn_Level']}
          resizeMode="contain"
        >
                  <Text style={styles.level}>{props.level}</Text>
        </ImageBackground>

        
        <View style={styles.stars}>
          <Star full={stars[0]} size={Math.floor(Height * 0.05)} />
          <Star full={stars[1]} size={Math.floor(Height * 0.08)} />
          <Star full={stars[2]} size={Math.floor(Height * 0.05)} />

        </View>

      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Height * 0.25,
    width: Height * 0.25,
    //backgroundColor: 'red',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    //backgroundColor: 'green',    
    height: Height * 0.25,
    width: Height * 0.25,

  },
  level: {
    position: "absolute",
    fontSize: Math.floor(Height*0.1),
    color: 'white',
    //fontWeight:'bold',
    fontFamily: 'RetroGaming',
  
  },
  background: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    flex: 1,
    width: '100%',
    height: "100%",
    //backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',

  },
  stars: {
    height: Height * 0.05,
    width: Height * 0.25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'red',
    marginTop:10
  }
});

export default LevelButton;
