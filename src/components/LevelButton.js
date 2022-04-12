import React, { useEffect , useState} from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground } from 'react-native'
import { startPoints } from '../utils/Utils'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BUTTONS } from '../constants/images'
import Star from './Star'


const LevelButton = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const [stars, setStars] = useState(props.star)

  function onClickButton(level) {
    navigation.navigate('MemoryGame', { level });
  }

  useEffect(() => {
    
  })
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        key={props.key}
        style={styles.button}
        onPress={() => onClickButton(props.level)}
      >
        <ImageBackground
          style={styles.background}
          source={BUTTONS['Btn_Level']}
          resizeMode="stretch"
        >
          <Text style={styles.level}>{props.level }</Text>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.stars}>
        <Star full={stars[0]} size={20}/>
        <Star full={stars[1]} size={30}/>
        <Star full={stars[2]} size={20}/>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    height: 100,
    width: 100,
    //backgroundColor: 'red',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    //backgroundColor: 'green',    
    height: 70,
    width: 70,
   
  },
  level: {
    position: "absolute",
    fontSize: 30,
    color: 'white',
    //fontWeight:'bold',
    fontFamily: 'RetroGaming'
  },
  background: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    flex:1,
    //backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  stars:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
});

export default LevelButton;
