import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Image } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
//import { COLORS } from '../utils/StyleConstants';
import { shuffle } from '../../utils/Utils';

import Card from '../../components/Card'
import IMAGE, {DECK} from '../../constants/images'
import {LEVELS} from '../../utils/Contants'
import Button from '../../components/Button';
import Pausado from './Pausado';
//import { useNavigation } from '@react-navigation/core';


const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width


function GameScreen({ route }) {
  const { level } = route.params;
  const [showModal, setShowModal] = useState(false)
  const coupleCardsNumber = LEVELS[level].quantity;
  const [cardRow, setCardRow] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [combinedCards, setCombinedCards] = useState([]);
  const [par, setPar] = useState([])
  const [initTime, setInitTime] = useState(undefined);

 // const navigation = useNavigation();

 //pega a quantidade de cartas e embaralha elas
  useEffect(() => {
   // navigation.setOptions({ title: `Nível ${level.level}` })
   console.log(level)
    let cardList = [];
    let id = 0;
    for (let i = 0; i < coupleCardsNumber; i++) {
      let randomCard = Math.floor(Math.random() * 11)
      const obj = () => {
        return { 
          id: id, 
          type: i + 1, 
          selected: false,
          img:randomCard,
          visible:true
        
        };
      };
      cardList.push(obj());
      id++;
      cardList.push(obj());
      id++;
    }

    cardList = shuffle(cardList);

    const rowList = [];

    for (let i = 0; i < cardList.length; i = i + 4) {
      rowList.push(cardList.slice(i, i + 4));
    }

    setCardRow(rowList);
  }, []);


  //VERIFICA SE DEU PARES IGUAIS 
  useEffect(() => {
    if (selecteds.length == 2) {
      setTimeout(() => {
        
        if (selecteds[0].type === selecteds[1].type) {         
          let newPar = [selecteds[0], selecteds[1]]       
          setPar([...par, ...newPar])
          setCombinedCards([...combinedCards, selecteds[0].type])
          removeCards(selecteds[0])
        }

        setSelecteds([]);
      },1 * 1000);
    }
  }, [selecteds]);

  function removeCards(card){
    const newCardRow = cardRow.map((cards, index)=>{
      return cards.map((c)=> {
       if((card.type === c.type)){
          return {...c, visible:false}
       }
       return c
      })
    })
    setCardRow(newCardRow)
  }

  function onPressCard(card) {
    if (
      selecteds.length < 2 &&
      !Boolean(selecteds.find((el) => el.id == card.id)) &&
      !Boolean(combinedCards.find((el) => el == card.type))
    ) {

      setSelecteds([...selecteds, card]);
    }

    if (initTime == null) {
      setInitTime(new Date());
    }
  }

  function calculateTime() {
    function format(milliseconds) {
      var ret = '';
      let secs = milliseconds / 1000;
      const mins = secs / 60;

      if (mins >= 1) {
        ret += mins.toFixed(0) + ' minuto(s) e ';
        secs = secs - 60 * parseInt(mins.toFixed(0));
      }
      ret += secs.toFixed(0) + ' segundos e ';

      ret +=
        parseFloat(secs.toString().split('.')[1]).toFixed(0) + ' milésimos';

      return ret;
    }

    return format(Math.abs(new Date().getTime() - initTime.getTime()));
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.background}
        imageStyle={{opacity:0.4}}
        source={IMAGE.BackGround}
        resizeMode="stretch"
      />
      {combinedCards.length < coupleCardsNumber && (
        <View style={styles.cardsContainer}>
          {/*LISTA QUE COMTEM AS LINHAS DE CARTAS*/}
          {cardRow.map((cardListRow, index) => (
            <View style={styles.cardRow} key={`cardrow_${index}`}>
              {/*LISTA QUE COMTEM UMA LINHA DE CARTAS*/}
              {cardListRow.map((card, index) => (
                <TouchableWithoutFeedback
                //style={[styles.cardContainer, ]}
                  style={{ 
                    height: 110,
                    width: 70, 
                    minHeight:110,
                    marginLeft:8, 
                    //backgroundColor:'pink'
                  }}
                  key={`card_${index}`}
                  onPress={() => onPressCard(card)}
                >
                  <Card
                    friction={6}
                    img={card.type}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    visible={card.visible}
                    flip={Boolean(
                      selecteds.find((el) => el.id == card.id)
                    )}
                    clickable={false}
                    //style={[styles.cardContainer,]}
                  >
                  </Card>
                </TouchableWithoutFeedback>
              ))}
            </View>
          ))}
        </View>
      )}
      {combinedCards.length == coupleCardsNumber && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>PARABÉNS</Text>
          <Text style={styles.resultText}>
            Você concluiu com sucesso o nível {5} com o tempo de:
          </Text>
        </View>
      )}
      <View style={styles.pares}>
        <FlatList
          data={par}
          horizontal={true}
          keyExtractor={(k)=>k.id}
          renderItem={({ item, index }) => (
            <View style={[styles.cardImage,{marginLeft:index===0?2:-20}]}>
              <Image
                style={{flex:1}}
                source={DECK[item.type]}
                resizeMode="stretch"
              />
            </View>
          )}
        />
      </View>
      <Button style={styles.pauseBt} onPress={()=> setShowModal(true)} type='Btn_Pause'/>
      <Pausado
       show={showModal}
       setShow={setShowModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  cardsContainer: {
    //display: 'flex',
    width:'80%',
    height:'60%',
    position: 'absolute', 
    left: '10%', 
    top: "8%",    
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop:-100,
    //backgroundColor:'red',
    
  },
  cardRow: {
    //height:'33%',
    //width:'33%',
    flexDirection: 'row',
    //backgroundColor:"gray",
    marginBottom:8,
    
  },

  pauseBt:{
    position: 'absolute', 
    right: '2%', 
    top: "2%", 
    height:'15%',

  },
  cardContainer: {
    margin: 10,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'pink',
  },
 
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },

  background:{
    position: 'absolute', 
    left: 0, 
    top: 0, 
    height: Height, 
    width: Width,
    //backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
  pares:{
    position: 'absolute', 
    left: '8%', 
    bottom: "8%", 
    height:'15%', 
    width: '85%',
   // backgroundColor: 'blue',
    justifyContent:"center",
    alignItems:"center"
  },
  cardImage: {    
    height: "100%",
    //width: "100%",
    //backgroundColor:'green'
    
    
    
  },
});

export default GameScreen;

 {/* <ImageBackground 
        style={styles.background}
        imageStyle={{opacity:0.4}}
        source={IMAGE.BackGround}
        resizeMode="stretch"
      /> */}
 // background:{
  //   position: 'absolute', 
  //   left: 0, 
  //   top: 0, 
  //   height: Height, 
  //   width: Width,
  //   //backgroundColor: COLORS.secondary,
  //   alignItems: 'center',
  // },
//let randomCard = DECK[Math.floor(Math.random() * arr.length)]