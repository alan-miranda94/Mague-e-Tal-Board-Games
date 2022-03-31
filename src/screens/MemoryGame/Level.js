import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {LEVELS} from '../../utils/Contants'
import LevelButton from '../../components/LevelButton'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

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
          <LevelButton  level={index}/>
         
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