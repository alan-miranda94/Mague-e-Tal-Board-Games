import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {LEVELS} from '../../utils/Contants'
import LevelButton from '../../components/LevelButton'


const App = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={LEVELS}
        contentContainerStyle={{marginTop:50, justifyContent:"center", alignItems:"center"}}
        //columnWrapperStyle={{  flex: 1, alignItems:"center", justifyContent: "center"}}
        numColumns= {5}
        columnWrapperStyle={{alignItems:"center", justifyContent:'center'}}
        renderItem={ ({ item, index }) => (
          <LevelButton  level={item.level}/>
         
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