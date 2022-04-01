import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
}
  from 'react-native'
import Button from '../../components/Button'
import Star from '../../components/Star'
import IMAGE, { DECK } from '../../constants/images'


export default props => {
  const navigation = useNavigation()
  const handleCloseButton = () => {
    props.setShow(false)
  }

  return (
    <Modal
      transparent={true}
      visible={props.show}
      animationType='fade'
      statusBarTranslucent
    >
      <TouchableOpacity onPress={() => {}} style={styles.container}>
        <View style={styles.background} >
          <View style={styles.borderInside} >
            <View style={{ height: 200, width: 200, alignItems: 'center', justifyContent: 'center',}}>
            <Star full style={{zIndex:10, position:'absolute', top:30, left:0}} size={60}/>
            <Star full style={{zIndex:10, position:'absolute', alignItems:"center", justifyContent:"center", top:0}} size={60}/>
            <Star full style={{zIndex:10, position:'absolute', top:30, right:0}} size={60}/>
              <Image
                style={{position:"absolute", height: 200, width: 200,  }}
                source={IMAGE.Popup_Don}
                resizeMode="cover"
              />
              <View  style={{position:"absolute",alignItems:"center", justifyContent:"center",bottom:30}}>
              <Image
                style={{ height: 100, width: 100,}}
                source={IMAGE.Face_Don}
                resizeMode="stretch"
              />
              </View>
              

            </View>
           
            <View style={styles.areaButton}>
              <Button style={styles.button} type='Btn_Menu' onPress={()=>navigation.reset({index:0, routes:[{name:'Level'}]})}/>
              <Button style={styles.button} type='Btn_Play' onPress={()=>navigation.reset({index:0, routes:[{name:'MemoryGame', params:{level:props.level + 1}}]})}/>
              <Button style={styles.button} type='Btn_Restart'  onPress={()=>navigation.reset({index:0, routes:[{name:'MemoryGame', params:{level:props.level }}]})} />
            </View>
          </View>
        </View>

      </TouchableOpacity>
      <StatusBar style="auto" hidden={true} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  areaButton: {
    flexDirection: "row",
    height: 100,
    padding: 16,
    //width:'50%',
    justifyContent: 'space-around',



  },
  borderInside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 38,
    borderColor: 'yellow',
    padding: 16
  },
  button: {
    marginLeft: 8
  },
  text: {
    fontSize: 32,
    color: 'white',
  },
  background: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
    borderWidth: 4,
    borderRadius: 45,
    borderColor: 'yellow',
    padding: 4
  },

})