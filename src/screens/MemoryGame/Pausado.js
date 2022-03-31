import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import {   
  View, 
  Text, 
  Modal,  
  StyleSheet, 
  TouchableOpacity}
from 'react-native'
import Button from '../../components/Button';


export default props => {  
  const navigation = useNavigation()
  const handleCloseButton = ()=>{
      props.setShow(false)
  } 

  return(
    <Modal 
        transparent={true}
        visible={props.show}
        animationType='slide'
        >   
      <TouchableOpacity onPress={()=> props.setShow(false)} style = {styles.container}>
          <Text style={styles.text}>PAUSADO</Text>
          <View style={styles.areaButton}>
            <Button style={styles.button} type='Btn_Menu'/>
            <Button style={styles.button} type='Btn_Play'/>
            <Button style={styles.button} type='Btn_Restart'/>
          </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)',   
  },
  areaButton:{
    flexDirection:"row",
    height:'30%',
    padding:16,
    //width:'50%',
    justifyContent:'space-around',
    backgroundColor:'black',
    borderWidth:4,
    borderRadius:25,
    borderColor:'white'

  },
  button:{
    marginLeft:8
  },
  text:{
    fontSize:32,
    color:'white',
  }

})