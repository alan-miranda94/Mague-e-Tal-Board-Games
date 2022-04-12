import React, {useContext,useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {LEVELS} from '../../utils/Contants'
import LevelButton from '../../components/LevelButton'
import { GameContext } from '../../contexts';

const App = () => {
  const {state:{memoryGame}, dispatch} = useContext(GameContext)
  const [level,setLevel] = useState([])

  useEffect(()=>{
  
    setLevel(memoryGame.level)
  },[])
  
  return (
    <View style={styles.container}>
      <FlatList
        data={level}
        contentContainerStyle={{marginTop:50, justifyContent:"center", alignItems:"center"}}
        //columnWrapperStyle={{  flex: 1, alignItems:"center", justifyContent: "center"}}
        numColumns= {5}
        columnWrapperStyle={{alignItems:"center", justifyContent:'center'}}
        renderItem={ ({ item, index }) => (
          <LevelButton  level={item.level} star = {item.star}/>
         
        )}
        keyExtractor={item => item.level}
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

});

export default App;